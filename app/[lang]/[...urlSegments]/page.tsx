import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './client-page';

export const revalidate = 300;
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; urlSegments: string[] }>;
}): Promise<Metadata> {
  const { lang, urlSegments } = await params;
  try {
    const { data } = await client.queries.page({
      relativePath: `${lang}/${urlSegments.join('/')}.mdx`,
    });
    const seo = data.page.seo;
    return {
      title: seo?.title || data.page.title || undefined,
      description: seo?.description || undefined,
      openGraph: {
        title: seo?.title || undefined,
        description: seo?.description || undefined,
        images: seo?.ogImage?.src ? [seo.ogImage.src] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; urlSegments: string[] }>;
}) {
  const { lang, urlSegments } = await params;
  const filepath = urlSegments.join('/');

  let data;
  try {
    data = await client.queries.page({
      relativePath: `${lang}/${filepath}.mdx`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout lang={lang} rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });
    if (!pages.data.pageConnection.edges) break;
    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  return (allPages.data?.pageConnection.edges || [])
    .map((edge) => edge?.node?._sys.breadcrumbs || [])
    // breadcrumbs = [lang, ...rest] ; au moins une sous-page
    .filter((bc) => bc.length >= 2)
    .map((bc) => {
      const [lang, ...urlSegments] = bc;
      return { lang, urlSegments };
    })
    // la home (lang/home) est gérée par app/[lang]/page.tsx
    .filter((p) => !(p.urlSegments.length === 1 && p.urlSegments[0] === 'home'));
}

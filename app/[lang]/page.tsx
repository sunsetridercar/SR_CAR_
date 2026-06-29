import React from "react";
import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;
export const dynamicParams = false;

const LANGS = ["en", "fr"] as const;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

async function getHome(lang: string) {
  return client.queries.page({ relativePath: `${lang}/home.mdx` });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { data } = await getHome(lang);
  const seo = data.page.seo;
  return {
    title: seo?.title || undefined,
    description: seo?.description || undefined,
    openGraph: {
      title: seo?.title || undefined,
      description: seo?.description || undefined,
      images: seo?.ogImage?.src ? [seo.ogImage.src] : undefined,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = await getHome(lang);
  return (
    <Layout lang={lang} rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

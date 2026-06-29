import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
  lang: string;
};

export default async function Layout({ children, rawPageData, lang }: LayoutProps) {
  const { data: globalData } = await client.queries.global(
    {
      relativePath: `${lang}.json`,
    },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    }
  );

  return (
    <LayoutProvider
      globalSettings={globalData.global}
      pageData={rawPageData}
      lang={lang}
    >
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </LayoutProvider>
  );
}

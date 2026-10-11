import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HtmlMain } from "@/components/HtmlMain";
import { getPublishedPage } from "@/lib/cms";
import { FALLBACK_PAGES } from "@/data/pages-fallback";

export async function cmsMetadata(slug: string): Promise<Metadata> {
  const page = await getPublishedPage(slug);
  const title = page?.title || FALLBACK_PAGES[slug]?.title || "TrustLed AI";
  const description =
    page?.description || FALLBACK_PAGES[slug]?.description || "";
  const image = page?.heroImage || "/assets/img/logo.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: image }],
    },
  };
}

type Props = {
  slug: string;
  /** Optional React content rendered above CMS HTML (e.g. custom hero). */
  above?: ReactNode;
  /** When true, skip HtmlMain wrapper and only return body fragment. */
  fragment?: boolean;
};

export async function CmsPage({ slug, above, fragment }: Props) {
  const page = await getPublishedPage(slug);
  const html =
    page?.bodyHtml ||
    FALLBACK_PAGES[slug]?.bodyHtml ||
    `<section class="section"><div class="container"><p>Content coming soon.</p></div></section>`;

  if (fragment) {
    return (
      <>
        {above}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </>
    );
  }

  if (above) {
    return (
      <main id="main">
        {above}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
  }

  return <HtmlMain html={html} />;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HtmlMain } from "@/components/HtmlMain";
import { getPublishedPage } from "@/lib/cms";
import { FALLBACK_PAGES } from "@/data/pages-fallback";
import {
  ensureAboutPageHtml,
  ensureHomeImpactHtml,
  ensureHomePartnersHtml,
  ensureHomeWhatWeDoHtml,
  stripAboutHeroSection,
  stripHomeHeroSections,
} from "@/data/home-body";

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
  let html =
    page?.bodyHtml ||
    FALLBACK_PAGES[slug]?.bodyHtml ||
    `<section class="section"><div class="container"><p>Content coming soon.</p></div></section>`;

  if (slug === "home") {
    html = ensureHomeWhatWeDoHtml(html);
    html = ensureHomePartnersHtml(html);
    html = ensureHomeImpactHtml(html);
    if (above) {
      html = stripHomeHeroSections(html);
      if (!/\bid=["']what-we-do["']/.test(html)) {
        html = html.replace(/<section class="section"/, '<section class="section" id="what-we-do"');
      }
    }
  }

  if (slug === "about") {
    html = ensureAboutPageHtml(html);
    if (above) {
      html = stripAboutHeroSection(html);
    }
  }

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
      <main
        id="main"
        className={
          slug === "home" ? "main--home" : slug === "about" ? "main--about" : undefined
        }
      >
        {above}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
  }

  return <HtmlMain html={html} />;
}

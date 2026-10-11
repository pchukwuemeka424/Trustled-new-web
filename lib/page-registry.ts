export type PageMeta = {
  slug: string;
  label: string;
  path: string;
};

/** All site pages editable in the admin CMS. */
export const PAGE_REGISTRY: PageMeta[] = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "about", label: "About", path: "/about" },
  { slug: "services", label: "Services", path: "/services" },
  { slug: "who-we-serve", label: "Who we serve", path: "/who-we-serve" },
  { slug: "programmes", label: "Programmes", path: "/programmes" },
  { slug: "impact", label: "Impact", path: "/impact" },
  { slug: "insights", label: "Insights", path: "/insights" },
  { slug: "contact", label: "Contact", path: "/contact" },
  {
    slug: "ai-governance-advisory",
    label: "AI governance advisory",
    path: "/ai-governance-advisory",
  },
  {
    slug: "training-and-certification",
    label: "Training and certification",
    path: "/training-and-certification",
  },
  {
    slug: "custom-ai-solutions",
    label: "Custom AI solutions",
    path: "/custom-ai-solutions",
  },
  { slug: "garil-ai", label: "GARIL AI", path: "/garil-ai" },
  {
    slug: "ai-career-path",
    label: "AI career path",
    path: "/ai-career-path",
  },
  {
    slug: "responsible-ai-tracking",
    label: "Responsible AI tracking",
    path: "/responsible-ai-tracking",
  },
  { slug: "asat", label: "ASAT", path: "/asat" },
  {
    slug: "case-study-uaicip",
    label: "Case study: UAICIP",
    path: "/case-study-uaicip",
  },
  {
    slug: "case-study-ai-use-policy",
    label: "Case study: AI use policy",
    path: "/case-study-ai-use-policy",
  },
  {
    slug: "unidel-symposium",
    label: "UNIDEL symposium",
    path: "/unidel-symposium",
  },
  { slug: "privacy", label: "Privacy", path: "/privacy" },
  { slug: "thank-you", label: "Thank you", path: "/thank-you" },
];

export function slugFromPath(pathname: string) {
  if (pathname === "/" || pathname === "") return "home";
  return pathname.replace(/^\//, "").replace(/\/$/, "");
}

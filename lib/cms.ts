import { unstable_noStore as noStore } from "next/cache";
import {
  getPagesCollection,
  type PageDocument,
  type PageImage,
  type PageSection,
} from "@/lib/mongodb";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import { FALLBACK_PAGES } from "@/data/pages-fallback";
import {
  ensureAboutPageHtml,
  ensureHomeImpactHtml,
  ensureHomePartnersHtml,
  ensureHomeWhatWeDoHtml,
  hasRemovedFounderBio,
  isHomePlaceholder,
  renameFoundersHeading,
  stripRemovedFounderBio,
} from "@/data/home-body";
import { normalizeSections, parseSections, sectionsToHtml } from "@/lib/sections";

export type PublicPage = {
  slug: string;
  title: string;
  description: string;
  bodyHtml: string;
  sections: PageSection[];
  heroImage?: string;
  images: PageImage[];
  published: boolean;
  updatedAt?: string;
  createdAt?: string;
};

function toPublic(doc: PageDocument): PublicPage {
  const sections = normalizeSections(doc.sections, doc.bodyHtml || "");
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    bodyHtml: sections.length ? sectionsToHtml(sections) : doc.bodyHtml || "",
    sections,
    heroImage: doc.heroImage || "",
    images: doc.images || [],
    published: doc.published !== false,
    updatedAt: doc.updatedAt?.toISOString?.() ?? undefined,
    createdAt: doc.createdAt?.toISOString?.() ?? undefined,
  };
}

function fallbackFor(slug: string): PublicPage | null {
  const fb = FALLBACK_PAGES[slug];
  if (!fb) return null;
  const sections = parseSections(fb.bodyHtml || "");
  return {
    slug,
    title: fb.title,
    description: fb.description,
    bodyHtml: fb.bodyHtml,
    sections,
    heroImage: fb.heroImage || "",
    images: [],
    published: true,
  };
}

export async function ensurePagesSeeded() {
  const col = await getPagesCollection();
  const count = await col.countDocuments();
  if (count > 0) return;

  const now = new Date();
  const docs: PageDocument[] = PAGE_REGISTRY.map((meta) => {
    const fb = FALLBACK_PAGES[meta.slug];
    const bodyHtml =
      fb?.bodyHtml ||
      `<section class="section"><div class="container"><h1 class="h1">${meta.label}</h1></div></section>`;
    const sections = parseSections(bodyHtml);
    return {
      slug: meta.slug,
      title: fb?.title || `${meta.label} | TrustLed AI`,
      description: fb?.description || "",
      bodyHtml,
      sections,
      heroImage: fb?.heroImage || "",
      images: [],
      published: true,
      createdAt: now,
      updatedAt: now,
    };
  });

  if (docs.length) {
    await col.insertMany(docs);
  }
}

/** Backfill sections for pages that only have bodyHtml / home placeholder. */
async function ensureSectionsMigrated(doc: PageDocument) {
  const fallback = FALLBACK_PAGES[doc.slug];
  const needsHomeUpgrade =
    doc.slug === "home" && isHomePlaceholder(doc.bodyHtml || "");
  const needsHomeWhatWeDo =
    doc.slug === "home" &&
    !needsHomeUpgrade &&
    (!/(home-service-card|home-services)/i.test(doc.bodyHtml || "") ||
      !/home-spotlight/i.test(doc.bodyHtml || ""));
  const needsHomePartners =
    doc.slug === "home" &&
    !needsHomeUpgrade &&
    !(doc.bodyHtml || "").includes("home-partners-section");
  const needsHomeImpact =
    doc.slug === "home" &&
    !needsHomeUpgrade &&
    !(doc.bodyHtml || "").includes("home-impact-section");
  const needsAboutHero =
    doc.slug === "about" &&
    fallback &&
    !(doc.bodyHtml || "").includes("about-hero") &&
    (fallback.bodyHtml || "").includes("about-hero");
  const needsAboutLayout =
    doc.slug === "about" &&
    !/(about-story|about-purpose|about-impact)/i.test(doc.bodyHtml || "");
  const needsAboutFounders =
    doc.slug === "about" &&
    !needsAboutLayout &&
    !/about-founders/i.test(doc.bodyHtml || "");
  const aboutStored = `${doc.bodyHtml || ""}\n${JSON.stringify(doc.sections || [])}`;
  const needsAboutBioStrip = doc.slug === "about" && hasRemovedFounderBio(aboutStored);
  const needsAboutTeamRename =
    doc.slug === "about" && /Meet the founders/i.test(aboutStored);
  const needsSections = !Array.isArray(doc.sections) || doc.sections.length === 0;

  if (
    !needsHomeUpgrade &&
    !needsHomeWhatWeDo &&
    !needsHomePartners &&
    !needsHomeImpact &&
    !needsAboutHero &&
    !needsAboutLayout &&
    !needsAboutFounders &&
    !needsAboutBioStrip &&
    !needsAboutTeamRename &&
    !needsSections
  ) {
    return doc;
  }

  let bodyHtml =
    needsHomeUpgrade || needsAboutHero
      ? fallback?.bodyHtml || doc.bodyHtml || ""
      : doc.bodyHtml || "";
  if (needsHomeWhatWeDo || (needsHomeUpgrade && doc.slug === "home")) {
    bodyHtml = ensureHomeWhatWeDoHtml(bodyHtml);
  }
  if (needsHomePartners || (needsHomeUpgrade && doc.slug === "home")) {
    bodyHtml = ensureHomePartnersHtml(bodyHtml);
  }
  if (needsHomeImpact || (needsHomeUpgrade && doc.slug === "home")) {
    bodyHtml = ensureHomeImpactHtml(bodyHtml);
  }
  if (needsAboutLayout || needsAboutHero || needsAboutFounders) {
    bodyHtml = ensureAboutPageHtml(bodyHtml);
  }
  if (needsAboutBioStrip || needsAboutTeamRename) {
    const fromSections =
      Array.isArray(doc.sections) && doc.sections.length
        ? sectionsToHtml(doc.sections)
        : "";
    const source =
      hasRemovedFounderBio(bodyHtml) || /Meet the founders/i.test(bodyHtml)
        ? bodyHtml
        : fromSections || bodyHtml;
    bodyHtml = renameFoundersHeading(stripRemovedFounderBio(source));
  }
  const sections = parseSections(bodyHtml);
  const col = await getPagesCollection();
  await col.updateOne(
    { slug: doc.slug },
    {
      $set: {
        sections,
        bodyHtml: sectionsToHtml(sections) || bodyHtml,
        updatedAt: new Date(),
      },
    },
  );
  return { ...doc, bodyHtml, sections };
}

/** Reset a page to the seeded fallback content (all sections). */
export async function resetPageFromFallback(slug: string) {
  const fb = FALLBACK_PAGES[slug];
  if (!fb) throw new Error("Unknown page");
  return upsertPage(slug, {
    title: fb.title,
    description: fb.description,
    bodyHtml: fb.bodyHtml,
    heroImage: fb.heroImage || "",
    published: true,
  });
}

export async function listPages(): Promise<PublicPage[]> {
  noStore();
  await ensurePagesSeeded();
  const col = await getPagesCollection();
  const docs = await col.find({}).sort({ slug: 1 }).toArray();
  const migrated = await Promise.all(docs.map((doc) => ensureSectionsMigrated(doc)));
  const bySlug = new Map(migrated.map((d) => [d.slug, toPublic(d)]));

  return PAGE_REGISTRY.map((meta) => {
    return bySlug.get(meta.slug) || fallbackFor(meta.slug)!;
  }).filter(Boolean);
}

export async function getPage(slug: string): Promise<PublicPage | null> {
  noStore();
  try {
    await ensurePagesSeeded();
    const col = await getPagesCollection();
    const doc = await col.findOne({ slug });
    if (doc) {
      const migrated = await ensureSectionsMigrated(doc);
      return toPublic(migrated);
    }
  } catch {
    // Fall through to static fallback when DB is unavailable
  }
  return fallbackFor(slug);
}

export async function getPublishedPage(slug: string): Promise<PublicPage | null> {
  const page = await getPage(slug);
  if (!page) return null;
  if (!page.published) return fallbackFor(slug);
  return page;
}

export async function upsertPage(
  slug: string,
  input: {
    title: string;
    description: string;
    bodyHtml?: string;
    sections?: PageSection[];
    heroImage?: string;
    images?: PageImage[];
    published?: boolean;
  },
) {
  const col = await getPagesCollection();
  const now = new Date();
  const existing = await col.findOne({ slug });

  const sections = normalizeSections(
    input.sections,
    input.bodyHtml ?? existing?.bodyHtml ?? "",
  );
  const bodyHtml = sectionsToHtml(sections);

  const next: PageDocument = {
    slug,
    title: input.title,
    description: input.description,
    bodyHtml,
    sections,
    heroImage: input.heroImage || "",
    images: input.images ?? existing?.images ?? [],
    published: input.published ?? existing?.published ?? true,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await col.updateOne({ slug }, { $set: next }, { upsert: true });
  return toPublic(next);
}

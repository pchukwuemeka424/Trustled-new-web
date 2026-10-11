import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getPage, upsertPage } from "@/lib/cms";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import type { PageImage, PageSection } from "@/lib/mongodb";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  if (!PAGE_REGISTRY.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  try {
    const page = await getPage(slug);
    return NextResponse.json({ page });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load page" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  if (!PAGE_REGISTRY.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const title = String(body?.title || "").trim();
    const description = String(body?.description || "").trim();
    const bodyHtml = String(body?.bodyHtml ?? "");
    const heroImage = String(body?.heroImage || "");
    const published = Boolean(body?.published ?? true);
    const images = Array.isArray(body?.images)
      ? (body.images as PageImage[])
      : undefined;
    const sections = Array.isArray(body?.sections)
      ? (body.sections as PageSection[]).map((section, index) => ({
          id: String(section?.id || `sec-${index}`),
          label: String(section?.label || `Section ${index + 1}`),
          html: String(section?.html || ""),
        }))
      : undefined;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const page = await upsertPage(slug, {
      title,
      description,
      bodyHtml,
      sections,
      heroImage,
      images,
      published,
    });

    return NextResponse.json({ page });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}

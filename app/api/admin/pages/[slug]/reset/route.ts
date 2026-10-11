import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { resetPageFromFallback } from "@/lib/cms";
import { PAGE_REGISTRY } from "@/lib/page-registry";

type Ctx = { params: Promise<{ slug: string }> };

export async function POST(_request: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  if (!PAGE_REGISTRY.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  try {
    const page = await resetPageFromFallback(slug);
    return NextResponse.json({ page });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to reset page" }, { status: 500 });
  }
}

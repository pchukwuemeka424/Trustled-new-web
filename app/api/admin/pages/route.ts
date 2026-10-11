import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { listPages } from "@/lib/cms";
import { PAGE_REGISTRY } from "@/lib/page-registry";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const pages = await listPages();
    return NextResponse.json({
      pages,
      registry: PAGE_REGISTRY,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load pages" },
      { status: 500 },
    );
  }
}

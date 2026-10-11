import { notFound, redirect } from "next/navigation";
import { LiveEditor } from "@/app/admin/LiveEditor";
import { isAdminAuthenticated } from "@/lib/auth";
import { PAGE_REGISTRY } from "@/lib/page-registry";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AdminEditPage({ params }: Props) {
  const { slug } = await params;
  const meta = PAGE_REGISTRY.find((p) => p.slug === slug);
  if (!meta) notFound();

  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/admin");

  return <LiveEditor slug={meta.slug} label={meta.label} path={meta.path} />;
}

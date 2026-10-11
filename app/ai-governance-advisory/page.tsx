import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("ai-governance-advisory");
}

export default async function Page() {
  return <CmsPage slug="ai-governance-advisory" />;
}

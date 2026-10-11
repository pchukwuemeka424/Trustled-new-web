import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("garil-ai");
}

export default async function Page() {
  return <CmsPage slug="garil-ai" />;
}

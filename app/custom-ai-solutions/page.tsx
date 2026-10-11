import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("custom-ai-solutions");
}

export default async function Page() {
  return <CmsPage slug="custom-ai-solutions" />;
}

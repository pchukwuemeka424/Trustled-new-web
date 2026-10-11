import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("privacy");
}

export default async function Page() {
  return <CmsPage slug="privacy" />;
}

import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("impact");
}

export default async function Page() {
  return <CmsPage slug="impact" />;
}

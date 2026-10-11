import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("who-we-serve");
}

export default async function Page() {
  return <CmsPage slug="who-we-serve" />;
}

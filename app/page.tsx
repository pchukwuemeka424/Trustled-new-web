import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("home");
}

export default async function Page() {
  return <CmsPage slug="home" />;
}

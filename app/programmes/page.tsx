import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("programmes");
}

export default async function Page() {
  return <CmsPage slug="programmes" />;
}

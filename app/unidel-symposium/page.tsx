import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("unidel-symposium");
}

export default async function Page() {
  return <CmsPage slug="unidel-symposium" />;
}

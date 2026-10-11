import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("case-study-uaicip");
}

export default async function Page() {
  return <CmsPage slug="case-study-uaicip" />;
}

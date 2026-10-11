import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("asat");
}

export default async function Page() {
  return <CmsPage slug="asat" />;
}

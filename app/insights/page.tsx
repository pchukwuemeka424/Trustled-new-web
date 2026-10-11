import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("insights");
}

export default async function Page() {
  return <CmsPage slug="insights" />;
}

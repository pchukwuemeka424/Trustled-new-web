import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("thank-you");
}

export default async function Page() {
  return <CmsPage slug="thank-you" />;
}

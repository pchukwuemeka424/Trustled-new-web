import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("training-and-certification");
}

export default async function Page() {
  return <CmsPage slug="training-and-certification" />;
}

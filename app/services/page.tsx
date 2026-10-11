import { CmsPage, cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("services");
}

export default async function Page() {
  return <CmsPage slug="services" />;
}

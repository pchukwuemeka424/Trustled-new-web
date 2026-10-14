import { CmsPage, cmsMetadata } from "@/components/CmsPage";
import { HomeHero } from "@/components/HomeHero";

export async function generateMetadata() {
  return cmsMetadata("home");
}

export default async function Page() {
  return <CmsPage slug="home" above={<HomeHero />} />;
}

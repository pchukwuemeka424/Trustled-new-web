import { CmsPage, cmsMetadata } from "@/components/CmsPage";
import { AboutHero } from "@/components/AboutHero";

export async function generateMetadata() {
  return cmsMetadata("about");
}

export default async function Page() {
  return <CmsPage slug="about" above={<AboutHero />} />;
}

import { ContactHero } from "@/components/ContactHero";
import { ContactSection } from "@/components/ContactSection";
import { cmsMetadata } from "@/components/CmsPage";

export async function generateMetadata() {
  return cmsMetadata("contact");
}

export default function Page() {
  return (
    <main id="main" className="main--contact">
      <ContactHero />
      <ContactSection />
    </main>
  );
}

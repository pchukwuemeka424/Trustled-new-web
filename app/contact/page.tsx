import { ContactForm } from "@/components/ContactForm";
import { cmsMetadata } from "@/components/CmsPage";
import { getPublishedPage } from "@/lib/cms";
import { FALLBACK_PAGES } from "@/data/pages-fallback";

export async function generateMetadata() {
  return cmsMetadata("contact");
}

export default async function Page() {
  const page = await getPublishedPage("contact");
  const raw =
    page?.bodyHtml || FALLBACK_PAGES.contact?.bodyHtml || "";
  const withMarker = raw.replace(
    /<form[\s\S]*?<\/form>/i,
    "<!--CONTACT_FORM-->",
  );
  const [before = "", after = ""] = withMarker.split("<!--CONTACT_FORM-->");

  return (
    <main id="main">
      <div dangerouslySetInnerHTML={{ __html: before }} />
      <ContactForm />
      {after.trim() ? (
        <div dangerouslySetInnerHTML={{ __html: after }} />
      ) : null}
    </main>
  );
}

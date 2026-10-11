import { HtmlMain } from "@/components/HtmlMain";

const html = "<section class=\"section\" style=\"padding:96px 0\">\n<div class=\"container center reveal\" style=\"max-width:620px\">\n<div class=\"eyebrow\">Error 404</div>\n<h1 class=\"h1 mt-8\">We could not find that page</h1>\n<p class=\"lead mt-16\">The link may be out of date, or the page may have moved.</p>\n<div class=\"btn-row mt-24\" style=\"justify-content:center\"><a class=\"btn btn-primary\" href=\"/\">Back to home <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></a><a class=\"btn btn-outline\" href=\"/contact\">Contact us</a></div>\n</div>\n</section>";

export default function NotFound() {
  return <HtmlMain html={html} />;
}

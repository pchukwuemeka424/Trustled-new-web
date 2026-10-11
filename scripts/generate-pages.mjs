#!/usr/bin/env node
/**
 * Convert legacy HTML pages into Next.js App Router page modules.
 * Page bodies are stored as rewritten HTML fragments rendered via HtmlMain.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const legacy = path.join(root, "_legacy");
const appDir = path.join(root, "app");
const dataDir = path.join(root, "data");

function rewriteHtml(html) {
  return html
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="([^"#?]+)\.html(#[^"]*)?"/g, 'href="/$1$2"')
    .replace(/href="([^"#?]+)\.html(\?[^"]*)"/g, 'href="/$1$2"')
    .replace(/(src|href)="assets\//g, '$1="/assets/')
    .replace(/action="thank-you\.html"/g, 'action="/thank-you"')
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .trim();
}

function extract(html) {
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "TrustLed AI";
  const description =
    (html.match(/name="description" content="([^"]*)"/) || [])[1] || "";
  const main = (html.match(/<main id="main">([\s\S]*?)<\/main>/) || [])[1] || "";
  return { title, description, main: rewriteHtml(main) };
}

function routeFor(file) {
  if (file === "index.html") return "";
  if (file === "404.html") return null; // handled separately
  return file.replace(/\.html$/, "");
}

function buildPage({ title, description, main, hasSurvey, surveyId }) {
  const imports = [
    'import type { Metadata } from "next";',
    'import { HtmlMain } from "@/components/HtmlMain";',
  ];
  if (hasSurvey) {
    imports.push('import { SurveyInit } from "@/components/SurveyInit";');
    imports.push(`import surveyData from "@/data/${surveyId}.json";`);
  }

  return `${imports.join("\n")}

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  openGraph: {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    type: "website",
    images: [{ url: "/assets/img/logo.png" }],
  },
};

const html = ${JSON.stringify(main)};

export default function Page() {
  return (
    <>
      <HtmlMain html={html} />
${hasSurvey ? `      <SurveyInit surveyId=${JSON.stringify(surveyId)} data={surveyData} />\n` : ""}    </>
  );
}
`;
}

fs.mkdirSync(dataDir, { recursive: true });

const files = fs.readdirSync(legacy).filter((f) => f.endsWith(".html"));

for (const file of files) {
  // Hand-maintained pages with custom React heroes.
  if (file === "index.html" || file === "about.html") continue;

  const html = fs.readFileSync(path.join(legacy, file), "utf8");
  const { title, description, main } = extract(html);

  // Extract survey JSON if present
  const surveyMatch = html.match(
    /<script type="application\/json" id="([^"]+)-data">([\s\S]*?)<\/script>/
  );
  let hasSurvey = false;
  let surveyId = null;
  if (surveyMatch) {
    hasSurvey = true;
    surveyId = surveyMatch[1];
    const jsonPath = path.join(dataDir, `${surveyId}.json`);
    const parsed = JSON.parse(surveyMatch[2]);
    fs.writeFileSync(jsonPath, JSON.stringify(parsed, null, 2));
    console.log("Wrote data/", surveyId + ".json");
  }

  if (file === "404.html") {
    const content = `import { HtmlMain } from "@/components/HtmlMain";

const html = ${JSON.stringify(main)};

export default function NotFound() {
  return <HtmlMain html={html} />;
}
`;
    fs.writeFileSync(path.join(appDir, "not-found.tsx"), content);
    console.log("Wrote app/not-found.tsx");
    continue;
  }

  const slug = routeFor(file);
  const pagePath =
    slug === ""
      ? path.join(appDir, "page.tsx")
      : path.join(appDir, slug, "page.tsx");

  fs.mkdirSync(path.dirname(pagePath), { recursive: true });
  fs.writeFileSync(
    pagePath,
    buildPage({ title, description, main, hasSurvey, surveyId })
  );
  console.log("Wrote", path.relative(root, pagePath));
}

console.log("Done.");

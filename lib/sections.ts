export type PageSection = {
  id: string;
  label: string;
  html: string;
};

function stripTags(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function makeId(prefix: string, index: number) {
  return `${prefix}-${index}-${Math.random().toString(36).slice(2, 9)}`;
}

export function labelFromHtml(html: string, index: number) {
  const heading = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
  if (heading) {
    const text = stripTags(heading[1]);
    if (text) return text.slice(0, 72);
  }

  const eyebrow = html.match(/class=["'][^"']*eyebrow[^"']*["'][^>]*>([\s\S]*?)</i);
  if (eyebrow) {
    const text = stripTags(eyebrow[1]);
    if (text) return text.slice(0, 72);
  }

  if (/page-hero|class=["'][^"']*\bhero\b|about-hero|trust-strip/i.test(html)) {
    if (/trust-strip/i.test(html)) return "Trust strip";
    if (/about-hero/i.test(html)) return "About hero";
    return "Hero";
  }
  if (/class=["'][^"']*cta/i.test(html)) return "Call to action";
  if (/<!--/.test(html) && html.includes("Home page")) return "Home (React layout)";

  return `Section ${index + 1}`;
}

/** Split page HTML into editable section/block units. */
export function parseSections(bodyHtml: string): PageSection[] {
  const html = bodyHtml || "";
  if (!html.trim()) return [];

  const re = /<section\b[^>]*>[\s\S]*?<\/section>/gi;
  const chunks: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(html)) !== null) {
    const before = html.slice(lastIndex, match.index);
    if (before.trim()) chunks.push(before.trim());
    chunks.push(match[0]);
    lastIndex = match.index + match[0].length;
  }

  const after = html.slice(lastIndex);
  if (after.trim()) chunks.push(after.trim());

  if (!chunks.length) {
    return [
      {
        id: makeId("sec", 0),
        label: labelFromHtml(html, 0),
        html,
      },
    ];
  }

  return chunks.map((chunk, index) => ({
    id: makeId("sec", index),
    label: labelFromHtml(chunk, index),
    html: chunk,
  }));
}

export function sectionsToHtml(sections: PageSection[]) {
  return sections
    .map((section) => section.html.trim())
    .filter(Boolean)
    .join("\n\n");
}

export function normalizeSections(
  sections: PageSection[] | undefined | null,
  bodyHtml: string,
): PageSection[] {
  if (Array.isArray(sections) && sections.length > 0) {
    return sections.map((section, index) => ({
      id: section.id || makeId("sec", index),
      label: section.label?.trim() || labelFromHtml(section.html || "", index),
      html: section.html || "",
    }));
  }
  return parseSections(bodyHtml);
}

export function emptySection(index = 0): PageSection {
  return {
    id: makeId("sec", index),
    label: `Section ${index + 1}`,
    html: `<section class="section">
<div class="container reveal">
<div class="eyebrow">Section label</div>
<h2 class="h2">Section heading</h2>
<p>Write the section copy here.</p>
</div>
</section>`,
  };
}

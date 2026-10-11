/** Helpers to edit common text fields inside a section's HTML without rewriting the whole markup. */

export type SectionFields = {
  eyebrow: string;
  heading: string;
  lead: string;
  paragraph: string;
};

function decode(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .trim();
}

function encode(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

function matchInner(html: string, pattern: RegExp) {
  const match = html.match(pattern);
  return match ? decode(match[1]) : "";
}

export function extractSectionFields(html: string): SectionFields {
  return {
    eyebrow:
      matchInner(
        html,
        /class=["'][^"']*(?:hero-eyebrow|about-hero__brand|eyebrow)[^"']*["'][^>]*>([\s\S]*?)<\//i,
      ),
    heading:
      matchInner(html, /<h[12][^>]*>([\s\S]*?)<\/h[12]>/i) ||
      matchInner(html, /<h3[^>]*>([\s\S]*?)<\/h3>/i),
    lead: matchInner(
      html,
      /class=["'](?:[^"']*\s)?lead(?:\s[^"']*)?["'][^>]*>([\s\S]*?)<\//i,
    ),
    paragraph:
      matchInner(
        html,
        /<(?:p|div)[^>]*class=["'][^"']*(?:hero-description|about-hero__lead)[^"']*["'][^>]*>([\s\S]*?)<\//i,
      ) ||
      matchInner(
        html,
        /<p(?![^>]*class=["'][^"']*(?:small|form-note|tile-label|lead))[^>]*>([\s\S]*?)<\/p>/i,
      ),
  };
}

function replaceFirst(
  html: string,
  pattern: RegExp,
  nextInnerHtml: string,
) {
  return html.replace(pattern, (full, open: string, _inner: string, close: string) => {
    return `${open}${nextInnerHtml}${close}`;
  });
}

/** Apply simple field edits back into section HTML. Empty fields are left unchanged. */
export function applySectionFields(html: string, fields: Partial<SectionFields>) {
  let next = html;

  if (fields.eyebrow !== undefined) {
    const value = encode(fields.eyebrow);
    const pattern =
      /(class=["'][^"']*(?:hero-eyebrow|about-hero__brand|eyebrow)[^"']*["'][^>]*>)([\s\S]*?)(<)/i;
    if (pattern.test(next)) {
      next = next.replace(pattern, `$1${value}$3`);
    }
  }

  if (fields.heading !== undefined) {
    const value = encode(fields.heading);
    const h12 = /(<h[12][^>]*>)([\s\S]*?)(<\/h[12]>)/i;
    const h3 = /(<h3[^>]*>)([\s\S]*?)(<\/h3>)/i;
    if (h12.test(next)) {
      next = replaceFirst(next, h12, value);
    } else if (h3.test(next)) {
      next = replaceFirst(next, h3, value);
    }
  }

  if (fields.lead !== undefined) {
    const value = encode(fields.lead);
    const pattern =
      /(class=["'](?:[^"']*\s)?lead(?:\s[^"']*)?["'][^>]*>)([\s\S]*?)(<\/)/i;
    if (pattern.test(next)) {
      next = next.replace(pattern, `$1${value}$3`);
    }
  }

  if (fields.paragraph !== undefined) {
    const value = encode(fields.paragraph);
    const heroPattern =
      /(<(?:p|div)[^>]*class=["'][^"']*(?:hero-description|about-hero__lead)[^"']*["'][^>]*>)([\s\S]*?)(<\/)/i;
    const pPattern =
      /(<p(?![^>]*class=["'][^"']*(?:small|form-note|tile-label))[^>]*>)([\s\S]*?)(<\/p>)/i;
    if (heroPattern.test(next)) {
      next = next.replace(heroPattern, `$1${value}$3`);
    } else if (pPattern.test(next)) {
      next = next.replace(pPattern, `$1${value}$3`);
    }
  }

  return next;
}

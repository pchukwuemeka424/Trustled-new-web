type Props = {
  html: string;
};

/** Renders migrated page body markup with existing class hooks for SiteEffects. */
export function HtmlMain({ html }: Props) {
  return <main id="main" dangerouslySetInnerHTML={{ __html: html }} />;
}

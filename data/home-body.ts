/** Full home page HTML used by the CMS (editable section-by-section in admin).
 * Hero is rendered by the React `HomeHero` component — keep CMS body below it.
 */

const ARROW_SVG =
  '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const CHECK_OK =
  '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12.5 10 17l9-10"/></svg>';
const CHECK_WIP =
  '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="7.5"/></svg>';

/** What we do — three image service cards (also used to backfill CMS home). */
export const HOME_WHAT_WE_DO_HTML = `<section class="section" id="what-we-do">
<div class="container">
<div class="section-head section-head--row reveal">
<div>
<div class="eyebrow">What we do</div>
<h2 class="h2">Advice, skills and technology, working as one.</h2>
<p>Our consultancy sets the rules, our training builds the confidence to follow them, and our technology puts them into everyday use.</p>
</div>
<a class="link-arrow" href="/services">View all services ${ARROW_SVG}</a>
</div>
<div class="home-services reveal-stagger">
<a class="tile home-service-card" href="/ai-governance-advisory">
<div class="home-service-card__media"><img src="/assets/img/home/home-advisory.jpg" alt="AI governance and compliance workspace with standards and frameworks" width="640" height="360" loading="lazy"></div>
<div class="home-service-card__body">
<span class="tile-label">01 — Advisory</span>
<h3 class="h3">AI Governance Advisory</h3>
<p>Policies, risk frameworks and oversight structures aligned to ISO/IEC 42001, the NIST AI RMF and data protection law.</p>
<div class="home-status-list">
<div><span>AI use policy</span><span class="home-status home-status--ok"><span class="home-check">${CHECK_OK}</span> Approved</span></div>
<div><span>Risk register</span><span class="home-status home-status--ok"><span class="home-check">${CHECK_OK}</span> In place</span></div>
<div><span>ISO/IEC 42001 alignment</span><span class="home-status home-status--wip"><span class="home-check">${CHECK_WIP}</span> In progress</span></div>
</div>
<span class="more">Explore advisory ${ARROW_SVG}</span>
</div>
</a>
<a class="tile home-service-card" href="/training-and-certification">
<div class="home-service-card__media"><img src="/assets/img/home/home-training.jpg" alt="Training desk with notebook, certificate folder and analytics laptop" width="640" height="360" loading="lazy"></div>
<div class="home-service-card__body">
<span class="tile-label">02 — Training</span>
<h3 class="h3">Training and Certification Programmes</h3>
<p>Hands-on responsible AI training for leaders, staff and students, with assessments that evidence real competence.</p>
<div class="home-progress">
<div class="bar is-visible" style="--w:76%"><span></span></div>
<div class="home-progress__meta"><span>Staff completing the foundation track</span><strong>76%</strong></div>
</div>
<span class="more">Explore training ${ARROW_SVG}</span>
</div>
</a>
<a class="tile home-service-card" href="/custom-ai-solutions">
<div class="home-service-card__media"><img src="/assets/img/home/home-technology.jpg" alt="Laptop displaying analytics dashboards and data visualisations" width="640" height="360" loading="lazy"></div>
<div class="home-service-card__body">
<span class="tile-label">03 — Technology</span>
<h3 class="h3">Custom AI Solutions</h3>
<p>AI tools built around your data and workflows, with governance controls from the start.</p>
<div class="home-pills"><span>Access controls</span><span>Audit trails</span><span>Privacy by design</span></div>
<span class="more">Explore tools ${ARROW_SVG}</span>
</div>
</a>
</div>
<div class="home-spotlights reveal-stagger">
<a class="tile home-spotlight" href="/garil-ai">
<div class="home-spotlight__copy">
<span class="tile-label">Solution</span>
<h3 class="h3">GARIL AI</h3>
<p>Our governed AI workspace for academics.</p>
<div class="home-cap-grid">
<div><span class="home-cap-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16v12H4z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></svg></span><strong>Provenance</strong><span>Own-work records</span></div>
<div><span class="home-cap-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></svg></span><strong>Research Assist</strong><span>Grounded sources</span></div>
<div><span class="home-cap-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/></svg></span><strong>Supervision</strong><span>Guided review</span></div>
<div><span class="home-cap-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M4 12h16M4 18h10"/></svg></span><strong>Governance</strong><span>Audit trails</span></div>
</div>
<span class="more">Discover GARIL AI ${ARROW_SVG}</span>
</div>
<div class="home-spotlight__media"><img src="/assets/img/home/home-garil-desk.jpg" alt="Professional using a laptop displaying the GARIL AI workspace" width="1024" height="682" loading="lazy"></div>
</a>
<a class="tile home-spotlight home-spotlight--programme" href="/programmes#uaicip">
<div class="home-spotlight__copy">
<span class="tile-label">Programme</span>
<h3 class="h3">University AI Capability &amp; Integrity Programme</h3>
<p>Responsible AI training for students, academic staff and administrators, delivered across 10 universities and colleges of education in Nigeria.</p>
<ul class="home-feature-list">
<li><span class="home-cap-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 19V5h6l2 3h8v11H4z"/></svg></span>Curriculum co-design</li>
<li><span class="home-cap-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="8" height="12" rx="1"/><rect x="13" y="8" width="8" height="8" rx="1"/></svg></span>Hybrid delivery</li>
<li><span class="home-cap-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M8 20l4-3 4 3"/></svg></span>Assessment &amp; certification</li>
</ul>
<span class="more">About UAICIP ${ARROW_SVG}</span>
</div>
<div class="home-spotlight__media"><img src="/assets/img/home/home-uaicip.jpg" alt="University students on campus representing UAICIP" width="640" height="800" loading="lazy"><span class="home-spotlight__curve" aria-hidden="true"></span></div>
</a>
</div>
</div>
</section>`;

/** Partners logo carousel HTML (also used to backfill CMS home if missing). */
export const HOME_PARTNERS_HTML = `<section class="section home-partners-section" aria-labelledby="partners-title">
<div class="container home-partners">
<div class="home-partners__copy reveal">
<div class="eyebrow">Partners</div>
<h2 id="partners-title" class="h2">Organisations we work with</h2>
<p>Technology and delivery partners who help us bring responsible AI into real organisational practice.</p>
</div>
<div class="partners-carousel">
<div class="partners-carousel__viewport">
<ul class="partners-carousel__track" aria-label="Partner logos">
<li class="partner-mark"><img src="/assets/img/partners/acehub.png" alt="ACEHUB Technologies Ltd logo" width="220" height="72" loading="lazy"></li>
<li class="partner-mark"><img src="/assets/img/partners/bridgedegrees.png" alt="BridgeDegrees logo" width="220" height="72" loading="lazy"></li>
<li class="partner-mark"><img src="/assets/img/partners/destech.png" alt="Destech Innovation Ltd logo" width="220" height="72" loading="lazy"></li>
<li class="partner-mark"><img src="/assets/img/partners/okes.png" alt="OKES Innovation Limited logo" width="220" height="72" loading="lazy"></li>
<li class="partner-mark"><img src="/assets/img/partners/meremu.png" alt="Meremu Techhub Limited logo" width="220" height="72" loading="lazy"></li>
<li class="partner-mark" aria-hidden="true"><img src="/assets/img/partners/acehub.png" alt="" width="220" height="72" loading="lazy"></li>
<li class="partner-mark" aria-hidden="true"><img src="/assets/img/partners/bridgedegrees.png" alt="" width="220" height="72" loading="lazy"></li>
<li class="partner-mark" aria-hidden="true"><img src="/assets/img/partners/destech.png" alt="" width="220" height="72" loading="lazy"></li>
<li class="partner-mark" aria-hidden="true"><img src="/assets/img/partners/okes.png" alt="" width="220" height="72" loading="lazy"></li>
<li class="partner-mark" aria-hidden="true"><img src="/assets/img/partners/meremu.png" alt="" width="220" height="72" loading="lazy"></li>
</ul>
</div>
</div>
</div>
</section>`;

const AFRICA_MAP_DOTS = [
  [92, 18], [102, 24], [84, 28], [110, 34], [76, 38], [96, 40], [118, 46],
  [70, 50], [88, 54], [106, 56], [126, 60], [62, 64], [80, 68], [98, 70],
  [116, 74], [134, 78], [54, 80], [72, 84], [90, 88], [108, 90], [126, 94],
  [48, 98], [66, 102], [84, 106], [102, 108], [120, 112], [138, 116],
  [56, 118], [74, 122], [92, 126], [110, 130], [128, 134],
  [64, 138], [82, 144], [100, 148], [118, 152],
  [72, 158], [90, 164], [108, 170],
  [80, 178], [96, 186], [90, 196],
]
  .map(
    ([cx, cy], i) =>
      `<circle cx="${cx}" cy="${cy}" r="${i % 7 === 0 ? 2.8 : 2.1}" />`,
  )
  .join("");

/** Our Impact split panel (also used to backfill CMS home if missing). */
export const HOME_IMPACT_HTML = `<section class="section home-impact-section" aria-labelledby="home-impact-title">
<div class="container">
<div class="home-impact reveal">
<div class="home-impact__media">
<img src="/assets/img/home/home-impact.jpg" alt="Modern glass building representing institutional impact across Africa" width="1200" height="675" loading="lazy">
<div class="home-impact__stats">
<div><strong>100+</strong><span>Students &amp; educators trained</span></div>
<div><strong>10</strong><span>Institutions supported</span></div>
<div><strong>5</strong><span>Sector partnerships</span></div>
</div>
</div>
<div class="home-impact__copy">
<svg class="home-impact__map" viewBox="0 0 180 210" aria-hidden="true"><g fill="currentColor">${AFRICA_MAP_DOTS}</g></svg>
<div class="eyebrow">Our impact</div>
<h2 id="home-impact-title" class="h2">Building AI capability and integrity across Africa.</h2>
<p>From campus programmes to organisational policy work, we help institutions put responsible AI into practice with skills, clear rules and evidence they can stand behind.</p>
<a class="btn btn-primary" href="/impact">See our impact ${ARROW_SVG}</a>
</div>
</div>
</div>
</section>`;

export const HOME_BODY_HTML = `${HOME_WHAT_WE_DO_HTML}

${HOME_PARTNERS_HTML}

${HOME_IMPACT_HTML}

<section class="section section--flush-top">
<div class="container">
<div class="cta cta--navy home-cta reveal">
<div class="cta-copy"><div><div class="eyebrow">Let's work together</div><h2 class="h2">Ready to adopt AI responsibly?</h2><p>Book a consultation to discuss your goals, your current AI use, and the clearest next step for your organisation.</p></div></div>
<a class="btn btn-primary" href="/contact">Book a consultation ${ARROW_SVG}</a>
</div>
</div>
</section>`;

const ICON_CAL =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3.5v3M16 3.5v3M3.5 10h17"/></svg>';
const ICON_BUILD =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6M10 10h.01M14 10h.01M10 13h.01M14 13h.01"/></svg>';
const ICON_PIN =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"/><circle cx="12" cy="11" r="2.2"/></svg>';
const ICON_PEOPLE =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S14 16 14.5 19M14.5 14.8c1.7-.3 3.4.4 4.5 2.2"/></svg>';
const ICON_TARGET =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>';
const ICON_EYE =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>';
const ICON_GEM =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3.5 20 9.2 12 20.5 4 9.2 12 3.5Z"/><path d="M4 9.2h16M9.2 3.9 12 9.2l2.8-5.3"/></svg>';
const ICON_CAP =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 10.5 12 6l9 4.5L12 15 3 10.5Z"/><path d="M7 12.4v3.8c0 1.3 2.2 2.5 5 2.5s5-1.2 5-2.5v-3.8"/><path d="M21 10.5v5"/></svg>';
const ICON_PILLAR =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 20h16M6 20V9h12v11M5 9h14M8 6h8l1.5 3h-11L8 6Z"/></svg>';
const ICON_GLOBE =
  '<svg class="about-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.5 3.6 8.5S14.4 17.9 12 20.5C9.6 17.9 8.4 15 8.4 12S9.6 6.1 12 3.5Z"/></svg>';

export const ABOUT_HERO_HTML = `<section class="about-hero" aria-labelledby="about-hero-title">
<div class="about-hero__media" aria-hidden="true">
<img src="/assets/img/about-hero-earth.jpg" alt="" width="1024" height="409">
<div class="about-hero__shade"></div>
<div class="about-hero__grain"></div>
</div>
<div class="about-hero__inner">
<p class="about-hero__eyebrow">About us</p>
<h1 id="about-hero-title">Building a safer, fairer and more trusted future <span class="about-hero__accent">with AI.</span></h1>
<p class="about-hero__lead">TrustLed AI helps universities, businesses and public sector bodies adopt AI with clear governance, capable people and tools they can trust.</p>
<div class="about-hero__actions">
<a class="hero-btn hero-btn--primary" href="/services#approach">Our approach <span class="hero-arrow" aria-hidden="true">→</span></a>
<a class="hero-btn about-hero__btn-secondary" href="/who-we-serve">Who we serve <span class="hero-arrow" aria-hidden="true">→</span></a>
</div>
</div>
</section>`;

export const ABOUT_FOUNDERS_HTML = `<section class="section about-founders-section" aria-labelledby="about-founders-title">
<div class="container">
<div class="about-founders__head reveal">
<div class="eyebrow">Meet the founders</div>
<h2 id="about-founders-title" class="h2">The people behind the work.</h2>
<p>Practitioners actively working in AI governance and AI engineering.</p>
</div>
<div class="about-founders-grid reveal-stagger">
<article class="about-founder">
<span class="about-founder__avatar" aria-hidden="true">FO</span>
<h3 class="about-founder__name">Franklin Okeke</h3>
<p class="about-founder__role">Consultant - AI Governance</p>
<p class="about-founder__bio">CISA and ISO/IEC 42001 Lead Auditor. MSc in Cybersecurity and Human Factors. Technology writer with 400+ published articles across the trade press on AI governance and cybersecurity.</p>
</article>
<article class="about-founder">
<span class="about-founder__avatar" aria-hidden="true">PC</span>
<h3 class="about-founder__name">Prince Chukwuemeka</h3>
<p class="about-founder__role">AI Engineering Lead</p>
<p class="about-founder__bio">Engineering lead behind TrustLed AI’s tooling and secure deployments, with a background building ISO 27001 and GDPR risk frameworks.</p>
</article>
<article class="about-founder">
<span class="about-founder__avatar" aria-hidden="true">AO</span>
<h3 class="about-founder__name">Dr Arome Solomon Odiba</h3>
<p class="about-founder__role">Research &amp; Scientific Advisory Partner</p>
<p class="about-founder__bio">Research and scientific advisory partner supporting TrustLed AI’s evidence-led approach to responsible AI.</p>
</article>
</div>
</div>
</section>`;

/** About page body below the hero — mockup layout. */
export const ABOUT_BODY_HTML = `<section class="section about-story-section">
<div class="container">
<div class="about-story reveal">
<div class="about-story__media">
<img src="/assets/img/about-story.jpg" alt="" width="1024" height="576" loading="lazy">
</div>
<div class="about-story__copy">
<div class="eyebrow">Our story</div>
<h2 class="h2">Why TrustLed AI exists</h2>
<p>Organisations are adopting AI faster than they can govern it. Policies lag behind tools, staff invent their own workarounds, and leaders have little evidence to show boards and regulators that AI use is safe.</p>
<p>TrustLed AI was founded to close that gap — combining governance, security, research and education experience so advice, training and technology reinforce each other.</p>
</div>
</div>
<div class="about-story-facts reveal-stagger">
<div class="about-story-fact">${ICON_CAL}<div><b>2026</b><small>Founded</small></div></div>
<div class="about-story-fact">${ICON_BUILD}<div><b>UK &amp; Nigeria</b><small>Registered</small></div></div>
<div class="about-story-fact">${ICON_PIN}<div><b>Liverpool · Abuja</b><small>Offices</small></div></div>
<div class="about-story-fact">${ICON_PEOPLE}<div><b>Organisations</b><small>Universities, public sector &amp; businesses</small></div></div>
</div>
</div>
</section>

<section class="section section--soft about-purpose-section">
<div class="container">
<div class="about-purpose reveal">
<div class="about-purpose__intro">
<div class="eyebrow">Our purpose</div>
<h2 class="h2">To help organisations adopt AI with clear governance, capable people and tools they can trust.</h2>
<p>We design practical policies, capable teams and governed tools around the realities of each sector — so responsible AI use holds on Monday morning, not only on paper.</p>
<a class="btn btn-primary" href="/services">Our services ${ARROW_SVG}</a>
</div>
<div class="about-purpose-grid reveal-stagger">
<article class="about-purpose-card">
<span class="about-purpose-card__icon" aria-hidden="true">${ICON_TARGET}</span>
<h3 class="h3">Our mission</h3>
<p>Help organisations adopt AI with clear governance, capable people and tools they can trust.</p>
</article>
<article class="about-purpose-card">
<span class="about-purpose-card__icon" aria-hidden="true">${ICON_EYE}</span>
<h3 class="h3">Our vision</h3>
<p>A future where every organisation using AI can show that it does so safely, fairly and to good effect.</p>
</article>
<article class="about-purpose-card">
<span class="about-purpose-card__icon" aria-hidden="true">${ICON_GEM}</span>
<h3 class="h3">Our values</h3>
<p>Evidence first, built around your context, practical by default, and integrity in everything we do.</p>
</article>
<article class="about-purpose-card">
<span class="about-purpose-card__icon" aria-hidden="true">${ICON_PEOPLE}</span>
<h3 class="h3">Who we work with</h3>
<p>Universities and research institutes, businesses, and public sector bodies in the UK, Nigeria and beyond.</p>
</article>
</div>
</div>
</div>
</section>

<section class="section about-impact-section">
<div class="container">
<div class="about-impact reveal">
<div class="about-impact__copy">
<div class="eyebrow">Our impact</div>
<h2 class="h2">Supporting responsible AI adoption across sectors</h2>
<p>From campus-wide training programmes to policy and tooling engagements, we help institutions put AI to work with confidence.</p>
<a class="btn btn-outline" href="/impact">Explore our impact ${ARROW_SVG}</a>
</div>
<div class="about-impact-stats reveal-stagger">
<div class="about-impact-stat">${ICON_CAP}<b>10+</b><span>Universities and colleges supported</span></div>
<div class="about-impact-stat">${ICON_PILLAR}<b>Organisations</b><span>Across education, public sector and business</span></div>
<div class="about-impact-stat">${ICON_GLOBE}<b>UK &amp; Africa</b><span>Projects and partnerships</span></div>
</div>
</div>
</div>
</section>

${ABOUT_FOUNDERS_HTML}

<section class="section about-cta-section">
<div class="container">
<div class="about-cta reveal">
<div class="about-cta__copy">
<div class="eyebrow">Work with us</div>
<h2 class="h2">Ready to build responsible AI in your organisation?</h2>
</div>
<div class="about-cta__actions">
<p>Tell us where you stand with AI and what you want to achieve. We will be clear about how we can help.</p>
<div class="btn-row">
<a class="btn btn-primary" href="/contact">Book a consultation ${ARROW_SVG}</a>
<a class="btn btn-light" href="/services">Explore our services ${ARROW_SVG}</a>
</div>
</div>
</div>
</div>
</section>`;

const ABOUT_STORY_IMG = "/assets/img/about-story.jpg";

function syncAboutImages(html: string) {
  return (html || "").replace(
    /(<div class="about-story__media">\s*<img\b[^>]*?\bsrc=)(["'])[^"']*\2/i,
    `$1$2${ABOUT_STORY_IMG}$2`,
  );
}

/** Insert Meet the Founders when CMS About HTML is missing it. */
function ensureAboutFoundersHtml(html: string) {
  const source = html || "";
  if (/about-founders/i.test(source)) return source;

  if (/about-cta-section/i.test(source)) {
    return source.replace(
      /<section\b[^>]*\bclass=(["'])[^"']*\babout-cta-section\b[^"']*\1[^>]*>[\s\S]*?<\/section>/i,
      `${ABOUT_FOUNDERS_HTML}\n\n$&`,
    );
  }
  if (/about-impact-section/i.test(source)) {
    return source.replace(
      /(<section\b[^>]*\bclass=(["'])[^"']*\babout-impact-section\b[^"']*\2[^>]*>[\s\S]*?<\/section>)/i,
      `$1\n\n${ABOUT_FOUNDERS_HTML}`,
    );
  }
  return `${source.trim()}\n\n${ABOUT_FOUNDERS_HTML}`;
}

/** Keep About body on the mockup layout (legacy mission/values/company upgraded). */
export function ensureAboutPageHtml(html: string) {
  const source = html || "";
  if (/about-story/i.test(source) && /about-purpose/i.test(source) && /about-impact/i.test(source)) {
    return ensureAboutFoundersHtml(syncAboutImages(source));
  }

  if (/about-hero/i.test(source)) {
    const heroMatch = source.match(
      /<section\b[^>]*\bclass=(["'])[^"']*\babout-hero\b[^"']*\1[^>]*>[\s\S]*?<\/section>/i,
    );
    if (heroMatch) {
      return `${heroMatch[0]}\n\n${ABOUT_BODY_HTML}`;
    }
  }

  return ABOUT_BODY_HTML;
}

/** Remove CMS about-hero when React `AboutHero` is mounted above the body. */
export function stripAboutHeroSection(html: string) {
  return (html || "")
    .replace(
      /<section\b[^>]*\bclass=(["'])[^"']*\babout-hero\b[^"']*\1[^>]*>[\s\S]*?<\/section>/gi,
      "",
    )
    .trim();
}

export function isHomePlaceholder(html: string) {
  const t = (html || "").trim();
  return (
    !t ||
    t.startsWith("<!--") ||
    t.includes("Home page uses React") ||
    t.includes("component-driven")
  );
}

const HOME_GARIL_IMG = "/assets/img/home/home-garil-desk.jpg";

/** Keep the home GARIL spotlight on the current asset (CMS HTML may still point at an older file). */
function syncHomeGarilImage(html: string) {
  return html.replace(
    /(<a\b[^>]*href=(["'])\/garil-ai\2[^>]*>[\s\S]*?<div class="home-spotlight__media">\s*<img\b[^>]*?\bsrc=)(["'])[^"']*\3/i,
    `$1$3${HOME_GARIL_IMG}$3`,
  );
}

/** Upgrade / insert the image-card What we do section (services + spotlights). */
export function ensureHomeWhatWeDoHtml(html: string) {
  const source = html || "";
  const hasServices = /home-service-card|home-services/i.test(source);
  const hasSpotlights = /home-spotlight/i.test(source);
  if (hasServices && hasSpotlights) return syncHomeGarilImage(source);

  // If services exist but spotlights are missing, replace the whole What we do block.
  let next = source;
  if (/id=["']what-we-do["']/i.test(source)) {
    next = source.replace(
      /<section\b[^>]*\bid=(["'])what-we-do\1[^>]*>[\s\S]*?<\/section>/i,
      HOME_WHAT_WE_DO_HTML,
    );
  } else if (/eyebrow[^>]*>\s*What we do/i.test(source)) {
    next = source.replace(
      /<section\b[^>]*>[\s\S]*?eyebrow[^>]*>\s*What we do[\s\S]*?<\/section>/i,
      HOME_WHAT_WE_DO_HTML,
    );
  } else {
    next = `${HOME_WHAT_WE_DO_HTML}\n\n${source.trim()}`;
  }
  return syncHomeGarilImage(next);
}

/** Insert partners section into home HTML if the CMS copy is missing it. */
export function ensureHomePartnersHtml(html: string) {
  const source = html || "";
  if (/home-partners-section/i.test(source)) return source;

  // Prefer after "What we do", otherwise before Impact, else append.
  if (/id=["']what-we-do["']/i.test(source)) {
    return source.replace(
      /(<section\b[^>]*\bid=(["'])what-we-do\2[^>]*>[\s\S]*?<\/section>)/i,
      `$1\n\n${HOME_PARTNERS_HTML}`,
    );
  }
  if (/home-impact-section/i.test(source)) {
    return source.replace(
      /<section\b[^>]*\bclass=(["'])[^"']*\bhome-impact-section\b[^"']*\1[^>]*>[\s\S]*?<\/section>/i,
      `${HOME_PARTNERS_HTML}\n\n$&`,
    );
  }
  return `${source.trim()}\n\n${HOME_PARTNERS_HTML}`;
}

/** Insert / upgrade Our Impact panel when CMS still has Recent work cards or is missing it. */
export function ensureHomeImpactHtml(html: string) {
  const source = html || "";
  if (/home-impact-section/i.test(source)) return source;

  // Replace legacy "Recent work" case-study block when present.
  if (/eyebrow[^>]*>\s*Impact/i.test(source) && /Recent work/i.test(source)) {
    return source.replace(
      /<section\b[^>]*>[\s\S]*?eyebrow[^>]*>\s*Impact[\s\S]*?Recent work[\s\S]*?<\/section>/i,
      HOME_IMPACT_HTML,
    );
  }
  if (/home-partners-section/i.test(source)) {
    return source.replace(
      /(<section\b[^>]*\bclass=(["'])[^"']*\bhome-partners-section\b[^"']*\2[^>]*>[\s\S]*?<\/section>)/i,
      `$1\n\n${HOME_IMPACT_HTML}`,
    );
  }
  if (/cta--navy/i.test(source)) {
    return source.replace(
      /<section\b[^>]*>[\s\S]*?cta--navy[\s\S]*?<\/section>/i,
      `${HOME_IMPACT_HTML}\n\n$&`,
    );
  }
  return `${source.trim()}\n\n${HOME_IMPACT_HTML}`;
}

/** Remove CMS hero / trust-strip when React `HomeHero` is mounted above the body. */
export function stripHomeHeroSections(html: string) {
  return (html || "")
    .replace(/<section\b[^>]*\bclass=(["'])[^"']*\bhero\b[^"']*\1[^>]*>[\s\S]*?<\/section>/gi, "")
    .replace(
      /<section\b[^>]*\bclass=(["'])[^"']*\btrust-strip\b[^"']*\1[^>]*>[\s\S]*?<\/section>/gi,
      "",
    )
    .trim();
}

/** Full home page HTML used by the CMS (editable section-by-section in admin). */
export const HOME_BODY_HTML = `<section class="hero" aria-labelledby="hero-title">
<div class="hero-inner">
<div class="hero-copy">
<div class="hero-eyebrow">Responsible AI consultancy &amp; training</div>
<h1 id="hero-title">Responsible AI,<br>built into how your organisation <span>works.</span></h1>
<p class="hero-description">TrustLed AI advises leaders, trains staff and students, and builds governed AI tools so organisations can adopt AI with clear rules, real skills and evidence they can stand behind.</p>
<div class="hero-actions">
<a class="hero-btn hero-btn--primary" href="/services">Explore our services <span class="hero-arrow" aria-hidden="true">→</span></a>
<a class="hero-btn hero-btn--secondary" href="/garil-ai">Discover GARIL AI <span class="hero-arrow" aria-hidden="true">→</span></a>
</div>
</div>
<div class="hero-visual" aria-label="TrustLed AI services">
<div class="visual-outline" aria-hidden="true"></div>
<div class="dot-pattern" aria-hidden="true"></div>
<div class="dot-pattern orange" aria-hidden="true"></div>
<div class="building-frame">
<img src="/assets/img/hero-building.jpg" alt="Modern glass and steel office architecture" width="1600" height="1067">
</div>
<a class="service-card card-advisory" href="/ai-governance-advisory"><span class="icon" aria-hidden="true">▤</span><span><strong>AI Advisory</strong><small>Strategy, policy and governance</small></span><span class="chevron" aria-hidden="true">›</span></a>
<a class="service-card card-training" href="/training-and-certification"><span class="icon" aria-hidden="true">♟</span><span><strong>Training</strong><small>Hands-on learning for real impact</small></span><span class="chevron" aria-hidden="true">›</span></a>
<a class="service-card card-tools" href="/custom-ai-solutions"><span class="icon" aria-hidden="true">⚙</span><span><strong>Custom AI Tools</strong><small>Build responsibly, for your needs</small></span><span class="chevron" aria-hidden="true">›</span></a>
<a class="service-card card-garil" href="/garil-ai"><span class="icon" aria-hidden="true">▰</span><span><strong>GARIL AI</strong><small>Guidance, rules and implementation for AI</small></span><span class="chevron" aria-hidden="true">›</span></a>
</div>
</div>
</section>

<section class="trust-strip" aria-label="TrustLed AI impact">
<div class="trust-item"><span class="trust-icon" aria-hidden="true">♟</span><div class="trust-label">Educators &amp; students trained<strong>100+</strong></div></div>
<div class="trust-item"><span class="trust-icon" aria-hidden="true">⌑</span><div class="trust-label">Universities &amp; colleges supported<strong>10</strong></div></div>
<div class="trust-item"><span class="trust-icon" aria-hidden="true">▤</span><div class="trust-label">Organisations across sectors<strong>5</strong></div></div>
<div class="trust-item"><span class="trust-icon" aria-hidden="true">◎</span><div class="trust-label">Registered in the UK &amp; Nigeria<strong>UK + NG</strong></div></div>
</section>

<section class="section">
<div class="container">
<div class="section-head section-head--row reveal">
<div>
<div class="eyebrow">What we do</div>
<h2 class="h2">Advice, skills and technology, working as one.</h2>
<p>Our consultancy sets the rules, our training builds the confidence to follow them, and our technology puts them into everyday use.</p>
</div>
<a class="link-arrow" href="/services">View all services <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
</div>
<div class="bento reveal-stagger">
<a class="tile tile--navy b-4" href="/ai-governance-advisory"><span class="tile-label">01 · Advisory</span><h3 class="h3">AI Governance Advisory</h3><p>Policies, risk frameworks and oversight structures aligned to ISO/IEC 42001, the NIST AI RMF and data protection law.</p><div class="mini-list"><div><span>AI use policy</span><span class="ok">Approved</span></div><div><span>Risk register</span><span class="ok">In place</span></div><div><span>ISO/IEC 42001 alignment</span><span class="wip">In progress</span></div></div><span class="more">Explore advisory <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
<a class="tile tile--peach b-2" href="/training-and-certification"><span class="tile-label">02 · Training</span><h3 class="h3">Training and Certification Programmes</h3><p>Hands-on responsible AI training for leaders, staff and students, with assessments that evidence real competence.</p><div class="bar" style="--w:72%"><span></span></div><span class="small muted">Staff completing the foundation track</span><span class="more">Explore training <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
<a class="tile b-2" href="/custom-ai-solutions"><span class="tile-label">03 · Technology</span><h3 class="h3">Custom AI Solutions</h3><p>AI tools built around your data and workflows, with governance controls from the start.</p><div class="chips"><span class="chip">Access controls</span><span class="chip">Audit trails</span><span class="chip">Privacy by design</span></div><span class="more">Explore tools <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
<a class="tile tile--navy2 b-2" href="/garil-ai"><span class="tile-label">Solution</span><h3 class="h3">GARIL AI</h3><p>Our governed AI workspace for academics.</p><div class="cap-grid"><div><strong>Provenance</strong>Own-work records</div><div><strong>Research Assist</strong>Grounded sources</div><div><strong>Supervision</strong>Guided review</div><div><strong>Governance</strong>Audit trails</div></div><span class="more">Discover GARIL AI <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
<a class="tile tile--orange b-2" href="/programmes#uaicip"><span class="tile-label">Programme</span><h3 class="h3">University AI Capability &amp; Integrity Programme</h3><p>Responsible AI training for students, academic staff and administrators, delivered across 10 universities and colleges of education in Nigeria.</p><span class="more">About UAICIP <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
</div>
</div>
</section>

<section class="section">
<div class="container">
<div class="section-head section-head--row reveal">
<div>
<div class="eyebrow">Impact</div>
<h2 class="h2">Recent work</h2>
</div>
<a class="link-arrow" href="/impact">See all our work <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
</div>
<div class="grid grid-2 reveal-stagger">
<a class="card" href="/case-study-uaicip" style="padding:0;overflow:hidden">
<div class="ph" style="border-radius:0;min-height:190px">[Photo: UAICIP training session]</div>
<div style="padding:22px">
<div class="tile-label">Case study · Training</div>
<h3 class="h3" style="margin-top:6px">Building AI capability and integrity across 10 Nigerian universities and colleges of education</h3>
<span class="link-arrow">Read the case study <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
</div>
</a>
<a class="card" href="/case-study-ai-use-policy" style="padding:0;overflow:hidden">
<div class="ph" style="border-radius:0;min-height:190px">[Photo: policy workshop with managers]</div>
<div style="padding:22px">
<div class="tile-label">Case study · Governance</div>
<h3 class="h3" style="margin-top:6px">Shaping an Acceptable AI Use Policy for a private sector firm</h3>
<span class="link-arrow">Read the case study <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
</div>
</a>
</div>
</div>
</section>

<section class="section section--flush-top">
<div class="container">
<div class="cta cta--navy reveal">
<div class="cta-copy"><div class="cta-mark"><img src="/assets/img/mark.png" alt=""></div><div><h2 class="h2">Ready to put AI governance into practice?</h2><p>Tell us where your organisation stands with AI and what you want to achieve. We will come back with a clear next step.</p></div></div>
<a class="btn btn-primary" href="/contact">Book a consultation <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
</div>
</div>
</section>`;

export const ABOUT_HERO_HTML = `<section class="about-hero" aria-labelledby="about-hero-title">
<div class="about-hero__media" aria-hidden="true">
<img src="/assets/img/hero-building.jpg" alt="" width="1600" height="1067">
<div class="about-hero__shade"></div>
<div class="about-hero__grain"></div>
</div>
<div class="about-hero__inner">
<p class="about-hero__brand">TrustLed AI</p>
<h1 id="about-hero-title">Built for organisations adopting AI faster than they can <span>govern it.</span></h1>
<p class="about-hero__lead">We combine governance, security, research and education experience to help universities, businesses and public sector bodies put AI to work with confidence.</p>
<div class="about-hero__actions">
<a class="hero-btn hero-btn--primary" href="/contact">Work with us <span class="hero-arrow" aria-hidden="true">→</span></a>
<a class="hero-btn about-hero__btn-secondary" href="/services">Explore our services <span class="hero-arrow" aria-hidden="true">→</span></a>
</div>
</div>
</section>`;

export function isHomePlaceholder(html: string) {
  const t = (html || "").trim();
  return (
    !t ||
    t.startsWith("<!--") ||
    t.includes("Home page uses React") ||
    t.includes("component-driven")
  );
}

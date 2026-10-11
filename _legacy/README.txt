TrustLed AI website - deployment notes
======================================

DEPLOY ON NETLIFY
1. Unzip this folder.
2. Go to https://app.netlify.com/drop and drag the unzipped "trustled-site" folder onto the page.
3. In Netlify, open Domain management and add trustledai.com. Update your domain's DNS records as Netlify instructs. HTTPS is issued automatically.

FORMS (all submissions go to hello@trustledai.com)
The contact form, ASAT early access form and newsletter sign-ups send directly to hello@trustledai.com through FormSubmit (formsubmit.co). No Netlify Forms are used.

One-time activation:
- After the site is live, submit any form once (for example, the contact form).
- FormSubmit will send an activation email to hello@trustledai.com.
- Click the confirmation link in that email. Every submission after that lands in the inbox.
- Optional: FormSubmit's activation email also gives a private alias code. You can replace
  "hello@trustledai.com" in each form's action URL with that code so the address is hidden from the page source.

After sending, visitors are taken to /thank-you.html.

BEFORE GOING LIVE - replace these placeholders
- Photos: search the pages for "[Photo" and replace each placeholder block with a real image.
- Case study (UAICIP): participant number "[0,000+]" and the quote.
- Case study (AI use policy): "[sector]", "[country]", "[00]" staff briefed and the quote.
- Symposium article: "[Date]".
- Insights page: placeholder articles and events.
- Privacy policy: have it reviewed before launch.

FILES
- *.html                 Site pages
- assets/css/styles.css  Styles, hover effects, bento grids and page transitions
- assets/js/main.js      Menu, dropdown, scroll animations, counters and form handling
- assets/img/            Logo, mark and icons
- netlify.toml           Netlify headers and caching
- sitemap.xml, robots.txt

SERVICE PAGES AND FREE TOOLS (added)
- Services menu (hover on desktop, tap on mobile): AI Governance Advisory, Training and Certification Programmes, Custom AI Solutions, Check AI Career Path (free), Responsible AI Tracking (free).
- The two free tools run entirely in the visitor's browser (assets/js/survey.js). Nothing is sent unless the visitor fills in the "Send my results" form, which goes to hello@trustledai.com through FormSubmit with the score and every answer included.
- To change a question, answer or recommendation, edit the JSON block near the bottom of ai-career-path.html or responsible-ai-tracking.html.

import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/logo-light.png" alt="TrustLed AI" width={119} height={30} />
            <p>
              An AI governance consultancy and technology company helping universities, businesses
              and public sector bodies adopt AI responsibly.
            </p>
            <NewsletterForm />
          </div>
          <nav className="footer-col" aria-label="Company">
            <h3>Company</h3>
            <Link href="/about">About</Link>
            <Link href="/who-we-serve">Who we serve</Link>
            <Link href="/impact">Impact</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav className="footer-col" aria-label="Services">
            <h3>Services</h3>
            <Link href="/ai-governance-advisory">AI Governance Advisory</Link>
            <Link href="/training-and-certification">Training and Certification</Link>
            <Link href="/custom-ai-solutions">Custom AI Solutions</Link>
            <Link href="/ai-career-path">Check AI Career Path</Link>
            <Link href="/responsible-ai-tracking">Responsible AI Tracking</Link>
          </nav>
          <nav className="footer-col" aria-label="Solutions">
            <h3>Solutions</h3>
            <Link href="/garil-ai">GARIL AI</Link>
            <Link href="/asat">ASAT</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <a href="mailto:hello@trustledai.com">hello@trustledai.com</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} TrustLed AI Ltd. Registered in England and Wales, No. 17174921. Registered in
            Nigeria, CAC No. 9613640.
          </span>
          <span>Liverpool, United Kingdom · Abuja, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}

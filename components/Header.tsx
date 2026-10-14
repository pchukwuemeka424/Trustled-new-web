"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconArrowRight, IconChevronDown } from "./Icons";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDd, setOpenDd] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const overHero = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    setMenuOpen(false);
    setOpenDd(null);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(".dd")) setOpenDd(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}${overHero ? " site-header--over-hero" : ""}`}
    >
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="TrustLed AI home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={overHero ? "/assets/img/logo-light.png" : "/assets/img/logo.png"}
            alt="TrustLed AI"
            width={127}
            height={32}
            decoding="async"
            fetchPriority="high"
          />
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/" aria-current={isActive(pathname, "/") ? "page" : undefined}>
            Home
          </Link>
          <Link href="/about" aria-current={isActive(pathname, "/about") ? "page" : undefined}>
            About
          </Link>
          <div className={`dd${openDd === "services" ? " is-open" : ""}`}>
            <button
              type="button"
              className="dd-toggle"
              aria-expanded={openDd === "services"}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDd((v) => (v === "services" ? null : "services"));
              }}
            >
              Services <IconChevronDown />
            </button>
            <div className="dd-menu dd-menu--wide">
              <Link href="/ai-governance-advisory">
                <strong>AI Governance Advisory</strong>
                <span>Policy, risk and accountability for AI</span>
              </Link>
              <Link href="/training-and-certification">
                <strong>Training and Certification Programmes</strong>
                <span>Role-based learning with assessed results</span>
              </Link>
              <Link href="/custom-ai-solutions">
                <strong>Custom AI Solutions</strong>
                <span>Private AI tools built around your work</span>
              </Link>
              <Link href="/ai-career-path">
                <strong>
                  Check AI Career Path <em className="badge" style={{ fontStyle: "normal" }}>Free</em>
                </strong>
                <span>Find your role in AI governance</span>
              </Link>
              <Link href="/responsible-ai-tracking">
                <strong>
                  Responsible AI Tracking <em className="badge" style={{ fontStyle: "normal" }}>Free</em>
                </strong>
                <span>Score how well your AI is governed</span>
              </Link>
              <Link className="dd-all" href="/services">
                View all services <IconArrowRight />
              </Link>
            </div>
          </div>
          <div className={`dd${openDd === "solutions" ? " is-open" : ""}`}>
            <button
              type="button"
              className="dd-toggle"
              aria-expanded={openDd === "solutions"}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDd((v) => (v === "solutions" ? null : "solutions"));
              }}
            >
              Solutions <IconChevronDown />
            </button>
            <div className="dd-menu">
              <Link href="/garil-ai">
                <strong>GARIL AI</strong>
                <span>Governed AI workspace for academics</span>
              </Link>
              <Link href="/asat">
                <strong>
                  ASAT <em className="badge" style={{ fontStyle: "normal" }}>Coming soon</em>
                </strong>
                <span>AI Self-Assessment Toolkit</span>
              </Link>
            </div>
          </div>
          <Link href="/who-we-serve" aria-current={isActive(pathname, "/who-we-serve") ? "page" : undefined}>
            Who we serve
          </Link>
          <Link href="/programmes" aria-current={isActive(pathname, "/programmes") ? "page" : undefined}>
            Programmes
          </Link>
          <Link className="btn btn-primary nav-cta" href="/contact">
            Book a consultation <IconArrowRight />
          </Link>
        </nav>
        <Link className="btn btn-primary header-cta" href="/contact">
          Book a consultation
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
        </button>
      </div>
    </header>
  );
}

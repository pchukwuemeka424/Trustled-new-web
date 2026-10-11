"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeIn, fadeInProps, staggerList, viewportOnce } from "./motionPresets";

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HomeSections() {
  const reduceMotion = useReducedMotion();

  const list: Variants = reduceMotion
    ? { hidden: {}, show: {} }
    : staggerList(0.2, 0.15);

  const still: Variants = { hidden: { opacity: 1, x: 0, y: 0 }, show: { opacity: 1, x: 0, y: 0 } };
  const up: Variants = reduceMotion ? still : fadeIn("up", 0);
  const fromLeft: Variants = reduceMotion ? still : fadeIn("left", 0);
  const fromRight: Variants = reduceMotion ? still : fadeIn("right", 0);

  return (
    <>
      <section className="section">
        <div className="container">
          <motion.div className="section-head section-head--row" {...fadeInProps("down", 0.2, reduceMotion)}>
            <div>
              <div className="eyebrow">What we do</div>
              <h2 className="h2">Advice, skills and technology, working as one.</h2>
              <p>
                Our consultancy sets the rules, our training builds the confidence to follow them,
                and our technology puts them into everyday use.
              </p>
            </div>
            <Link className="link-arrow" href="/services">
              View all services <Arrow />
            </Link>
          </motion.div>

          <motion.div
            className="bento"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div className="b-4 home-card-motion" variants={up}>
              <Link className="tile tile--navy" href="/ai-governance-advisory">
                <span className="tile-label">01 · Advisory</span>
                <h3 className="h3">AI Governance Advisory</h3>
                <p>
                  Policies, risk frameworks and oversight structures aligned to ISO/IEC 42001, the
                  NIST AI RMF and data protection law.
                </p>
                <div className="mini-list">
                  <div>
                    <span>AI use policy</span>
                    <span className="ok">Approved</span>
                  </div>
                  <div>
                    <span>Risk register</span>
                    <span className="ok">In place</span>
                  </div>
                  <div>
                    <span>ISO/IEC 42001 alignment</span>
                    <span className="wip">In progress</span>
                  </div>
                </div>
                <span className="more">
                  Explore advisory <Arrow />
                </span>
              </Link>
            </motion.div>

            <motion.div className="b-2 home-card-motion" variants={up}>
              <Link className="tile tile--peach" href="/training-and-certification">
                <span className="tile-label">02 · Training</span>
                <h3 className="h3">Training and Certification Programmes</h3>
                <p>
                  Hands-on responsible AI training for leaders, staff and students, with assessments
                  that evidence real competence.
                </p>
                <div className="bar" style={{ ["--w" as string]: "72%" }}>
                  <span />
                </div>
                <span className="small muted">Staff completing the foundation track</span>
                <span className="more">
                  Explore training <Arrow />
                </span>
              </Link>
            </motion.div>

            <motion.div className="b-2 home-card-motion" variants={up}>
              <Link className="tile" href="/custom-ai-solutions">
                <span className="tile-label">03 · Technology</span>
                <h3 className="h3">Custom AI Solutions</h3>
                <p>AI tools built around your data and workflows, with governance controls from the start.</p>
                <div className="chips">
                  <span className="chip">Access controls</span>
                  <span className="chip">Audit trails</span>
                  <span className="chip">Privacy by design</span>
                </div>
                <span className="more">
                  Explore tools <Arrow />
                </span>
              </Link>
            </motion.div>

            <motion.div className="b-2 home-card-motion" variants={up}>
              <Link className="tile tile--navy2" href="/garil-ai">
                <span className="tile-label">Solution</span>
                <h3 className="h3">GARIL AI</h3>
                <p>Our governed AI workspace for academics.</p>
                <div className="cap-grid">
                  <div>
                    <strong>Provenance</strong>Own-work records
                  </div>
                  <div>
                    <strong>Research Assist</strong>Grounded sources
                  </div>
                  <div>
                    <strong>Supervision</strong>Guided review
                  </div>
                  <div>
                    <strong>Governance</strong>Audit trails
                  </div>
                </div>
                <span className="more">
                  Discover GARIL AI <Arrow />
                </span>
              </Link>
            </motion.div>

            <motion.div className="b-2 home-card-motion" variants={up}>
              <Link className="tile tile--orange" href="/programmes#uaicip">
                <span className="tile-label">Programme</span>
                <h3 className="h3">University AI Capability &amp; Integrity Programme</h3>
                <p>
                  Responsible AI training for students, academic staff and administrators, delivered
                  across 10 universities and colleges of education in Nigeria.
                </p>
                <span className="more">
                  About UAICIP <Arrow />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="section-head section-head--row" {...fadeInProps("down", 0.2, reduceMotion)}>
            <div>
              <div className="eyebrow">Impact</div>
              <h2 className="h2">Recent work</h2>
            </div>
            <Link className="link-arrow" href="/impact">
              See all our work <Arrow />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-2"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div className="home-card-motion" variants={fromLeft}>
              <Link className="card" href="/case-study-uaicip" style={{ padding: 0, overflow: "hidden" }}>
                <div className="ph" style={{ borderRadius: 0, minHeight: 190 }}>
                  [Photo: UAICIP training session]
                </div>
                <div style={{ padding: 22 }}>
                  <div className="tile-label">Case study · Training</div>
                  <h3 className="h3" style={{ marginTop: 6 }}>
                    Building AI capability and integrity across 10 Nigerian universities and colleges
                    of education
                  </h3>
                  <span className="link-arrow">
                    Read the case study <Arrow />
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div className="home-card-motion" variants={fromRight}>
              <Link
                className="card"
                href="/case-study-ai-use-policy"
                style={{ padding: 0, overflow: "hidden" }}
              >
                <div className="ph" style={{ borderRadius: 0, minHeight: 190 }}>
                  [Photo: policy workshop with managers]
                </div>
                <div style={{ padding: 22 }}>
                  <div className="tile-label">Case study · Governance</div>
                  <h3 className="h3" style={{ marginTop: 6 }}>
                    Shaping an Acceptable AI Use Policy for a private sector firm
                  </h3>
                  <span className="link-arrow">
                    Read the case study <Arrow />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <motion.div className="cta cta--navy" {...fadeInProps("up", 0.2, reduceMotion)}>
            <div className="cta-copy">
              <div className="cta-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/img/mark.png" alt="" />
              </div>
              <div>
                <h2 className="h2">Ready to put AI governance into practice?</h2>
                <p>
                  Tell us where your organisation stands with AI and what you want to achieve. We
                  will come back with a clear next step.
                </p>
              </div>
            </div>
            <Link className="btn btn-primary" href="/contact">
              Book a consultation <Arrow />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeInOnLoad } from "./motionPresets";
import { SplitTitle } from "./SplitTitle";

const MotionLink = motion.create(Link);

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <motion.div className="hero-eyebrow" {...fadeInOnLoad("down", 0.15, reduceMotion)}>
              Responsible AI consultancy &amp; training
            </motion.div>
            <SplitTitle id="hero-title" delay={0.22}>
              Responsible AI,
              <br />
              built into how your organisation <span>works.</span>
            </SplitTitle>
            <motion.p className="hero-description" {...fadeInOnLoad("up", 0.4, reduceMotion)}>
              TrustLed AI advises leaders, trains staff and students, and builds governed AI tools so
              organisations can adopt AI with clear rules, real skills and evidence they can stand
              behind.
            </motion.p>
            <motion.div className="hero-actions" {...fadeInOnLoad("up", 0.55, reduceMotion)}>
              <Link className="hero-btn hero-btn--primary" href="/services">
                Explore our services <span className="hero-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link className="hero-btn hero-btn--secondary" href="/garil-ai">
                Discover GARIL AI <span className="hero-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="hero-visual" aria-label="TrustLed AI services">
            <motion.div
              className="visual-outline"
              aria-hidden="true"
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 0.85 },
                    transition: { duration: 1.2, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  })}
            />
            <motion.div
              className="dot-pattern"
              aria-hidden="true"
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 1.2, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] },
                  })}
            />
            <motion.div
              className="dot-pattern orange"
              aria-hidden="true"
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  })}
            />
            <motion.div
              className="building-frame-motion"
              {...fadeInOnLoad("right", 0.3, reduceMotion)}
            >
              <div className="building-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/img/hero-building.jpg"
                  alt="Modern glass and steel office architecture"
                  width={1600}
                  height={1067}
                />
              </div>
            </motion.div>

            <MotionLink
              className="service-card card-advisory"
              href="/ai-governance-advisory"
              {...fadeInOnLoad("left", 0.45, reduceMotion)}
              whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
            >
              <span className="icon" aria-hidden="true">
                ▤
              </span>
              <span>
                <strong>AI Advisory</strong>
                <small>Strategy, policy and governance</small>
              </span>
              <span className="chevron" aria-hidden="true">
                ›
              </span>
            </MotionLink>
            <MotionLink
              className="service-card card-training"
              href="/training-and-certification"
              {...fadeInOnLoad("left", 0.6, reduceMotion)}
              whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
            >
              <span className="icon" aria-hidden="true">
                ♟
              </span>
              <span>
                <strong>Training</strong>
                <small>Hands-on learning for real impact</small>
              </span>
              <span className="chevron" aria-hidden="true">
                ›
              </span>
            </MotionLink>
            <MotionLink
              className="service-card card-tools"
              href="/custom-ai-solutions"
              {...fadeInOnLoad("right", 0.7, reduceMotion)}
              whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
            >
              <span className="icon" aria-hidden="true">
                ⚙
              </span>
              <span>
                <strong>Custom AI Tools</strong>
                <small>Build responsibly, for your needs</small>
              </span>
              <span className="chevron" aria-hidden="true">
                ›
              </span>
            </MotionLink>
            <MotionLink
              className="service-card card-garil"
              href="/garil-ai"
              {...fadeInOnLoad("up", 0.85, reduceMotion)}
              whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
            >
              <span className="icon" aria-hidden="true">
                ▰
              </span>
              <span>
                <strong>GARIL AI</strong>
                <small>Guidance, rules and implementation for AI</small>
              </span>
              <span className="chevron" aria-hidden="true">
                ›
              </span>
            </MotionLink>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="TrustLed AI impact">
        <motion.div className="trust-item" {...fadeInOnLoad("up", 0.7, reduceMotion)}>
          <span className="trust-icon" aria-hidden="true">
            ♟
          </span>
          <div className="trust-label">
            Educators &amp; students trained<strong>100+</strong>
          </div>
        </motion.div>
        <motion.div className="trust-item" {...fadeInOnLoad("up", 0.85, reduceMotion)}>
          <span className="trust-icon" aria-hidden="true">
            ⌑
          </span>
          <div className="trust-label">
            Universities &amp; colleges supported<strong>10</strong>
          </div>
        </motion.div>
        <motion.div className="trust-item" {...fadeInOnLoad("up", 1.0, reduceMotion)}>
          <span className="trust-icon" aria-hidden="true">
            ▤
          </span>
          <div className="trust-label">
            Organisations across sectors<strong>5</strong>
          </div>
        </motion.div>
        <motion.div className="trust-item" {...fadeInOnLoad("up", 1.15, reduceMotion)}>
          <span className="trust-icon" aria-hidden="true">
            ◎
          </span>
          <div className="trust-label">
            Registered in the UK &amp; Nigeria<strong>UK + NG</strong>
          </div>
        </motion.div>
      </section>
    </>
  );
}

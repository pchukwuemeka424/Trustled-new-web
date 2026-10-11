"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeInOnLoad } from "./motionPresets";
import { SplitTitle } from "./SplitTitle";

export function AboutHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <div className="about-hero__media" aria-hidden="true">
        <motion.img
          src="/assets/img/hero-building.jpg"
          alt=""
          width={1600}
          height={1067}
          {...(reduceMotion
            ? {}
            : {
                initial: { scale: 1.14 },
                animate: { scale: 1.08 },
                transition: { duration: 18, ease: [0.22, 1, 0.36, 1] },
              })}
        />
        <div className="about-hero__shade" />
        <div className="about-hero__grain" />
      </div>

      <div className="about-hero__inner about-hero__inner--motion">
        <motion.p className="about-hero__brand" {...fadeInOnLoad("down", 0.15, reduceMotion)}>
          TrustLed AI
        </motion.p>
        <SplitTitle id="about-hero-title" delay={0.28}>
          Built for organisations adopting AI faster than they can <span>govern it.</span>
        </SplitTitle>
        <motion.p className="about-hero__lead" {...fadeInOnLoad("up", 0.45, reduceMotion)}>
          We combine governance, security, research and education experience to help universities,
          businesses and public sector bodies put AI to work with confidence.
        </motion.p>
        <motion.div className="about-hero__actions" {...fadeInOnLoad("up", 0.6, reduceMotion)}>
          <Link className="hero-btn hero-btn--primary" href="/contact">
            Work with us{" "}
            <span className="hero-arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link className="hero-btn about-hero__btn-secondary" href="/services">
            Explore our services{" "}
            <span className="hero-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

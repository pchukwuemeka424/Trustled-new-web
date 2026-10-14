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
          src="/assets/img/about-hero-earth.jpg"
          alt=""
          width={1024}
          height={409}
          {...(reduceMotion
            ? {}
            : {
                initial: { scale: 1.12 },
                animate: { scale: 1.04 },
                transition: { duration: 18, ease: [0.22, 1, 0.36, 1] },
              })}
        />
        <div className="about-hero__shade" />
        <div className="about-hero__grain" />
      </div>

      <div className="about-hero__inner about-hero__inner--motion">
        <motion.p className="about-hero__eyebrow" {...fadeInOnLoad("down", 0.12, reduceMotion)}>
          About us
        </motion.p>
        <SplitTitle id="about-hero-title" delay={0.28}>
          Building a safer, fairer and more trusted future{" "}
          <span className="about-hero__accent">with AI.</span>
        </SplitTitle>
        <motion.p className="about-hero__lead" {...fadeInOnLoad("up", 0.45, reduceMotion)}>
          TrustLed AI helps universities, businesses and public sector bodies adopt AI with clear
          governance, capable people and tools they can trust.
        </motion.p>
        <motion.div className="about-hero__actions" {...fadeInOnLoad("up", 0.6, reduceMotion)}>
          <Link className="hero-btn hero-btn--primary" href="/services#approach">
            Our approach{" "}
            <span className="hero-arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link className="hero-btn about-hero__btn-secondary" href="/who-we-serve">
            Who we serve{" "}
            <span className="hero-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeInOnLoad } from "./motionPresets";
import { SplitTitle } from "./SplitTitle";

export function ContactHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="contact-hero" aria-labelledby="contact-hero-title">
      <div className="contact-hero__media" aria-hidden="true">
        <motion.img
          src="/assets/img/hero-building.jpg"
          alt=""
          width={1280}
          height={853}
          {...(reduceMotion
            ? {}
            : {
                initial: { scale: 1.12 },
                animate: { scale: 1.04 },
                transition: { duration: 18, ease: [0.22, 1, 0.36, 1] },
              })}
        />
        <div className="contact-hero__shade" />
        <div className="contact-hero__grain" />
      </div>

      <div className="contact-hero__inner contact-hero__inner--motion">
        <motion.p className="contact-hero__brand" {...fadeInOnLoad("down", 0.1, reduceMotion)}>
          TrustLed AI
        </motion.p>
        <SplitTitle id="contact-hero-title" delay={0.28}>
          Book a
          <br />
          <span className="contact-hero__accent">consultation.</span>
        </SplitTitle>
        <motion.p className="contact-hero__lead" {...fadeInOnLoad("up", 0.45, reduceMotion)}>
          Tell us about your organisation and what you want to achieve with AI. We reply by email.
        </motion.p>
        <motion.div className="contact-hero__actions" {...fadeInOnLoad("up", 0.6, reduceMotion)}>
          <a className="hero-btn hero-btn--primary" href="#enquire">
            Start the form{" "}
            <span className="hero-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="hero-btn contact-hero__btn-secondary" href="mailto:hello@trustledai.com">
            Email us{" "}
            <span className="hero-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

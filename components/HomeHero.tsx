"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeInOnLoad, okesEase, okesTransition } from "./motionPresets";
import { SplitTitle } from "./SplitTitle";

const MotionLink = motion.create(Link);
const MotionImg = motion.img;

const SERVICE_CARDS = [
  {
    href: "/ai-governance-advisory",
    title: "AI Advisory",
    desc: "Strategy, policy and governance",
    className: "card-advisory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M7 3.5h7.2L17 6.3V20.5H7V3.5Z" />
        <path d="M14.2 3.5V6.3H17" />
        <path d="M9.2 10h5.6M9.2 13.2h5.6M9.2 16.4h3.8" />
      </svg>
    ),
  },
  {
    href: "/training-and-certification",
    title: "Training",
    desc: "Hands-on learning for real impact",
    className: "card-training",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3.5 9.5 12 5l8.5 4.5L12 14 3.5 9.5Z" />
        <path d="M7.2 11.6v4.2c0 1.4 2.1 2.7 4.8 2.7s4.8-1.3 4.8-2.7v-4.2" />
        <path d="M20.5 9.5v6.2" />
      </svg>
    ),
  },
  {
    href: "/garil-ai",
    title: "GARIL AI",
    desc: "Guidance, research and implementation",
    className: "card-garil",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="5" width="16" height="3.2" rx="0.8" />
        <rect x="4" y="10.4" width="16" height="3.2" rx="0.8" />
        <rect x="4" y="15.8" width="16" height="3.2" rx="0.8" />
      </svg>
    ),
  },
] as const;

const MAP_HOTSPOTS = [
  { cx: 48, cy: 28, delay: "0s" },
  { cx: 52, cy: 42, delay: "0.6s" },
  { cx: 44, cy: 52, delay: "1.2s" },
  { cx: 56, cy: 58, delay: "1.8s" },
  { cx: 50, cy: 68, delay: "0.9s" },
  { cx: 46, cy: 78, delay: "1.5s" },
] as const;

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero hero--impact" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <MotionImg
          src="/assets/img/hero-bg.jpg"
          alt=""
          width={1280}
          height={720}
          decoding="async"
          fetchPriority="high"
          initial={reduceMotion ? false : { scale: 1.12, opacity: 0.7 }}
          animate={reduceMotion ? undefined : { scale: 1.06, opacity: 1 }}
          transition={{ duration: 2.4, ease: okesEase }}
        />
      </div>
      <motion.div
        className="hero__shade"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: okesEase }}
      />

      <div className="hero-inner">
        <div className="hero-copy">
          <motion.p className="hero-eyebrow" {...fadeInOnLoad("up", 0.12, reduceMotion)}>
            Turning AI potential into real impact
          </motion.p>

          <SplitTitle id="hero-title" delay={0.22}>
            Responsible AI, built into how your{" "}
            <span className="hero-title-accent">organisation</span> works.
          </SplitTitle>

          <motion.p className="hero-description" {...fadeInOnLoad("up", 0.48, reduceMotion)}>
            We help organisations govern, adopt and scale AI with clear rules, real skills and
            evidence — turning opportunity into measurable, responsible impact.
          </motion.p>

          <motion.div className="hero-actions" {...fadeInOnLoad("up", 0.62, reduceMotion)}>
            <Link className="hero-btn hero-btn--primary" href="/services">
              Explore our services <span className="hero-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="hero-btn hero-btn--ghost" href="/garil-ai">
              Discover GARIL AI <span className="hero-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="hero-visual" aria-label="TrustLed AI services across Africa">
          <motion.div
            className="hero-map"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={okesTransition(0.28, 1.05)}
          >
            <span className="hero-map__glow" />
            <span className="hero-map__aura" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-map__image"
              src="/assets/img/hero-africa-map.jpg"
              alt=""
              width={432}
              height={576}
              decoding="async"
            />

            <svg className="hero-map__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path className="hero-map__wire" d="M18 18 C 28 28, 38 38, 48 48" />
              <path className="hero-map__wire" d="M18 82 C 28 72, 38 62, 48 52" />
              <path className="hero-map__wire" d="M86 48 C 72 48, 60 50, 52 52" />
              <path className="hero-map__arc" d="M42 36 C 28 18, 18 8, 8 4" />
              <path className="hero-map__arc" d="M58 44 C 74 28, 86 16, 96 10" />
              <path className="hero-map__arc" d="M50 70 C 62 82, 78 90, 94 96" />
              <path className="hero-map__pulse" d="M18 18 C 28 28, 38 38, 48 48" pathLength="1" />
              <path className="hero-map__pulse" d="M18 82 C 28 72, 38 62, 48 52" pathLength="1" />
              <path className="hero-map__pulse" d="M86 48 C 72 48, 60 50, 52 52" pathLength="1" />
              <path className="hero-map__pulse hero-map__pulse--arc" d="M42 36 C 28 18, 18 8, 8 4" pathLength="1" />
              <path className="hero-map__pulse hero-map__pulse--arc" d="M58 44 C 74 28, 86 16, 96 10" pathLength="1" />
              <path className="hero-map__pulse hero-map__pulse--arc" d="M50 70 C 62 82, 78 90, 94 96" pathLength="1" />
            </svg>

            {MAP_HOTSPOTS.map((spot, i) => (
              <span
                key={i}
                className="hero-map__hotspot"
                style={
                  {
                    left: `${spot.cx}%`,
                    top: `${spot.cy}%`,
                    ["--hotspot-delay"]: spot.delay,
                  } as CSSProperties
                }
              />
            ))}

            <div className="hero-map__core">
              <span className="hero-map__ring hero-map__ring--outer" />
              <span className="hero-map__ring hero-map__ring--inner" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/mark.png" alt="" width={72} height={72} />
            </div>
          </motion.div>

          {SERVICE_CARDS.map((card, index) => (
            <MotionLink
              key={card.href}
              className={`service-card ${card.className}${reduceMotion ? "" : " service-card--float"}`}
              href={card.href}
              style={
                reduceMotion
                  ? undefined
                  : ({ ["--float-delay"]: `${1.15 + index * 0.2}s` } as CSSProperties)
              }
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 32,
                      x: index === 2 ? 40 : -32,
                      scale: 0.96,
                    }
              }
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0, scale: 1 }}
              transition={okesTransition(0.55 + index * 0.14, 0.95)}
              whileHover={reduceMotion ? undefined : { scale: 1.03, transition: { duration: 0.2 } }}
            >
              <span className="icon" aria-hidden="true">
                {card.icon}
              </span>
              <span>
                <strong>{card.title}</strong>
                <small>{card.desc}</small>
              </span>
              <span className="chevron" aria-hidden="true">
                →
              </span>
            </MotionLink>
          ))}
        </div>
      </div>

      <motion.a
        className="hero-scroll"
        href="#what-we-do"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={okesTransition(1.1, 0.8)}
      >
        <motion.span
          className="hero-scroll__icon"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        >
          ↓
        </motion.span>
        Scroll to explore
      </motion.a>
      <div className="hero-progress" aria-hidden="true">
        <motion.span
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.8, ease: okesEase }}
          style={{ transformOrigin: "left center" }}
        />
      </div>
    </section>
  );
}

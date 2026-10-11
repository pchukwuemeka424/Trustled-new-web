import type { Transition, Variants } from "motion/react";

/** Matches Okes Innovation (WOW.js + Animate.css) timing: ~1.5s ease, staggered delays */
export const okesEase = [0.25, 0.1, 0.25, 1] as const;

export const okesTransition = (delay = 0, duration = 1.2): Transition => ({
  duration,
  delay,
  ease: okesEase,
});

export const viewportOnce = { once: true, amount: 0.18, margin: "0px 0px -40px 0px" } as const;

type Dir = "up" | "down" | "left" | "right";

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -48 },
  right: { x: 48 },
};

export function fadeIn(dir: Dir = "up", delay = 0.2): Variants {
  const from = offset[dir];
  return {
    hidden: { opacity: 0, x: from.x ?? 0, y: from.y ?? 0 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: okesTransition(delay),
    },
  };
}

export function staggerList(stagger = 0.2, delayChildren = 0.15): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export function fadeInProps(dir: Dir = "up", delay = 0.2, reduceMotion?: boolean | null) {
  if (reduceMotion) return {};
  const from = offset[dir];
  return {
    initial: { opacity: 0, x: from.x ?? 0, y: from.y ?? 0 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: viewportOnce,
    transition: okesTransition(delay),
  };
}

export function fadeInOnLoad(dir: Dir = "up", delay = 0.2, reduceMotion?: boolean | null) {
  if (reduceMotion) return {};
  const from = offset[dir];
  return {
    initial: { opacity: 0, x: from.x ?? 0, y: from.y ?? 0 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: okesTransition(delay),
  };
}

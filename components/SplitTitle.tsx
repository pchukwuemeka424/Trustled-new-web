"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Children,
  isValidElement,
  type ReactNode,
  type CSSProperties,
} from "react";
import { okesEase } from "./motionPresets";

type Props = {
  id?: string;
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
  children: ReactNode;
};

function Char({
  char,
  index,
  delay,
}: {
  char: string;
  index: number;
  delay: number;
}) {
  return (
    <motion.span
      className="title-char"
      aria-hidden="true"
      style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: delay + index * 0.028,
        ease: okesEase,
      }}
    >
      {char}
    </motion.span>
  );
}

function splitText(text: string, startIndex: number, delay: number) {
  const chars = text.split("");
  return {
    nodes: chars.map((char, i) => (
      <Char key={`${startIndex}-${i}`} char={char} index={startIndex + i} delay={delay} />
    )),
    next: startIndex + chars.length,
  };
}

function splitNodes(children: ReactNode, startIndex: number, delay: number): {
  nodes: ReactNode[];
  next: number;
} {
  let index = startIndex;
  const nodes: ReactNode[] = [];

  Children.forEach(children, (child, key) => {
    if (typeof child === "string" || typeof child === "number") {
      const result = splitText(String(child), index, delay);
      nodes.push(...result.nodes);
      index = result.next;
      return;
    }

    if (!isValidElement<{ children?: ReactNode; className?: string; style?: CSSProperties }>(child)) {
      nodes.push(child);
      return;
    }

    if (child.type === "br") {
      nodes.push(<br key={`br-${key}`} />);
      return;
    }

    if (child.type === "span" || child.type === "em" || child.type === "strong") {
      const inner = splitNodes(child.props.children, index, delay);
      nodes.push(
        <span key={`wrap-${key}`} className={child.props.className} style={child.props.style}>
          {inner.nodes}
        </span>
      );
      index = inner.next;
      return;
    }

    nodes.push(child);
  });

  return { nodes, next: index };
}

/** Character-stagger title entrance (Okes SplitType style) */
export function SplitTitle({ id, className, as = "h1", delay = 0.2, children }: Props) {
  const reduceMotion = useReducedMotion();
  const Tag = as === "h2" ? motion.h2 : motion.h1;

  if (reduceMotion) {
    const Static = as === "h2" ? "h2" : "h1";
    return (
      <Static id={id} className={className}>
        {children}
      </Static>
    );
  }

  const plain = collectText(children).replace(/\s+/g, " ").trim();
  const { nodes } = splitNodes(children, 0, delay);

  return (
    <Tag
      id={id}
      className={`title-anim ${className ?? ""}`.trim()}
      aria-label={plain}
    >
      <span className="title-anim__visual" aria-hidden="true">
        {nodes}
      </span>
    </Tag>
  );
}

function collectText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === "br") return " ";
    return collectText(node.props.children);
  }
  return "";
}

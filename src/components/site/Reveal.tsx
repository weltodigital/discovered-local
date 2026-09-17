"use client";

import { motion, useReducedMotion } from "motion/react";

/** The site's one entrance curve, shared by every animated element. */
export const EASE = [0.22, 1, 0.36, 1] as const;

const TAGS = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
} as const;

/**
 * Subtle one-shot entrance as a section scrolls in.
 *
 * Motion handles the observer, so this stays a thin wrapper: same props as
 * before, no layout shift, and nothing moves at all for anyone who has asked
 * for reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof TAGS;
}) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}

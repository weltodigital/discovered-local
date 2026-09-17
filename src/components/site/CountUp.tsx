"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { EASE } from "@/components/site/Reveal";

/**
 * Counts up to `to` the first time it scrolls into view.
 *
 * The real figure is what renders on the server and on first paint, so the
 * markup never contains a placeholder zero. The counter only takes over if the
 * number starts below the fold, which is the only case where counting up is
 * something anyone actually sees.
 *
 * The visible digits are driven by a motion value rather than React state, so
 * the animation never re-renders the tree.
 */
export function CountUp({ to, duration = 1.1 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [counting, setCounting] = useState(false);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    // Already on screen: leave the number alone rather than reset it to zero.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    setCounting(true);
  }, [reduced]);

  useEffect(() => {
    if (!counting || !inView) return;
    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [count, counting, duration, inView, to]);

  if (!counting) {
    return <span ref={ref}>{to}</span>;
  }

  return (
    <span ref={ref}>
      <motion.span aria-hidden>{rounded}</motion.span>
      <span className="sr-only">{to}</span>
    </span>
  );
}

'use client';

import { motion, useScroll } from 'motion/react';

/**
 * A 1px accent hairline at the very top of the viewport, scaleX driven by
 * scroll position. Lives on the long pages (CV, About); the home splash and
 * the short contact page have nothing to measure.
 *
 * It is scroll-linked, not an animation on its own clock, so reduced motion
 * keeps it as-is: there is no autonomous movement to switch off.
 *
 * z-40 sits below the modal layer (z-50), and the bar never collides with
 * the SkipLink, which appears on focus at top-4.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-40 h-px origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

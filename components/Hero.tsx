'use client';

import { motion, useReducedMotion } from 'motion/react';
import { site } from '@/content/site';
import { intro } from '@/content/about';

export default function Hero() {
  const reduce = useReducedMotion();

  // Reduced motion gets the finished state immediately, not a faster animation.
  //
  // It is not enough to simply skip the animation. The server has no motion
  // preference to read, so it always renders the pre-animation state —
  // opacity 0 — into the HTML. Handing Motion no props at all leaves that
  // opacity 0 in place and the page never appears. The finished state has to
  // be asserted on the client, or the people who asked for less motion get a
  // blank page instead.
  const enter = (duration: number, delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration, delay },
  });

  // The name, what he is, one paragraph. Nothing is selling anything.
  return (
    <section className="mx-auto flex min-h-[calc(100svh-8.5rem)] max-w-5xl flex-col justify-center px-6 py-20">
      <motion.h1 {...enter(0.7, 0)} className="text-[length:var(--text-display)]">
        {site.name}
      </motion.h1>

      <motion.p {...enter(0.6, 0.1)} className="label mt-6">
        {site.role}
      </motion.p>

      {/* Ragged right, not justified — tried and reverted. At this type size a
          390px screen fits 4-6 words per line, so justifying forces all the
          slack into 3-5 word gaps and tears rivers through the paragraph.
          Hyphenation is the usual escape hatch and is not available: Chrome on
          Windows ships its hyphenation dictionary as a separate component that
          is often absent, so `hyphens: auto` silently does nothing there. */}
      <motion.p
        {...enter(0.6, 0.18)}
        className="mt-12 max-w-2xl text-[length:var(--text-h2)] leading-snug text-muted"
      >
        {intro}
      </motion.p>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { site } from '@/content/site';

export default function Hero() {
  const reduce = useReducedMotion();

  // Reduced motion gets the finished state immediately, not a faster animation.
  const stagger = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-20 sm:pt-32">
      <motion.p
        {...stagger}
        transition={{ duration: 0.5, delay: 0 }}
        className="label mb-6"
      >
        {site.role} — {site.location}
      </motion.p>

      <motion.h1
        {...stagger}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="text-[length:var(--text-display)]"
      >
        {site.name}
      </motion.h1>

      <motion.p
        {...stagger}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="mt-8 max-w-xl text-[length:var(--text-h2)] leading-snug text-muted"
      >
        {site.tagline}
      </motion.p>

      {/* Two exits, not three. "See the work" is added in P2, when
          /prototypes exists — a hero link to a section that isn't there
          is a dead anchor, and the recruiter who clicks it learns the
          site is unfinished. */}
      <motion.nav
        {...stagger}
        transition={{ duration: 0.6, delay: 0.24 }}
        aria-label="Primary actions"
        className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
      >
        <Link href="/cv" className="border-b border-accent pb-1 text-accent">
          Read the CV
        </Link>
        <Link href="#book" className="border-b border-border pb-1 transition-colors hover:border-accent hover:text-accent">
          Book a call
        </Link>
      </motion.nav>
    </section>
  );
}

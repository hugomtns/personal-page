'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { site } from '@/content/site';
import { intro } from '@/content/about';
import { EASE_OUT } from '@/lib/motion';

// The name reveals word by word, each sliding up from behind an
// overflow-hidden mask. The mask span carries no motion itself; the inner
// motion.span does, via variant inheritance from the h1.
const maskGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const maskedWord: Variants = {
  hidden: { opacity: 0, y: '110%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  // Reduced motion gets the finished state immediately, not a faster animation.
  //
  // It is not enough to simply skip the animation. The server has no motion
  // preference to read, so it always renders the pre-animation state —
  // opacity 0 — into the HTML. Handing Motion no props at all leaves that
  // opacity 0 in place and the page never appears. The finished state has to
  // be asserted on the client, or the people who asked for less motion get a
  // blank page instead. initial="show" does that here: with reduced motion the
  // client mounts straight into the variant's final values.
  const enter = (duration: number, delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration, delay },
  });

  const words = site.name.split(' ');

  // The name, what he is, one paragraph. Nothing is selling anything.
  return (
    <section className="mx-auto flex min-h-[calc(100svh-8.5rem)] max-w-5xl flex-col justify-center px-6 py-20">
      {/* Split text breaks the accessible name (the masks swallow the
          inter-word space), so the h1 carries the name as a label and the
          animated fragments are presentation only. */}
      <motion.h1
        // Space Grotesk's H carries a 0.066em left side bearing (measured from
        // the TTF): invisible at body sizes, but at display size it pushes the
        // name's ink ~10px right of the label and paragraph below. Pull the
        // block back by exactly that, so the alignment is optical, not metric.
        className="text-display -ml-[0.066em]"
        aria-label={site.name}
        variants={maskGroup}
        initial={reduce ? 'show' : 'hidden'}
        animate="show"
      >
        {words.map((word, i) => (
          <span key={word} aria-hidden>
            {/* The mask. pb/-mb keeps descenders (the g in Hugo) from being
                clipped by the overflow clip at this line-height. */}
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span variants={maskedWord} className="inline-block">
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.h1>

      <motion.p {...enter(0.6, 0.35)} className="label mt-6">
        {site.role}
      </motion.p>

      {/* Ragged right, not justified — tried and reverted. At this type size a
          390px screen fits 4-6 words per line, so justifying forces all the
          slack into 3-5 word gaps and tears rivers through the paragraph.
          Hyphenation is the usual escape hatch and is not available: Chrome on
          Windows ships its hyphenation dictionary as a separate component that
          is often absent, so `hyphens: auto` silently does nothing there. */}
      <motion.p
        {...enter(0.6, 0.45)}
        className="mt-12 max-w-2xl text-h2 leading-snug text-muted"
      >
        {intro}
      </motion.p>
    </section>
  );
}

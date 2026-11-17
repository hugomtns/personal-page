'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_OUT } from '@/lib/motion';
import PageShell from './PageShell';

type AboutFlipProps = {
  professional: string[];
  personal: string[];
  /** Inline links inside paragraphs: the first occurrence of `match` in any
      paragraph becomes an external link. */
  links?: { match: string; href: string }[];
};

export default function AboutFlip({ professional, personal, links }: AboutFlipProps) {
  const reduce = useReducedMotion();
  const [side, setSide] = useState<'professional' | 'personal'>('professional');
  const isPersonal = side === 'personal';
  const paragraphs = isPersonal ? personal : professional;

  const renderText = (text: string) => {
    const link = links?.find((l) => text.includes(l.match));
    if (!link) return text;
    const [before, after] = text.split(link.match);
    return (
      <>
        {before}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent underline-offset-4 transition-colors duration-180 hover:text-accent"
        >
          {link.match}
        </a>
        {after}
      </>
    );
  };

  return (
    <PageShell
      title="About"
      terminal
      stickyHeading
      headingAction={(
        <button
          type="button"
          onClick={() => setSide(isPersonal ? 'professional' : 'personal')}
          className="terminal-bar__action"
        >
          <span aria-hidden="true">&gt;</span>
          {isPersonal ? 'The professional side' : 'The personal side'}
        </button>
      )}
    >

      {/* aria-live so the copy swap is announced, not just seen. */}
      <div aria-live="polite" className="terminal-about">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={side}
            className="terminal-about__paragraphs"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : DURATION.fast, ease: EASE_OUT }}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{renderText(paragraph)}</p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

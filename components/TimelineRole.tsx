'use client';

import { useState, useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Role } from '@/content/cv';

export default function TimelineRole({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <article className="border-b border-border py-8">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-4 text-left"
      >
        <span>
          <span className="font-display text-[length:var(--text-h2)] transition-colors group-hover:text-accent">
            {role.company}
          </span>
          <span className="mt-1 block text-small text-muted">{role.title}</span>
        </span>
        <span className="label whitespace-nowrap">
          {role.start} — {role.end}
        </span>
      </button>

      <p className="mt-4 max-w-2xl text-muted">{role.summary}</p>

      {/* The wrapper is always mounted so aria-controls always resolves to a
          real element. Only the content inside it comes and goes. */}
      <div id={panelId} role="region" aria-label={`${role.company} highlights`}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={reduce ? {} : { height: 'auto', opacity: 1 }}
              exit={reduce ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <dl className="mt-6 grid gap-6 border-l border-accent pl-6">
                {role.stories.map((story) => (
                  <div key={story.title}>
                    <dt className="label mb-1">{story.title}</dt>
                    <dd className="max-w-2xl">{story.body}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

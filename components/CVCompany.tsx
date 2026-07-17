'use client';

import { useState, useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Company } from '@/content/cvTimeline';
import CVProduct from './CVProduct';

/**
 * A company is a chapter: a bordered card on the timeline, with a large filled
 * node on the trunk connected by a short horizontal line. The node is nested in
 * the company name's line box (top-1/2) so it stays centered on the name at any
 * clamp size. Click reveals About + My role; products branch below.
 *
 * `first` trims the trunk so it begins at the first company's node; `last` stops
 * it at the last node instead of dangling into the trailing padding.
 */
export default function CVCompany({
  company: c,
  first = false,
  last = false,
}: {
  company: Company;
  first?: boolean;
  last?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <section className="relative pb-24">
      {/* Trunk. Trimmed at the first node (top) and the last node (bottom). */}
      <span
        aria-hidden
        className="absolute left-8 w-px -translate-x-1/2 bg-border"
        style={{ top: first ? '3.6rem' : '0', bottom: last ? '6rem' : '0' }}
      />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group ml-16 block w-full rounded-xl border border-border bg-[color-mix(in_oklab,var(--muted)_4%,transparent)] p-5 text-left transition-colors hover:border-accent"
      >
        <span className="label block">{c.dates}</span>
        <span className="relative mt-1 block">
          {/* Horizontal connector from the trunk to the card. */}
          <span
            aria-hidden
            className="absolute top-1/2 h-px w-8 -translate-y-1/2 bg-border"
            style={{ left: '-3.25rem' }}
          />
          {/* Node — large, filled, centered on the name line and on the trunk
              (its center lands at `left`; the trunk sits at 2rem = 32px, and
              the name box starts at 5.25rem = 84px, so -3.25rem centers it). */}
          <span
            aria-hidden
            className={`absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent transition-colors ${
              open ? 'bg-bg' : 'bg-accent'
            }`}
            style={{ left: '-3.25rem' }}
          />
          <span className="block font-display leading-[1.05] text-[clamp(1.75rem,3.2vw,2.6rem)] transition-colors group-hover:text-accent">
            {c.name}
          </span>
        </span>
        <span className="mt-1 block text-small text-muted">{c.tagline}</span>
      </button>

      <div id={panelId} className="ml-16">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={reduce ? {} : { height: 'auto', opacity: 1 }}
              exit={reduce ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* Border on the wrapper (not the dl) so the company link sits
                  inside the milestone body, aligned with the prose. */}
              <div className="mt-5 max-w-xl border-l border-accent pl-6">
                <dl className="grid gap-5">
                  <div>
                    <dt className="label mb-1">About</dt>
                    <dd>{c.about}</dd>
                  </div>
                  <div>
                    <dt className="label mb-1">My role</dt>
                    <dd>{c.role}</dd>
                  </div>
                </dl>

                {/* Link to the company — the end of the main milestone. */}
                {c.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {c.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products branch. */}
      <div className="mt-8 ml-16">
        {c.products.map((p) => (
          <CVProduct key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

'use client';

import { useState, useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Product } from '@/content/cvTimeline';

/**
 * A product branches off its company's trunk: a horizontal connector runs from
 * the trunk (at -1rem, the company's pl-20 gutter) out to the node, so it reads
 * as attached rather than a floating pin. Click reveals the case: image frame,
 * then Problem / What I did / Outcome. The link to the company lives on the
 * company card, not here.
 *
 * A leadership milestone has no `audience` — it shows Scope instead of Problem
 * and drops the "For" line.
 */
export default function CVProduct({ product: p }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const leadership = p.audience === '';

  return (
    <div className="relative pl-12 pb-9 last:pb-0">
      {/* Horizontal connector from the trunk out to the node. */}
      <span
        aria-hidden
        className="absolute -left-8 top-[1.35rem] h-px w-14 -translate-y-1/2 bg-border"
      />
      {/* Node. */}
      <span
        aria-hidden
        className={`absolute left-6 top-[1.35rem] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent transition-colors ${
          open ? 'bg-accent' : 'bg-bg'
        }`}
      />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-4 text-left"
      >
        <span>
          <span className="text-[1.0625rem] font-medium transition-colors group-hover:text-accent">
            {p.name}
          </span>
          <span className="mt-0.5 block text-small text-muted">{p.tagline}</span>
        </span>
        <span className="label whitespace-nowrap">{p.year}</span>
      </button>

      <div id={panelId}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={reduce ? {} : { height: 'auto', opacity: 1 }}
              exit={reduce ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 max-w-xl">
                {/* Fixed 16:10 so every product reads as one system; a product
                    with no shot still shows the frame. */}
                <div className="mb-6 aspect-[16/10] w-full overflow-hidden rounded-md border border-border bg-[color-mix(in_oklab,var(--muted)_8%,transparent)]">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="label flex h-full w-full items-center justify-center">
                      screenshot
                    </span>
                  )}
                </div>

                {!leadership && <p className="label mb-6">For · {p.audience}</p>}

                <dl className="grid gap-5 border-l border-accent pl-6">
                  <div>
                    <dt className="label mb-1">
                      {leadership ? 'Scope' : 'Problem'}
                    </dt>
                    <dd>{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="label mb-1">What I did</dt>
                    <dd>{p.did}</dd>
                  </div>
                  <div>
                    <dt className="label mb-1">Outcome</dt>
                    <dd>{p.outcome}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

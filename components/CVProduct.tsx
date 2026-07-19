'use client';

import type { Product } from '@/content/cvTimeline';
import Accordion from './Accordion';
import Screenshot from './Screenshot';
import MetaList from './MetaList';

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
  const leadership = p.audience === '';

  return (
    <div className="relative pl-12 pb-9 last:pb-0">
      {/* Horizontal connector from the trunk out to the node. */}
      <span
        aria-hidden
        className="absolute -left-8 top-[1.35rem] h-px w-14 -translate-y-1/2 bg-border"
      />

      <Accordion
        trigger={({ open, ...triggerProps }) => (
          <>
            {/* Node. Its fill tracks the open state, so the trigger renders
                it; it is still positioned against the outer relative div. */}
            <span
              aria-hidden
              className={`absolute left-6 top-[1.35rem] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent transition-colors ${
                open ? 'bg-accent' : 'bg-bg'
              }`}
            />
            <button
              type="button"
              {...triggerProps}
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
          </>
        )}
      >
        <div className="mt-5 max-w-xl">
          {/* Fixed 16:10 so every product reads as one system; a product with
              no shot still shows the frame. */}
          <Screenshot
            src={p.image}
            alt={p.name}
            className="mb-6 aspect-[16/10] w-full rounded-frame border border-border"
          />

          {!leadership && <p className="label mb-6">For · {p.audience}</p>}

          <MetaList
            className="border-l border-accent pl-6"
            items={[
              { label: leadership ? 'Scope' : 'Problem', value: p.problem },
              { label: 'What I did', value: p.did },
              { label: 'Outcome', value: p.outcome },
            ]}
          />
        </div>
      </Accordion>
    </div>
  );
}

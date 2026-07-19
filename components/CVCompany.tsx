'use client';

import type { Company } from '@/content/cvTimeline';
import Accordion from './Accordion';
import Card from './Card';
import MetaList from './MetaList';
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
  return (
    <section className="relative pb-24">
      {/* Trunk. Trimmed at the first node (top) and the last node (bottom). */}
      <span
        aria-hidden
        className="absolute left-8 w-px -translate-x-1/2 bg-border"
        style={{ top: first ? '3.6rem' : '0', bottom: last ? '6rem' : '0' }}
      />

      <Accordion
        className="ml-16"
        trigger={({ open, ...triggerProps }) => (
          <Card
            as="button"
            type="button"
            interactive
            {...triggerProps}
            className="group ml-16 block w-full p-5 text-left"
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
              <span className="block font-display leading-[1.05] text-h3 transition-colors group-hover:text-accent">
                {c.name}
              </span>
            </span>
            <span className="mt-1 block text-small text-muted">{c.tagline}</span>
          </Card>
        )}
      >
        {/* Border on the wrapper (not the dl) so the company link sits inside
            the milestone body, aligned with the prose. */}
        <div className="mt-5 max-w-xl border-l border-accent pl-6">
          <MetaList
            items={[
              { label: 'About', value: c.about },
              { label: 'My role', value: c.role },
            ]}
          />

          {/* Link to the company — the end of the main milestone. */}
          {c.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {c.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-muted underline decoration-border underline-offset-4 weight-hover hover:text-accent hover:decoration-accent"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </Accordion>

      {/* Products branch. */}
      <div className="mt-8 ml-16">
        {c.products.map((p) => (
          <CVProduct key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

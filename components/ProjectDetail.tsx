'use client';

import type { Project } from '@/content/projects';
import { Screenshot } from './ProjectTile';

/**
 * The detail for an open project: the story and the screenshot gallery. It is
 * the inner content of the full-width panel the garden opens below a tile's row
 * (see ProjectGarden) — so it carries no positioning of its own, just the
 * layout of the content and a close affordance.
 */
export default function ProjectDetail({
  project: p,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="rounded-xl border border-accent bg-[color-mix(in_oklab,var(--muted)_4%,transparent)] p-6 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-[length:var(--text-h1)]">{p.name}</h2>
          <p className="mt-1 text-small text-muted">{p.tagline}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center text-muted transition-colors hover:text-fg"
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <p className="max-w-prose leading-relaxed">{p.description}</p>

        {/* Every shot, each 16:10 so the set reads as one system. */}
        <div className="grid gap-4">
          {p.images.map((img, i) => (
            <Screenshot
              key={i}
              src={img}
              alt={`${p.name} — ${i + 1}`}
              className="aspect-[16/10] w-full rounded-md border border-border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

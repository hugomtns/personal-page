'use client';

import type { Project } from '@/content/projects';
import Card from './Card';
import Screenshot from './Screenshot';

/**
 * A tile in the grid: a thumbnail with a name and a one-line tagline, in the
 * same bordered, accent-on-hover card as the CV cards. Uniform height so the
 * grid packs without gaps — that is what lets the detail open in flow below a
 * row without any tile having to move sideways or reshuffle.
 *
 * The open tile gets the accent border (not just on hover) so it reads as the
 * one the detail panel below belongs to.
 */
export default function ProjectTile({
  project: p,
  open,
  panelId,
  onToggle,
}: {
  project: Project;
  open: boolean;
  panelId: string;
  onToggle: () => void;
}) {
  return (
    <li>
      <Card
        as="button"
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        interactive
        open={open}
        className="group flex h-full w-full flex-col overflow-hidden text-left"
      >
        <Screenshot
          src={p.images[0]}
          alt={p.name}
          className="aspect-[16/10] w-full shrink-0 rounded-t-card"
        />
        <span className="block p-5">
          <span
            className={`block font-display leading-[1.1] text-h2 transition-colors duration-180 group-hover:text-accent ${
              open ? 'text-accent' : ''
            }`}
          >
            {p.name}
          </span>
          <span className="mt-1 block text-small text-muted">{p.tagline}</span>
        </span>
      </Card>
    </li>
  );
}

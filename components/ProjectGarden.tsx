'use client';

import { Fragment, useState, useSyncExternalStore } from 'react';
import type { Project } from '@/content/projects';
import { AccordionPanel } from './Accordion';
import ProjectTile from './ProjectTile';
import ProjectDetail from './ProjectDetail';

const PANEL_ID = 'project-detail-panel';

// Column count decides which cell ends a row, so the panel can drop in after
// the whole row. This query mirrors the grid classes on the ul below:
// grid-cols-2 up to `sm`, sm:grid-cols-3 from 640px up.
const GRID_COLUMNS_QUERY = '(min-width: 640px)';

function subscribeToColumns(onChange: () => void) {
  const mq = window.matchMedia(GRID_COLUMNS_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function columnCount() {
  return window.matchMedia(GRID_COLUMNS_QUERY).matches ? 3 : 2;
}

// The server cannot know the viewport; first paint assumes the small grid.
const serverColumnCount = () => 2;

/** Index of the cell that ends the row containing `i`, clamped to the last
    tile because the final row may be short. */
export function rowEndFor(i: number, cols: number, count: number) {
  return Math.min(count - 1, (Math.floor(i / cols) + 1) * cols - 1);
}

/**
 * The garden: a uniform grid of tiles. Clicking one opens its detail as a
 * full-width panel in flow, directly below that tile's row. Nothing rearranges
 * — the tiles keep their order and positions; only the rows below the panel
 * slide down as it grows (and back up as it closes). That in-flow slide is the
 * only movement, and it is the animation, so there is no modal and no reshuffle.
 *
 * The panel is rendered by whichever row it belongs to: every row-end cell holds
 * an AccordionPanel, and the one matching the open tile's row shows the panel.
 * Rendering it per-row (rather than moving one panel around) means opening,
 * closing, and jumping between rows all animate their height cleanly.
 */
export default function ProjectGarden({ projects }: { projects: Project[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const cols = useSyncExternalStore(subscribeToColumns, columnCount, serverColumnCount);

  const open = projects.find((p) => p.id === openId) ?? null;
  const openIndex = open ? projects.indexOf(open) : -1;
  const openRowEnd = openIndex >= 0 ? rowEndFor(openIndex, cols, projects.length) : -1;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {projects.map((p, i) => {
        const tile = (
          <ProjectTile
            project={p}
            open={openId === p.id}
            panelId={PANEL_ID}
            onToggle={() => setOpenId((id) => (id === p.id ? null : p.id))}
          />
        );

        if (rowEndFor(i, cols, projects.length) !== i) {
          return <Fragment key={p.id}>{tile}</Fragment>;
        }

        return (
          <Fragment key={p.id}>
            {tile}
            <AccordionPanel
              as="li"
              open={open !== null && openRowEnd === i}
              id={PANEL_ID}
              panelKey={open?.id}
              className="col-span-full"
            >
              {open && <ProjectDetail project={open} onClose={() => setOpenId(null)} />}
            </AccordionPanel>
          </Fragment>
        );
      })}
    </ul>
  );
}

'use client';

import { Fragment, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { projects } from '@/content/projects';
import ProjectTile from './ProjectTile';
import ProjectDetail from './ProjectDetail';

const PANEL_ID = 'project-detail-panel';

/**
 * The garden: a uniform grid of tiles. Clicking one opens its detail as a
 * full-width panel in flow, directly below that tile's row. Nothing rearranges
 * — the tiles keep their order and positions; only the rows below the panel
 * slide down as it grows (and back up as it closes). That in-flow slide is the
 * only movement, and it is the animation, so there is no modal and no reshuffle.
 *
 * The panel is rendered by whichever row it belongs to: every row-end cell holds
 * an AnimatePresence, and the one matching the open tile's row shows the panel.
 * Rendering it per-row (rather than moving one panel around) means opening,
 * closing, and jumping between rows all animate their height cleanly.
 */
export default function ProjectGarden() {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  // Column count drives which cell ends each row, so the panel can be dropped
  // after the whole row. It mirrors the Tailwind grid: 2 up to `sm`, then 3.
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const update = () => setCols(mq.matches ? 3 : 2);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const open = projects.find((p) => p.id === openId) ?? null;
  const openIndex = open ? projects.indexOf(open) : -1;
  const last = projects.length - 1;
  const rowEndFor = (i: number) => Math.min(last, (Math.floor(i / cols) + 1) * cols - 1);
  const openRowEnd = openIndex >= 0 ? rowEndFor(openIndex) : -1;

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

        const isRowEnd = i % cols === cols - 1 || i === last;
        if (!isRowEnd) return <Fragment key={p.id}>{tile}</Fragment>;

        return (
          <Fragment key={p.id}>
            {tile}
            <AnimatePresence initial={false}>
              {open && openRowEnd === i && (
                <motion.li
                  key={open.id}
                  id={PANEL_ID}
                  className="col-span-full overflow-hidden"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={reduce ? {} : { height: 'auto', opacity: 1 }}
                  exit={reduce ? {} : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectDetail project={open} onClose={() => setOpenId(null)} />
                </motion.li>
              )}
            </AnimatePresence>
          </Fragment>
        );
      })}
    </ul>
  );
}

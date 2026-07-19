'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SPRING } from '@/lib/motion';

/**
 * The height-reveal disclosure behind the CV milestones and the projects
 * garden. Three call sites repeated the same AnimatePresence block (same
 * duration, same easing, same reduced-motion handling); this owns it, along
 * with the aria wiring between trigger and panel. Trigger visuals stay with
 * the call site (a company card, a product row, a garden tile): the trigger
 * is a render prop receiving the toggle, the open state, and the aria props.
 *
 * AccordionPanel is exported separately for the garden, whose open state is
 * controlled one level up (only one project open at a time) and whose panel
 * must render as an li inside the grid ul.
 *
 * Reduced motion gets the finished state asserted (explicit opacity 1), not
 * merely no animation. That is the contract Hero.tsx documents: never leave
 * an element stranded at the pre-animation state.
 */

/** What the trigger render prop receives: the toggle, the state, and the
    aria wiring that ties the trigger to the panel region. */
export type AccordionTriggerProps = {
  onClick: () => void;
  open: boolean;
  'aria-expanded': boolean;
  'aria-controls': string;
};

type PanelProps = {
  open: boolean;
  /** Region id the trigger's aria-controls points at. */
  id: string;
  children: ReactNode;
  /** Extra classes on the animated region, merged with overflow-hidden. */
  className?: string;
  /** Render the region as an li (the garden's panel is a child of the ul). */
  as?: 'div' | 'li';
  /** Key on the animated element, so AnimatePresence treats a changed open
      item under an already-open panel as a swap, not an update. */
  panelKey?: string;
};

export function AccordionPanel({
  open,
  id,
  children,
  className = '',
  as = 'div',
  panelKey,
}: PanelProps) {
  const reduce = useReducedMotion();

  const motionProps = {
    id,
    initial: reduce ? { opacity: 1 } : { height: 0, opacity: 0 },
    animate: reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 },
    exit: reduce ? { opacity: 1 } : { height: 0, opacity: 0 },
    // A spring, not a tween: the panel opens with physical snap and settles
    // without overshoot. Reduced motion stays instant and lands on the
    // finished state, exactly as before.
    transition: reduce ? { duration: 0 } : { type: 'spring' as const, ...SPRING },
    className: `overflow-hidden ${className}`,
  };

  return (
    <AnimatePresence initial={false}>
      {open &&
        (as === 'li' ? (
          <motion.li key={panelKey} {...motionProps}>
            {children}
          </motion.li>
        ) : (
          <motion.div key={panelKey} {...motionProps}>
            {children}
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export default function Accordion({
  trigger,
  children,
  id,
  className,
}: {
  trigger: (props: AccordionTriggerProps) => ReactNode;
  children: ReactNode;
  /** Panel region id; defaults to a generated one. */
  id?: string;
  /** Extra classes on the panel region (e.g. the CV gutter indent). */
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const panelId = id ?? generatedId;

  return (
    <>
      {trigger({
        onClick: () => setOpen((o) => !o),
        open,
        'aria-expanded': open,
        'aria-controls': panelId,
      })}
      <AccordionPanel open={open} id={panelId} className={className}>
        {children}
      </AccordionPanel>
    </>
  );
}

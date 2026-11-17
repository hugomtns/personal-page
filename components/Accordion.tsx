'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SPRING } from '@/lib/motion';

/**
 * The height-reveal disclosure behind the CV and Projects rows. The trigger
 * receives the toggle, open state, and accessibility attributes as a render prop.
 *
 * Projects uses AccordionPanel directly so each section can track which of
 * its projects is open.
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
  /** Render the region as an li when the parent is a list. */
  as?: 'div' | 'li';
  /** Key the animated element to animate a change of panel content. */
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

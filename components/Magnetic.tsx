'use client';

import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/** How far the element may drift toward the cursor, in px. */
const MAX_OFFSET = 5;

/** Fraction of the cursor distance applied as drift. Small on purpose: the
    pull should read as magnetism, not as the button chasing the mouse. */
const PULL = 0.15;

/**
 * The site's one magnetic element. Wraps the booking CTA: on hover the button
 * drifts a few px toward the cursor and springs back when the cursor leaves.
 * Springs rather than a tween, so the return has the same physical feel as
 * the accordion. One element only; magnetic everything would be a theme park.
 *
 * Reduced motion gets a plain static wrapper: no listeners are attached and
 * no transform is ever written, so there is nothing to undo.
 */
export default function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });

  if (reduce) {
    return <div className="inline-block">{children}</div>;
  }

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const cap = (v: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, v));
    x.set(cap(dx * PULL));
    y.set(cap(dy * PULL));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

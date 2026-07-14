'use client';

import { motion, useReducedMotion } from 'motion/react';
import TimelineRole from './TimelineRole';
import { roles } from '@/content/cv';

export default function Timeline() {
  const reduce = useReducedMotion();

  return (
    <div>
      {roles.map((role, i) => {
        // The first role is on screen at load, so it must not start at
        // opacity 0 — that hands the largest paint to Motion and makes LCP
        // wait for hydration. You only animate what someone scrolls to.
        //
        // Everything else must still be driven to the visible state rather
        // than merely left alone: the server renders opacity 0 into the HTML
        // (it cannot know the visitor's motion preference), so a reduced-motion
        // visitor who is handed no animation is handed an invisible CV.
        const reveal = !reduce && i > 0;

        return (
          <motion.div
            key={`${role.company}-${role.start}`}
            initial={reveal ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={
              reveal
                ? { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0 }
            }
          >
            <TimelineRole role={role} />
          </motion.div>
        );
      })}
    </div>
  );
}

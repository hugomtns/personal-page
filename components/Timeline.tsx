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
        const reveal = !reduce && i > 0;

        return (
          <motion.div
            key={`${role.company}-${role.start}`}
            initial={reveal ? { opacity: 0, y: 24 } : false}
            whileInView={reveal ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <TimelineRole role={role} />
          </motion.div>
        );
      })}
    </div>
  );
}

'use client';

import { motion, useReducedMotion } from 'motion/react';
import TimelineRole from './TimelineRole';
import { roles } from '@/content/cv';

export default function Timeline() {
  const reduce = useReducedMotion();

  return (
    <div>
      {roles.map((role, i) => (
        <motion.div
          key={role.company}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <TimelineRole role={role} />
        </motion.div>
      ))}
    </div>
  );
}

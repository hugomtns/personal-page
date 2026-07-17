'use client';

import { motion, useReducedMotion } from 'motion/react';
import CVCompany from './CVCompany';
import { companies } from '@/content/cvTimeline';

export default function CVTimeline() {
  const reduce = useReducedMotion();

  return (
    <div>
      {companies.map((c, i) => {
        // First company is on screen at load: never start it at opacity 0, that
        // hands the LCP to Motion. Everything else must still be *driven* to
        // visible — SSR renders opacity 0 with no knowledge of the visitor's
        // motion preference, so a reduced-motion visitor left un-animated is
        // handed an invisible timeline.
        const reveal = !reduce && i > 0;

        return (
          <motion.div
            key={c.id}
            initial={reveal ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={
              reveal
                ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0 }
            }
          >
            <CVCompany
              company={c}
              first={i === 0}
              last={i === companies.length - 1}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

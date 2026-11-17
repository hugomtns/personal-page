'use client';

import { useId, type ReactNode } from 'react';
import Accordion from './Accordion';

export default function CVDisclosure({
  name,
  dates,
  summary,
  action,
  children,
}: {
  name: string;
  dates: string;
  summary: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const infoId = useId();

  return (
    <Accordion
      trigger={({ open, ...triggerProps }) => (
        <div className="terminal-cv__entry" data-expanded={open}>
          <div className="terminal-cv__title">
            <button
              type="button"
              {...triggerProps}
              aria-describedby={`${infoId}-dates ${infoId}-summary`}
              className="terminal-cv__toggle"
            >
              <span className="terminal-cv__cue" aria-hidden="true">{open ? '[-]' : '[+]'}</span>
              <span className="terminal-cv__name">{name}</span>
            </button>
            {action}
          </div>
          <span id={`${infoId}-dates`} className="terminal-cv__dates">{dates}</span>
          <span id={`${infoId}-summary`} className="terminal-cv__summary">{summary}</span>
        </div>
      )}
    >
      {children}
    </Accordion>
  );
}

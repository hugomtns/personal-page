'use client';

import { useId, type ReactNode, type Ref } from 'react';
import Accordion, { type AccordionTriggerProps } from './Accordion';

type Row = {
  name: string;
  dates?: string;
  summary: string;
  action?: ReactNode;
};

export function TerminalDisclosureLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={`Link to ${label}`}
      target="_blank"
      rel="noopener noreferrer"
      className="terminal-disclosure__link"
    >
      Link
    </a>
  );
}

export function TerminalDisclosureTrigger({
  name,
  dates,
  summary,
  action,
  open,
  buttonRef,
  ...triggerProps
}: Row & AccordionTriggerProps & { buttonRef?: Ref<HTMLButtonElement> }) {
  const infoId = useId();

  return (
    <div className="terminal-disclosure" data-expanded={open}>
      <div className="terminal-disclosure__title">
        <button
          ref={buttonRef}
          type="button"
          {...triggerProps}
          aria-describedby={dates ? `${infoId}-dates ${infoId}-summary` : `${infoId}-summary`}
          className="terminal-disclosure__toggle"
        >
          <span className="terminal-disclosure__cue" aria-hidden="true">{open ? '[-]' : '[+]'}</span>
          <span className="terminal-disclosure__name">{name}</span>
        </button>
        {action}
      </div>
      {dates && <span id={`${infoId}-dates`} className="terminal-disclosure__dates">{dates}</span>}
      <span id={`${infoId}-summary`} className="terminal-disclosure__summary">{summary}</span>
    </div>
  );
}

export default function TerminalDisclosure({ children, ...row }: Row & { children: ReactNode }) {
  return (
    <Accordion
      trigger={(triggerProps) => <TerminalDisclosureTrigger {...row} {...triggerProps} />}
    >
      {children}
    </Accordion>
  );
}

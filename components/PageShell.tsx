import type { ReactNode } from 'react';
import TerminalPrompt, { type TerminalCommand } from './TerminalPrompt';

/**
 * The frame every tab page shares: the centered column and the h1. Exists so
 * the four pages stop repeating the shell. Each page keeps its own metadata
 * and its live-gate; this is layout only.
 */
export default function PageShell({
  title,
  children,
  headingClassName,
  headingAction,
  stickyHeading = false,
  command,
}: {
  title: string;
  children: ReactNode;
  /** Optional heading classes. The default layout includes bottom spacing. */
  headingClassName?: string;
  headingAction?: ReactNode;
  stickyHeading?: boolean;
  command?: TerminalCommand;
}) {
  const frame = command ? 'terminal-frame' : 'mx-auto max-w-5xl px-6 py-20';

  return (
    <div className={frame}>
      {command ? (
        <div className={stickyHeading ? 'terminal-bar terminal-bar--sticky' : 'terminal-bar'}>
          <h1 className={headingClassName} aria-label={title}>
            <TerminalPrompt command={command} />
          </h1>
          {headingAction}
        </div>
      ) : (
        <h1 className={`text-h1 ${headingClassName ?? 'mb-16'}`.trim()}>{title}</h1>
      )}
      {children}
    </div>
  );
}

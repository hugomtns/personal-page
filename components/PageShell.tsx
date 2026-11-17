import type { ReactNode } from 'react';

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
  terminal = false,
}: {
  title: string;
  children: ReactNode;
  /** Optional heading classes. The default layout includes bottom spacing. */
  headingClassName?: string;
  headingAction?: ReactNode;
  stickyHeading?: boolean;
  terminal?: boolean;
}) {
  const frame = terminal ? 'terminal-frame' : 'mx-auto max-w-5xl px-6 py-20';
  const heading = terminal ? headingClassName : `text-h1 ${headingClassName ?? 'mb-16'}`.trim();
  const titleElement = <h1 className={heading}>{title}</h1>;

  return (
    <div className={frame}>
      {terminal ? (
        <div className={stickyHeading ? 'terminal-bar terminal-bar--sticky' : 'terminal-bar'}>
          {titleElement}
          {headingAction}
        </div>
      ) : titleElement}
      {children}
    </div>
  );
}

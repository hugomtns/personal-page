import type { ReactNode } from 'react';

/**
 * The frame every tab page shares: the centered column and the h1. Exists so
 * the four pages stop repeating the shell. Each page keeps its own metadata
 * and its live-gate; this is layout only.
 */
export default function PageShell({
  title,
  children,
  headingClassName = 'mb-16',
}: {
  title: string;
  children: ReactNode;
  /** Spacing on the heading. Contact clears it: its grid carries mt-16. */
  headingClassName?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className={`text-h1 ${headingClassName}`}>{title}</h1>
      {children}
    </div>
  );
}

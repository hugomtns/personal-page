import type { ReactNode } from 'react';

export type MetaItem = { label: string; value: ReactNode };

/**
 * The label-over-text dl inside CV milestones (About / My role on a company,
 * Problem / What I did / Outcome on a product). It owns only the list and the
 * label styling. The accent left border stays with the call site: CVCompany
 * puts it on the wrapper so the company links sit inside it, CVProduct puts
 * it on the list itself.
 *
 * The Education and Certification dls on the CV page are a different shape
 * (border-b rows with a right-aligned date) and deliberately stay there.
 */
export default function MetaList({
  items,
  className = '',
}: {
  items: MetaItem[];
  className?: string;
}) {
  return (
    <dl className={`grid gap-5 ${className}`}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="label mb-1">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

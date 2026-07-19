import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

/**
 * The bordered surface behind the CV company cards, the project tiles, and
 * the project detail panel. Interactive cards (the ones that are click
 * targets) lift the border to the accent on hover; the open card keeps the
 * accent border so it reads as the one the detail belongs to, as does the
 * detail panel itself. Renders a button when the whole card is the target.
 *
 * Only one border-color class is ever emitted: border-border and
 * border-accent have equal specificity, so emitting both would leave the
 * winner to stylesheet order.
 */
type Shared = {
  /** Lift the border to the accent on hover. For cards that are targets. */
  interactive?: boolean;
  /** Keep the accent border without hovering: the open card or its panel. */
  open?: boolean;
  className?: string;
  children: ReactNode;
};

type DivCardProps = Shared & { as?: 'div' } & HTMLAttributes<HTMLDivElement>;
type ButtonCardProps = Shared & { as: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Card(allProps: DivCardProps | ButtonCardProps) {
  const { as = 'div', interactive = false, open = false, className = '', ...rest } = allProps;

  const classes = [
    'rounded-card border bg-surface',
    open ? 'border-accent' : 'border-border',
    interactive ? 'transition-colors hover:border-accent' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'button') {
    return (
      <button
        type="button"
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        className={classes}
      />
    );
  }
  return <div {...(rest as HTMLAttributes<HTMLDivElement>)} className={classes} />;
}

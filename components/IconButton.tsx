import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';

/**
 * The 44px icon-only control. Six call sites (header menu, modal close,
 * project-detail close, theme toggle, both social links) repeated the same
 * `grid size-11 place-items-center` square; this owns the square so each call
 * site only says what is inside it and how it differs (negative margins, hover
 * colors) via className.
 *
 * Renders an anchor when given an href (the social links), a button otherwise.
 * Also ships CloseIcon, the one glyph two of those call sites duplicated byte
 * for byte with an aria-hidden inconsistency now settled on explicit "true".
 */
type Shared = {
  className?: string;
  children: ReactNode;
  'aria-label': string;
};

type ButtonProps = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    ref?: Ref<HTMLButtonElement>;
  };

type AnchorProps = Shared & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function IconButton(props: ButtonProps | AnchorProps) {
  const classes = `grid size-11 place-items-center ${props.className ?? ''}`;

  if (props.href !== undefined) {
    return <a {...props} className={classes} />;
  }
  return <button type="button" {...props} className={classes} />;
}

/** The shared close glyph. Decorative: the button around it carries the
    accessible name, so it is always aria-hidden. */
export function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 3L4 8l6 5" />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 3l6 5-6 5" />
    </svg>
  );
}

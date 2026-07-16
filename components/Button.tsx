import type { ButtonHTMLAttributes } from 'react';

/**
 * The site's one button. Both real actions — booking a call and sending a
 * message — use it, so they read as the two equal offers they are rather than
 * one CTA and one afterthought.
 *
 * Accent background with `text-bg` on top. That pairing is not arbitrary: it is
 * the same two tokens as accent-on-background, which `app/globals.test.ts`
 * already pins at WCAG AA in both themes — so inverting them is AA by
 * construction, in light and dark, with nothing new to keep in sync.
 *
 * min-h-11 is the 44px touch target; the type is small enough that padding
 * alone would not get there.
 */
export default function Button({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-small text-bg transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

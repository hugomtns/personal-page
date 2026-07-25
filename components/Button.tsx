import type { ButtonHTMLAttributes } from 'react';

/**
 * The site's one button. Both real actions — booking a call and sending a
 * message — use it, so they read as the two equal offers they are rather than
 * one CTA and one afterthought.
 *
 * The styling lives in globals.css as `.btn-primary`, NOT as Tailwind
 * utilities, so that primary-action <a> links can share it: the unlayered
 * `a { color: inherit }` rule beats layered color utilities, so a `text-bg`
 * utility would silently lose on an anchor. The accent-background /
 * page-background-ink pairing is pinned at AA in both themes by
 * app/globals.test.ts.
 */
export default function Button({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`btn-primary ${className}`} />;
}

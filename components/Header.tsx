import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { site } from '@/content/site';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="-my-2 inline-flex items-center py-2 font-display text-lg transition-colors hover:text-accent"
        >
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          {/* py/-my pairs grow the touch target to ~44px without moving the
              layout a pixel — the text is only 19px tall, which is a fiddly
              thing to hit with a thumb. */}
          <Link
            href="/cv"
            className="label -my-3.5 inline-flex items-center py-3.5 transition-colors hover:text-accent"
          >
            CV
          </Link>
          <Link
            href="/#book"
            className="label -my-3.5 inline-flex items-center py-3.5 transition-colors hover:text-accent"
          >
            Book a call
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

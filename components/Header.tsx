import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { site } from '@/content/site';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg transition-colors hover:text-accent">
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          <Link href="/cv" className="label transition-colors hover:text-accent">
            CV
          </Link>
          <Link href="/#book" className="label transition-colors hover:text-accent">
            Book a call
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

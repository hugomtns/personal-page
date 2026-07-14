'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import SocialLinks from './SocialLinks';
import { site, liveNav } from '@/content/site';

export default function Header() {
  const pathname = usePathname();
  const tabs = liveNav();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="-my-2 inline-flex items-center py-2 font-display text-lg transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6">
            {tabs.map((tab) => {
              const active = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={`label -my-3.5 inline-flex items-center py-3.5 transition-colors hover:text-accent ${
                    active ? 'text-fg' : ''
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <span aria-hidden="true" className="h-4 w-px bg-border" />

          <SocialLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

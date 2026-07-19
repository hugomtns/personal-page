'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ThemeToggle from './ThemeToggle';
import SocialLinks from './SocialLinks';
import IconButton from './IconButton';
import { site, liveNav } from '@/content/site';
import { EASE_OUT, DURATION } from '@/lib/motion';

const MENU_ID = 'header-menu';

export default function Header() {
  const pathname = usePathname();
  const tabs = liveNav();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // A client navigation does not unmount the header, so without this the panel
  // would stay open on top of the page the visitor just asked for. Adjusted
  // during render rather than in an effect — React's documented way to reset
  // state when a prop changes, and it means the panel is already gone on the
  // first render of the new route instead of flickering away after it.
  const [renderedFor, setRenderedFor] = useState(pathname);
  if (renderedFor !== pathname) {
    setRenderedFor(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      // Send focus back where it came from. Otherwise it is orphaned on a node
      // that no longer exists and a keyboard user lands back at the document top.
      buttonRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const tabClass = (href: string) =>
    `label weight-hover hover:text-accent ${pathname === href ? 'text-fg' : ''}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="-my-2 inline-flex items-center py-2 font-display text-lg whitespace-nowrap weight-hover hover:text-accent"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          {/* The tab row is the first thing that stops fitting: at 390px the bar
              is already ~67px over budget, and CV and Projects are still to come.
              Below `sm` the tabs move into the panel below instead. */}
          <nav aria-label="Main" className="hidden items-center gap-6 sm:flex">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={pathname === tab.href ? 'page' : undefined}
                className={`${tabClass(tab.href)} -my-3.5 inline-flex items-center py-3.5`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          <IconButton
            ref={buttonRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label="Menu"
            className="label -m-1 sm:hidden"
          >
            <span aria-hidden="true" className="grid gap-[5px]">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </IconButton>

          <span aria-hidden="true" className="h-4 w-px bg-border" />

          <SocialLinks />
          <ThemeToggle />
        </div>
      </div>

      {/* Safe to animate on entry, unlike the hero: the panel does not exist
          until it is opened, so the server never renders a pre-animation
          opacity: 0 that could get stranded at 0 forever.

          It closes instantly rather than animating out. An exit animation would
          keep the panel mounted while it played, which means focus could sit
          inside a nav that is on its way out of the DOM — and a menu that shuts
          the moment you tap feels quicker anyway. */}
      {/* Dims the page under the open panel and gives it somewhere to be tapped
          shut. Without it the panel's bottom edge slices the page heading clean
          in half, which just reads as a rendering fault. Anchored to the header
          rather than the viewport so it starts below the bar and can never cover
          the wordmark or the icons. */}
      {open && (
        <div
          data-menu-scrim
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="absolute inset-x-0 top-full h-screen bg-bg/70 sm:hidden"
        />
      )}

      {open && (
        <motion.nav
          id={MENU_ID}
          aria-label="Menu"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : DURATION.fast, ease: EASE_OUT }}
          className="absolute inset-x-0 top-full border-b border-border bg-bg sm:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col px-6 py-2">
            {tabs.map((tab) => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={pathname === tab.href ? 'page' : undefined}
                  // Tapping the tab you are already on changes no route, so the
                  // pathname effect above would never fire to close this.
                  onClick={() => setOpen(false)}
                  className={`${tabClass(tab.href)} block py-3.5`}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
}

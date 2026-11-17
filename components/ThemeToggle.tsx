'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconButton from './IconButton';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes mount guard: the server cannot know the visitor's theme, so we
  // render a neutral placeholder until we're on the client. Detecting mount is
  // the legitimate exception to this rule — without it, the toggle renders the
  // wrong icon server-side and hydration mismatches.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // The server cannot know the visitor's theme. Render a same-sized
  // placeholder until mount, or the header reflows on hydration.
  if (!mounted) {
    return <div className="terminal-theme-toggle size-11" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    // Reserve the same 44px square as the server placeholder.
    <IconButton
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="terminal-theme-toggle group"
    >
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center border border-border transition-colors duration-180 group-hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          {isDark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
            </>
          ) : <path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z" />}
        </svg>
      </span>
    </IconButton>
  );
}

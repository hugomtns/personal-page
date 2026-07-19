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
    return <div className="size-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    // The button is 44px so a thumb can hit it; the -m-1 pulls that back out of
    // the layout so the visible circle stays the 36px the header was built for.
    <IconButton
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="group -m-1"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-full border border-border text-sm transition-colors duration-180 group-hover:text-accent"
      >
        {isDark ? '☀' : '☾'}
      </span>
    </IconButton>
  );
}

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:text-accent"
    >
      <span aria-hidden="true" className="text-sm">
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  );
}

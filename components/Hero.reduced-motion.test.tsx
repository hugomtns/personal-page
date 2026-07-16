import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// motion-dom's prefers-reduced-motion state is a module-level singleton,
// initialised once (lazily, on first useReducedMotion() call) per JS realm
// — see node_modules/motion-dom/dist/es/render/utils/reduced-motion/*.
// It must be mocked *before* Hero's first render in a file of its own,
// otherwise it would pick up whatever an earlier test in the same file
// already initialised.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

import Hero from './Hero';
import { intro } from '@/content/about';

// This is the single most dangerous failure mode for the hero: a
// reduced-motion visitor must land on the FINISHED state immediately —
// fully visible, fully readable — never an element stuck at opacity: 0.
//
// The subtle part, and the one that shipped broken: it is NOT enough for
// Motion to decline to animate. The server cannot read a motion preference,
// so it renders the pre-animation state (opacity: 0) straight into the HTML.
// If the client then hands Motion no props, that opacity: 0 is never undone
// and the hero is permanently blank. So the assertion here is deliberately
// that Motion *does* write the visible state — not that it writes nothing.
describe('Hero with prefers-reduced-motion: reduce', () => {
  it('asserts the finished, visible state instead of leaving the server-rendered opacity: 0 in place', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1, name: /hugo martins/i });
    const role = screen.getByText(/product builder/i);
    const introText = screen.getByText(intro);

    for (const el of [heading, role, introText]) {
      // toBeVisible() fails if computed opacity is 0, display is none,
      // visibility is hidden, etc. — this is the actual "is it readable" check.
      expect(el).toBeVisible();
      // The load-bearing one: an explicit opacity: 1 is what overwrites what
      // the server put there. An empty string here means Motion left the DOM
      // untouched — which is exactly how the hero went invisible in a real
      // browser while this test was passing.
      expect(el.style.opacity).toBe('1');
    }
  });
});

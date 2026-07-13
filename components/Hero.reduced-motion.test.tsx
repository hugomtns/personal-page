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

// This is the single most dangerous failure mode for the hero: a
// reduced-motion visitor must land on the FINISHED state immediately —
// fully visible, fully readable — never an element stuck at opacity: 0.
describe('Hero with prefers-reduced-motion: reduce', () => {
  it('renders every animated element fully visible with no opacity/transform applied', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1, name: /hugo martins/i });
    const role = screen.getByText(/senior product manager/i);
    const tagline = screen.getByText(/prototypes/i);
    const nav = screen.getByRole('navigation', { name: /primary actions/i });
    const cvLink = screen.getByRole('link', { name: /read the cv/i });
    const bookLink = screen.getByRole('link', { name: /book a call/i });

    for (const el of [heading, role, tagline, nav, cvLink, bookLink]) {
      // toBeVisible() fails if computed opacity is 0, display is none,
      // visibility is hidden, etc. — this is the actual "is it readable" check.
      expect(el).toBeVisible();
      // Belt-and-braces: confirm motion did not write initial/animate
      // inline styles at all (stagger === {} when reduce is true), rather
      // than merely landing on opacity: 1 after an animation tick.
      expect(el.style.opacity).toBe('');
      expect(el.style.transform).toBe('');
    }
  });
});

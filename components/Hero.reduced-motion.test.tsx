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

// A previous entrance animation left reduced-motion visitors at opacity: 0.
// The terminal hero is static and server-rendered. Keep the explicit visible
// state guard so a future animation cannot quietly reintroduce that failure.
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
    }
    for (const el of [role, introText]) {
      // Keep the explicit finished state as well as the computed visibility.
      expect(el.style.opacity).toBe('1');
    }
  });

  it('keeps the complete name and portrait visible without a name reveal', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1, name: 'Hugo Martins' });
    expect(heading).toHaveTextContent('Hugo Martins');
    expect(heading).toBeVisible();
    expect(screen.getByRole('img', { name: /ascii portrait of hugo martins/i })).toBeVisible();
  });
});

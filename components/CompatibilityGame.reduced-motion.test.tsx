import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// motion-dom's prefers-reduced-motion state is a module-level singleton,
// initialised once per JS realm, so the override must land before the
// component's first render — same reasoning as
// components/Hero.reduced-motion.test.tsx, which this file mirrors.
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

import CompatibilityGame from './CompatibilityGame';

describe('CompatibilityGame with prefers-reduced-motion: reduce', () => {
  it('shows the result score at full opacity immediately', () => {
    window.history.pushState({}, '', '/?score=13');
    try {
      render(<CompatibilityGame />);
      expect(screen.getByText('13 / 20')).toHaveStyle({ opacity: '1' });
    } finally {
      window.history.pushState({}, '', '/');
    }
  });
});

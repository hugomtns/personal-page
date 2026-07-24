import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('CompatibilityGame with prefers-reduced-motion: reduce', () => {
  it('asserts the finished, visible state on the dealt cards', async () => {
    render(<CompatibilityGame rng={mulberry32(1)} />);
    await userEvent.click(screen.getByRole('button', { name: /start the game/i }));

    // SSR renders the pre-animation state (opacity: 0). Reduced motion must
    // overwrite it with opacity: 1, not "skip animating" and leave the cards
    // invisible — the same trap AGENTS.md documents for the hero.
    const cards = document.querySelectorAll('[data-answer-card]');
    expect(cards).toHaveLength(2);
    for (const card of cards) {
      expect((card as HTMLElement).style.opacity).toBe('1');
    }
  });

  it('answers without a fly-out animation', async () => {
    render(<CompatibilityGame rng={mulberry32(2)} />);
    await userEvent.click(screen.getByRole('button', { name: /start the game/i }));
    const [firstButton] = screen.getAllByRole('button', { name: /^choose: /i });
    await userEvent.click(firstButton);

    expect(document.querySelector('[data-flyout]')).toBeNull();
    expect(screen.getByText(/Question 2 \/ 20/)).toBeInTheDocument();
  });
});

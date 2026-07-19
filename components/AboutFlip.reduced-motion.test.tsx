// Reduced motion gets its own file: useReducedMotion() is a module-level
// singleton, so a second matchMedia answer in the same file would leak.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>();
  return { ...actual, useReducedMotion: () => true };
});

import AboutFlip from './AboutFlip';

describe('AboutFlip, reduced motion', () => {
  it('renders the text fully visible, never mid-animation', () => {
    render(
      <AboutFlip
        portraitSrc="/hugo-martins.jpg"
        personalSrc={null}
        professional={['The professional paragraph.']}
        personal={['The personal paragraph.']}
      />
    );

    const paragraph = screen.getByText('The professional paragraph.');
    // SSR has no matchMedia, so "not animating" must never mean invisible.
    expect(paragraph.closest('div[class*="grid"]')?.parentElement?.style.opacity).not.toBe('0');
  });

  it('swaps faces instantly instead of rotating', async () => {
    const user = userEvent.setup();
    render(
      <AboutFlip
        portraitSrc="/hugo-martins.jpg"
        personalSrc="/hugo-martins-personal.jpg"
        professional={['The professional paragraph.']}
        personal={['The personal paragraph.']}
      />
    );

    await user.click(screen.getByRole('button', { name: /personal side/i }));

    // The back face is rendered directly; no 3D rig, no transition.
    expect(screen.getByAltText('Hugo Martins, off the clock')).toBeInTheDocument();
    expect(document.querySelector('[class*="preserve-3d"]')).toBeNull();
  });
});

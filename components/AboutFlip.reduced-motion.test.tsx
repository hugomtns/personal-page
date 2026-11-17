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
        professional={['The professional paragraph.']}
        personal={['The personal paragraph.']}
      />
    );

    const paragraph = screen.getByText('The professional paragraph.');
    // SSR has no matchMedia, so "not animating" must never mean invisible.
    expect(paragraph).toBeVisible();
    expect(paragraph.parentElement?.style.opacity).toBe('1');
  });

  it('shows the other biography at full opacity when toggled', async () => {
    const user = userEvent.setup();
    render(
      <AboutFlip
        professional={['The professional paragraph.']}
        personal={['The personal paragraph.']}
      />
    );

    await user.click(screen.getByRole('button', { name: /personal side/i }));

    expect(await screen.findByText('The personal paragraph.')).toBeVisible();
    expect(screen.getByText('The personal paragraph.').parentElement?.style.opacity).toBe('1');
  });
});

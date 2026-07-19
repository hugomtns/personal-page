import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// motion-dom's prefers-reduced-motion state is a module-level singleton,
// initialised once (lazily, on first useReducedMotion() call) per JS realm.
// It must report reduce *before* Accordion first renders, which is why this
// lives in a file of its own. See Hero.reduced-motion.test.tsx.
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

import Accordion from './Accordion';

// Same contract as the hero: reduced motion must land on the FINISHED state,
// with an explicit opacity 1 asserted into the DOM. An empty string here means
// Motion left the element at whatever it rendered with, which is how animated
// components go invisibly blank while their tests pass.
describe('Accordion with prefers-reduced-motion: reduce', () => {
  it('asserts the finished, visible state instead of animating height', async () => {
    const user = userEvent.setup();
    render(
      <Accordion trigger={(props) => <button type="button" {...props}>Toggle</button>}>
        <p>Panel body</p>
      </Accordion>
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));

    const panel = screen.getByText('Panel body').parentElement!;
    expect(panel).toBeVisible();
    expect(panel.style.opacity).toBe('1');
  });
});

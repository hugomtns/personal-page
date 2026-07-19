import { fireEvent, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// motion-dom's prefers-reduced-motion state is a module-level singleton,
// initialised once (lazily, on first useReducedMotion() call) per JS realm.
// It must report reduce *before* Magnetic first renders, which is why this
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

import Magnetic from './Magnetic';

// Under reduced motion the wrapper must be inert: no listeners, no transform,
// nothing to undo. A plain static div is the whole contract here.
describe('Magnetic with prefers-reduced-motion: reduce', () => {
  it('attaches no magnetic behavior: the cursor moves, the element does not', () => {
    const { container } = render(
      <Magnetic>
        <button type="button">CTA</button>
      </Magnetic>
    );
    const wrapper = container.firstChild as HTMLElement;

    fireEvent.mouseMove(wrapper, { clientX: 100, clientY: 100 });

    expect(wrapper.style.transform).toBe('');
    expect(wrapper.querySelector('button')).toHaveTextContent('CTA');
  });
});

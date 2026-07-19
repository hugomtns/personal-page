import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Magnetic from './Magnetic';

// jsdom reports a zero rect for everything, so the element's center is (0,0)
// and any cursor position past ~34px away lands on the 5px cap.
describe('Magnetic', () => {
  it('renders its children', () => {
    render(
      <Magnetic>
        <button type="button">Book a call</button>
      </Magnetic>
    );
    expect(document.querySelector('button')).toHaveTextContent('Book a call');
  });

  it('drifts toward the cursor, capped at a few px', async () => {
    const { container } = render(
      <Magnetic>
        <button type="button">CTA</button>
      </Magnetic>
    );
    const wrapper = container.firstChild as HTMLElement;

    fireEvent.mouseMove(wrapper, { clientX: 100, clientY: 100 });

    await waitFor(() => expect(wrapper.style.transform).toContain('px'));
    // The pull is capped, so the drift can never run away with the cursor.
    const offsets = [...wrapper.style.transform.matchAll(/(-?[\d.]+)px/g)].map((m) =>
      Math.abs(Number(m[1]))
    );
    for (const o of offsets) expect(o).toBeLessThanOrEqual(5.5); // cap plus a little spring overshoot
  });

  it('springs back to rest when the cursor leaves', async () => {
    const { container } = render(
      <Magnetic>
        <button type="button">CTA</button>
      </Magnetic>
    );
    const wrapper = container.firstChild as HTMLElement;

    fireEvent.mouseMove(wrapper, { clientX: 100, clientY: 100 });
    await waitFor(() => expect(wrapper.style.transform).toContain('px'));

    fireEvent.mouseLeave(wrapper);
    await waitFor(() => expect(wrapper.style.transform).not.toContain('px'));
  });
});

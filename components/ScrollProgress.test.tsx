import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScrollProgress from './ScrollProgress';

describe('ScrollProgress', () => {
  it('renders a fixed 1px accent bar pinned to the top, below the modal layer', () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.firstChild as HTMLElement;

    expect(bar).toHaveClass('fixed', 'inset-x-0', 'top-0', 'z-40', 'h-px', 'origin-left');
    expect(bar).toHaveAttribute('aria-hidden', 'true');
    // Driven by scaleX from the left edge; at scroll position 0 it is collapsed.
    expect(bar.style.transform).toContain('scaleX');
  });
});

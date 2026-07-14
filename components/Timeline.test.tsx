import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Timeline from './Timeline';

describe('Timeline', () => {
  it('renders every role', () => {
    render(<Timeline />);
    expect(screen.getByText('PVcase')).toBeInTheDocument();
    expect(screen.getByText('Staffbase')).toBeInTheDocument();
    expect(screen.getByText('Medwing')).toBeInTheDocument();
    expect(screen.getByText('Helpling')).toBeInTheDocument();
    expect(screen.getByText('ResearchGate')).toBeInTheDocument();
  });

  it('paints the first role without waiting for JavaScript', () => {
    const { container } = render(<Timeline />);
    const wrappers = container.querySelectorAll(':scope > div > div');

    // The first role is the largest thing on screen at load. Starting it at
    // opacity 0 would hand the largest paint to Motion and stall LCP behind
    // hydration — a real cost measured on /cv, not a theoretical one.
    expect(wrappers[0]).not.toHaveStyle({ opacity: '0' });

    // Roles further down still earn their entrance.
    expect(wrappers[1]).toHaveStyle({ opacity: '0' });
  });
});

import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import BerlinTime from './BerlinTime';

// Fixed UTC instants make the Berlin conversion deterministic: January is
// standard time (UTC+1), July is daylight saving (UTC+2).
describe('BerlinTime', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders after mount, in Berlin time, not the viewer zone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-15T12:00:00Z'));
    render(<BerlinTime />);
    expect(screen.getByText('Berlin, 13:00 CET')).toBeInTheDocument();
  });

  it('follows daylight saving via the formatter, not a hardcoded zone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T12:00:00Z'));
    render(<BerlinTime />);
    expect(screen.getByText('Berlin, 14:00 CEST')).toBeInTheDocument();
  });

  it('updates on the interval', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-15T12:00:00Z'));
    render(<BerlinTime />);

    vi.setSystemTime(new Date('2026-01-15T12:00:30Z'));
    act(() => {
      vi.advanceTimersByTime(30_000);
    });

    // The interval fired once, half a minute on: 12:01 UTC, 13:01 in Berlin.
    expect(screen.getByText('Berlin, 13:01 CET')).toBeInTheDocument();
  });
});

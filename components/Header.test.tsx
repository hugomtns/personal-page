import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn(), resolvedTheme: 'light' }),
}));

describe('Header', () => {
  it('renders a banner landmark', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('links home via the wordmark', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /hugo martins/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});

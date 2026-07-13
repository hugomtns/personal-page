import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

const setTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme, resolvedTheme: 'light' }),
}));

describe('ThemeToggle', () => {
  it('exposes an accessible name describing the action', async () => {
    render(<ThemeToggle />);
    expect(
      await screen.findByRole('button', { name: /switch to dark theme/i })
    ).toBeInTheDocument();
  });

  it('switches to dark when clicked from light', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(await screen.findByRole('button'));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});

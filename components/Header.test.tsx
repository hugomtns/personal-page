import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import { nav } from '@/content/site';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn(), resolvedTheme: 'dark' }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
}));

describe('Header', () => {
  it('renders a banner landmark', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('links home via the wordmark', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /hugo martins/i })).toHaveAttribute('href', '/');
  });

  it('shows every tab that is live', () => {
    render(<Header />);
    const mainNav = screen.getByRole('navigation', { name: /main/i });

    for (const tab of nav.filter((t) => t.live)) {
      expect(within(mainNav).getByRole('link', { name: tab.label })).toHaveAttribute(
        'href',
        tab.href
      );
    }
  });

  it('hides tabs that are not finished yet', () => {
    render(<Header />);
    const mainNav = screen.getByRole('navigation', { name: /main/i });

    // The whole point of the live flag. If this fires, a visitor can walk from
    // the nav straight into a half-built page.
    for (const tab of nav.filter((t) => !t.live)) {
      expect(within(mainNav).queryByRole('link', { name: tab.label })).not.toBeInTheDocument();
    }
  });

  it('marks the current tab for assistive tech', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  });

  it('names the social icons, which are otherwise silent', () => {
    render(<Header />);
    const social = screen.getByRole('navigation', { name: /social/i });

    // The SVGs are aria-hidden, so the accessible name has to come from the
    // link itself — without it a screen reader announces an empty link.
    expect(within(social).getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(within(social).getByRole('link', { name: /github/i })).toBeInTheDocument();
  });
});

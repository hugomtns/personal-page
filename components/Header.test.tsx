import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';
import { nav } from '@/content/site';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn(), resolvedTheme: 'dark' }),
}));

// Mutable so a test can simulate a route change, which the menu must react to.
const route = vi.hoisted(() => ({ pathname: '/about' }));
vi.mock('next/navigation', () => ({
  usePathname: () => route.pathname,
}));

beforeEach(() => {
  route.pathname = '/about';
});

const liveTabs = nav.filter((t) => t.live);
const hiddenTabs = nav.filter((t) => !t.live);

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
    const mainNav = screen.getByRole('navigation', { name: /^main$/i });

    for (const tab of liveTabs) {
      expect(within(mainNav).getByRole('link', { name: tab.label })).toHaveAttribute(
        'href',
        tab.href
      );
    }
  });

  it('hides tabs that are not finished yet', () => {
    render(<Header />);
    const mainNav = screen.getByRole('navigation', { name: /^main$/i });

    // The whole point of the live flag. If this fires, a visitor can walk from
    // the nav straight into a half-built page.
    for (const tab of hiddenTabs) {
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

// The header bar cannot hold the wordmark, the tabs, both social icons and the
// theme toggle at 390px — measured, it overflows, and the wordmark gets crushed
// to 48px and wraps onto two lines. So below `sm` the tabs live behind a
// disclosure button instead. It is not decoration: with CV and Projects still to
// come, the tab row alone will be wider than the whole phone.
describe('Header menu (small screens)', () => {
  it('starts closed, with the panel absent from the DOM entirely', () => {
    render(<Header />);

    const button = screen.getByRole('button', { name: /menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: /menu/i })).not.toBeInTheDocument();
  });

  it('points the button at the panel it controls', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole('button', { name: /menu/i });
    await user.click(button);

    // aria-controls is only meaningful if it actually resolves to the panel.
    const panel = screen.getByRole('navigation', { name: /menu/i });
    expect(button).toHaveAttribute('aria-controls', panel.id);
    expect(panel.id).toBeTruthy();
  });

  it('opens to reveal every live tab, and no hidden one', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole('button', { name: /menu/i }));

    const button = screen.getByRole('button', { name: /menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'true');

    const panel = screen.getByRole('navigation', { name: /menu/i });
    for (const tab of liveTabs) {
      expect(within(panel).getByRole('link', { name: tab.label })).toHaveAttribute(
        'href',
        tab.href
      );
    }
    for (const tab of hiddenTabs) {
      expect(within(panel).queryByRole('link', { name: tab.label })).not.toBeInTheDocument();
    }
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('navigation', { name: /menu/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('navigation', { name: /menu/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('returns focus to the button when Escape closes it', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole('button', { name: /menu/i });
    await user.click(button);
    await user.keyboard('{Escape}');

    // Otherwise focus is orphaned on a node that no longer exists and a keyboard
    // user is dumped back at the top of the document.
    expect(button).toHaveFocus();
  });

  it('closes when the scrim behind it is tapped', async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);

    await user.click(screen.getByRole('button', { name: /menu/i }));

    // The scrim is presentational (aria-hidden), so there is no role to query
    // it by — Escape is the accessible route out, this is the pointer one.
    const scrim = container.querySelector('[data-menu-scrim]');
    expect(scrim).toBeInTheDocument();

    await user.click(scrim as Element);

    expect(screen.queryByRole('navigation', { name: /menu/i })).not.toBeInTheDocument();
  });

  it('closes itself when the route changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Header />);

    await user.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('navigation', { name: /menu/i })).toBeInTheDocument();

    // Next.js client navigation does not unmount the header, so nothing else
    // would ever close this panel — it would sit open on top of the new page.
    route.pathname = '/contact';
    rerender(<Header />);

    expect(screen.queryByRole('navigation', { name: /menu/i })).not.toBeInTheDocument();
  });
});

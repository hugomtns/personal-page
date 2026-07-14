import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import BookingEmbed from './BookingEmbed';
import { site } from '@/content/site';

describe('BookingEmbed', () => {
  it('does not contact Google until the visitor asks it to', () => {
    const { container } = render(<BookingEmbed />);
    // The iframe is what sets Google's NID cookie. Mounting it on page load
    // would set a third-party cookie nobody consented to — the whole reason
    // this is click-to-load, and the reason the site needs no consent banner.
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('says why it is not already loaded', () => {
    render(<BookingEmbed />);
    expect(screen.getByText(/google/i)).toBeInTheDocument();
    expect(screen.getByText(/cookie/i)).toBeInTheDocument();
  });

  it('offers a direct link, so declining the embed still lets you book', () => {
    render(<BookingEmbed />);
    const link = screen.getByRole('link', { name: /new tab/i });
    expect(link).toHaveAttribute('href', site.bookingUrl);
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('mounts the calendar once the visitor opts in', async () => {
    const user = userEvent.setup();
    const { container } = render(<BookingEmbed />);

    await user.click(screen.getByRole('button', { name: /load/i }));

    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe).toHaveAttribute('src', site.bookingUrl);
    expect(iframe).toHaveAttribute('title');
  });

  it('drops the consent prompt once the calendar is up', async () => {
    const user = userEvent.setup();
    render(<BookingEmbed />);

    await user.click(screen.getByRole('button', { name: /load/i }));

    expect(screen.queryByRole('button', { name: /load/i })).not.toBeInTheDocument();
  });
});

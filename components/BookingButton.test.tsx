import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import BookingButton from './BookingButton';
import { site } from '@/content/site';

describe('BookingButton', () => {
  it('does not contact Google until the visitor asks it to', () => {
    const { container } = render(<BookingButton />);
    // The iframe is what sets Google's NID cookie. Mounting it on page load
    // would set a third-party cookie nobody consented to — the whole reason
    // this is click-to-load, and the reason the site needs no consent banner.
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('says why it is not already loaded, before the click that loads it', () => {
    render(<BookingButton />);
    // Consent has to be informed to be consent: the notice is only doing its
    // job if it is readable while the dialog is still shut.
    expect(screen.getByText(/google cookie/i)).toBeInTheDocument();
  });

  it('offers a direct link, so declining the dialog still lets you book', () => {
    render(<BookingButton />);
    const link = screen.getByRole('link', { name: /new tab/i });
    expect(link).toHaveAttribute('href', site.bookingUrl);
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('mounts the calendar once the visitor opts in', async () => {
    const user = userEvent.setup();
    const { container } = render(<BookingButton />);

    await user.click(screen.getByRole('button', { name: /book a call/i }));

    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe).toHaveAttribute('src', site.bookingUrl);
    expect(iframe).toHaveAttribute('title');
  });

  it('unmounts the calendar again when the dialog is closed', async () => {
    const user = userEvent.setup();
    const { container } = render(<BookingButton />);

    await user.click(screen.getByRole('button', { name: /book a call/i }));
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(container.querySelector('iframe')).toBeNull();
  });
});

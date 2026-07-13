import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookingEmbed from './BookingEmbed';
import { site } from '@/content/site';

describe('BookingEmbed', () => {
  it('embeds the booking URL from site config, not a hardcoded one', () => {
    render(<BookingEmbed />);
    expect(screen.getByTitle(/book a call/i)).toHaveAttribute(
      'src',
      site.bookingUrl
    );
  });

  it('offers a direct link as a fallback if the iframe is blocked', () => {
    render(<BookingEmbed />);
    expect(
      screen.getByRole('link', { name: /open the booking page/i })
    ).toHaveAttribute('href', site.bookingUrl);
  });
});

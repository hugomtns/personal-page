import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialLinks from './SocialLinks';

describe('SocialLinks', () => {
  it('links to LinkedIn and to the GitHub profile', () => {
    render(<SocialLinks />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/hugommartins'
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/hugomtns'
    );
  });

  it('renders exactly two links — no per-project repo links', () => {
    render(<SocialLinks />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('never exposes an email address or phone number', () => {
    const { container } = render(<SocialLinks />);
    expect(container.textContent).not.toMatch(/@|\+\d/);
  });
});

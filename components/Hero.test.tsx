import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';
import { intro } from '@/content/about';

describe('Hero', () => {
  it('renders the name as the h1', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: /hugo martins/i })
    ).toBeInTheDocument();
  });

  it('states what he is, as fact', () => {
    render(<Hero />);
    expect(screen.getByText(/product builder/i)).toBeInTheDocument();
  });

  it('carries the one intro paragraph, from content', () => {
    render(<Hero />);
    expect(screen.getByText(intro)).toBeInTheDocument();
  });

  it('sells nothing — the one link is the compatibility quiz, approved by Hugo', () => {
    const { container } = render(<Hero />);
    // The splash had a strict no-links policy until 2026-07-24, when Hugo
    // approved a single quiz link under the intro. It stays the only one.
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'https://shouldiworkwith.hugomartins.pm');
    expect(screen.queryByText(/not just the specs/i)).not.toBeInTheDocument();
  });

  it('links to the compatibility quiz on its subdomain', () => {
    render(<Hero />);
    expect(
      screen.getByRole('link', { name: /should you work with me/i }),
    ).toHaveAttribute('href', 'https://shouldiworkwith.hugomartins.pm');
  });
});

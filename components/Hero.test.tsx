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

  it('sells nothing', () => {
    const { container } = render(<Hero />);
    // The splash is a name, a fact, and a paragraph. No slogan, no calls to
    // action, no links — the nav is the only way out, on purpose.
    expect(container.querySelectorAll('a')).toHaveLength(0);
    expect(screen.queryByText(/not just the specs/i)).not.toBeInTheDocument();
  });
});

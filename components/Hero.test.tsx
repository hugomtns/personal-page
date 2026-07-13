import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the name as the h1', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: /hugo martins/i })
    ).toBeInTheDocument();
  });

  it('offers the CV and booking exits', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /read the cv/i })).toHaveAttribute(
      'href',
      '/cv'
    );
    expect(screen.getByRole('link', { name: /book a call/i })).toHaveAttribute(
      'href',
      '#book'
    );
  });

  it('does not link to the gallery until it exists', () => {
    render(<Hero />);
    expect(screen.queryByRole('link', { name: /see the work/i })).not.toBeInTheDocument();
  });

  it('states the positioning', () => {
    render(<Hero />);
    expect(screen.getByText(/prototypes/i)).toBeInTheDocument();
  });
});

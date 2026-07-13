import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './About';

describe('About', () => {
  it('renders a section heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('never exposes an email address or phone number', () => {
    const { container } = render(<About />);
    expect(container.textContent).not.toMatch(/@|\+49/);
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders Hugo Martins as the page heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /hugo martins/i, level: 1 })
    ).toBeInTheDocument();
  });
});

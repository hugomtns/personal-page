import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CVPage from './page';

describe('CV page', () => {
  it('offers the PDF download', () => {
    render(<CVPage />);
    const link = screen.getByRole('link', { name: /download pdf/i });
    expect(link).toHaveAttribute('href', '/hugo-martins-cv.pdf');
    expect(link).toHaveAttribute('download');
  });

  it('renders education and certifications', () => {
    render(<CVPage />);
    expect(screen.getByText(/bioinformatics/i)).toBeInTheDocument();
    expect(screen.getByText(/agentic ai nanodegree/i)).toBeInTheDocument();
  });
});

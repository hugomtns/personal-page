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

  it('keeps every dl group div a valid dt/dd-only child of dl', () => {
    const { container } = render(<CVPage />);
    const dls = container.querySelectorAll('dl');
    expect(dls.length).toBeGreaterThan(0);

    dls.forEach((dl) => {
      const groupDivs = dl.querySelectorAll(':scope > div');
      expect(groupDivs.length).toBeGreaterThan(0);

      groupDivs.forEach((group) => {
        Array.from(group.children).forEach((child) => {
          expect(['DT', 'DD']).toContain(child.tagName);
        });
      });
    });
  });
});

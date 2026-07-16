import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// The page 404s unless its tab is live, so force it live here — this file is
// about what the CV renders. The gate itself is covered in
// app/unlaunched-routes.test.tsx.
vi.mock('@/content/site', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/site')>();
  return { ...actual, isLive: () => true };
});

import CVPage from './page';

describe('CV page', () => {
  it('renders education and certifications', () => {
    render(<CVPage />);
    expect(screen.getByText(/bioinformatics/i)).toBeInTheDocument();
    expect(screen.getByText(/agentic ai nanodegree/i)).toBeInTheDocument();
  });

  // The CV PDF is deliberately not shipped: not in the repo, not in public/,
  // no route. It is sent by Hugo, not collected by whoever finds the page. If
  // a download link ever reappears here, that decision has been undone.
  it('offers no way to download the CV', () => {
    const { container } = render(<CVPage />);

    expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument();
    expect(container.querySelector('[download]')).toBeNull();
    expect(container.querySelector('a[href$=".pdf"]')).toBeNull();
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

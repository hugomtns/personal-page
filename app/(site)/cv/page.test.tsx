import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  it('starts with the newest company and reveals its cases newest first', async () => {
    const user = userEvent.setup();
    render(<CVPage />);

    const companies = [/Orcrist Technologies/, /PVcase/, /Staffbase/, /Medwing/, /Helpling/, /ResearchGate/]
      .map(name => screen.getByRole('button', { name }));
    expect(screen.getAllByRole('button')).toEqual(companies);
    const pvcase = screen.getByRole('button', { name: 'PVcase' });
    expect(pvcase).toHaveAttribute('aria-expanded', 'false');

    await user.click(pvcase);
    const hub = await screen.findByRole('button', { name: 'Hub' });
    const groundMount = screen.getByRole('button', { name: /Ground Mount/ });
    expect(screen.getAllByRole('button')).toEqual([...companies.slice(0, 2), hub, groundMount, ...companies.slice(2)]);
    expect(hub).toHaveAttribute('aria-expanded', 'false');

    const role = screen.getByText('My role');
    const about = screen.getByText('About');
    expect(role.compareDocumentPosition(about) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(about.compareDocumentPosition(hub) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('shows the Orcrist company link while collapsed and expands Connector Hub', async () => {
    const user = userEvent.setup();
    render(<CVPage />);

    const company = screen.getByRole('button', { name: 'Orcrist Technologies' });
    const link = screen.getByRole('link', { name: /Link to orcrist/i });
    expect(company).toHaveAttribute('aria-expanded', 'false');
    expect(link).toHaveTextContent(/^Link$/);
    expect(link).toHaveAttribute('href', 'https://orcrist.org');
    expect(company.nextElementSibling).toBe(link);

    await user.click(company);
    await user.click(await screen.findByRole('button', { name: 'Connector Hub' }));
    expect(await screen.findByText(/Law enforcement and military analysts relying on open-source intelligence data/))
      .toBeInTheDocument();
    expect(screen.getByText('Problem').nextElementSibling).toHaveTextContent(/live open-source data from multiple providers/);
    expect(screen.getByText('What I did').nextElementSibling).toHaveTextContent(/I led product work on Connector Hub/);
  });

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

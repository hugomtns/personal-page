import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// The page 404s unless its tab is live, so force it live here — this file is
// about what the garden renders. The gate itself is covered in
// app/unlaunched-routes.test.tsx.
vi.mock('@/content/site', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/site')>();
  return { ...actual, isLive: () => true };
});

import ProjectsPage from './page';
import { projects } from '@/content/projects';

describe('Projects page', () => {
  it('renders a tile for every project', () => {
    render(<ProjectsPage />);
    projects.forEach((p) => {
      expect(
        screen.getByRole('button', { name: new RegExp(p.name, 'i') })
      ).toBeInTheDocument();
    });
  });

  it('opens a tile’s detail in place, then closes it', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const tile = screen.getByRole('button', { name: /placeholder one/i });
    expect(tile).toHaveAttribute('aria-expanded', 'false');
    // Just the tile face before it opens.
    expect(screen.getAllByText('Placeholder One')).toHaveLength(1);

    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'true');
    // Tile face + the detail panel's heading.
    expect(screen.getAllByText('Placeholder One')).toHaveLength(2);
    expect(screen.getByText(projects[0].description)).toBeInTheDocument();

    // The tile toggles closed; the gate for that is aria-expanded, which flips
    // synchronously (the panel's exit animation may still be unwinding).
    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens only one project at a time', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const one = screen.getByRole('button', { name: /placeholder one/i });
    const two = screen.getByRole('button', { name: /placeholder two/i });

    await user.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');

    await user.click(two);
    expect(two).toHaveAttribute('aria-expanded', 'true');
    expect(one).toHaveAttribute('aria-expanded', 'false');
  });
});

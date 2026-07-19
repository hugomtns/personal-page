import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// The page 404s unless its tab is live, so force it live here — this file is
// about what the garden renders. The gate itself is covered in
// app/unlaunched-routes.test.tsx, the teaser state in coming-soon.test.tsx.
vi.mock('@/content/site', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/site')>();
  return { ...actual, isLive: () => true };
});

// Render the garden, not the teaser: the teaser is the shipped default while
// the garden waits for real content.
vi.mock('@/content/projects', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/projects')>();
  return { ...actual, comingSoon: false };
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

    const first = projects[0];
    const tile = screen.getByRole('button', { name: new RegExp(first.name, 'i') });
    expect(tile).toHaveAttribute('aria-expanded', 'false');
    // Just the tile face before it opens; the detail heading is not there yet.
    expect(screen.queryByRole('heading', { name: first.name })).not.toBeInTheDocument();

    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'true');
    // The detail panel opens in place, headed by the project name.
    expect(screen.getByRole('heading', { name: first.name })).toBeInTheDocument();
    expect(screen.getByText(first.description)).toBeInTheDocument();

    // The tile toggles closed; the gate for that is aria-expanded, which flips
    // synchronously (the panel's exit animation may still be unwinding).
    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens only one project at a time', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const one = screen.getByRole('button', { name: new RegExp(projects[0].name, 'i') });
    const two = screen.getByRole('button', { name: new RegExp(projects[1].name, 'i') });

    await user.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');

    await user.click(two);
    expect(two).toHaveAttribute('aria-expanded', 'true');
    expect(one).toHaveAttribute('aria-expanded', 'false');
  });
});

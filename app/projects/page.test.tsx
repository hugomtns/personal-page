import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/content/site', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/site')>();
  return { ...actual, isLive: () => true };
});

vi.mock('@/content/projects', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/projects')>();
  return { ...actual, comingSoon: false };
});

import ProjectsPage from './page';
import { projects } from '@/content/projects';

const workCount = projects.filter((p) => p.group === 'work').length;
const playCount = projects.filter((p) => p.group === 'play').length;

describe('Projects page', () => {
  it('renders Work and Play section headings', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Work', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Play', level: 2 })).toBeInTheDocument();
  });

  it('renders a tile for every project', () => {
    render(<ProjectsPage />);
    projects.forEach((p) => {
      expect(
        screen.getByRole('button', { name: new RegExp(p.name, 'i') })
      ).toBeInTheDocument();
    });
  });

  it('renders the correct number of tiles in each section', () => {
    render(<ProjectsPage />);
    const tiles = screen.getAllByRole('button', { name: /./ });
    expect(tiles.length).toBe(workCount + playCount);
  });

  it('opens a tile’s detail in place, then closes it', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const first = projects[0];
    const tile = screen.getByRole('button', { name: new RegExp(first.name, 'i') });
    expect(tile).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('heading', { name: first.name })).not.toBeInTheDocument();

    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { name: first.name })).toBeInTheDocument();
    expect(screen.getByText(first.description)).toBeInTheDocument();

    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens only one project at a time within a garden', async () => {
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

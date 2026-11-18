import { render, screen, within } from '@testing-library/react';
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
  it('links each category to its section heading', () => {
    render(<ProjectsPage />);
    const navigation = screen.getByRole('navigation', { name: 'Project categories' });

    for (const [name, id] of [['Work', 'work'], ['Play', 'play'], ['Stellaris Mods', 'stellaris-mods']]) {
      expect(within(navigation).getByRole('link', { name })).toHaveAttribute('href', `#${id}`);
      expect(screen.getByRole('heading', { level: 2, name })).toHaveAttribute('id', id);
    }
  });

  it('renders a collapsed disclosure for every project', () => {
    render(<ProjectsPage />);
    projects.forEach((p) => {
      const trigger = screen.getByRole('button', { name: p.name });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAccessibleDescription(p.tagline);
    });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders the correct number of projects in each section', () => {
    render(<ProjectsPage />);

    const workSection = screen.getByRole('heading', { name: 'Work', level: 2 }).closest('section');
    const playSection = screen.getByRole('heading', { name: 'Play', level: 2 }).closest('section');

    expect(within(workSection!).getAllByRole('button').length).toBe(workCount);
    expect(within(playSection!).getAllByRole('button').length).toBe(playCount);
  });

  it('opens a project directly below its trigger and restores focus on close', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const first = projects[0];
    const trigger = screen.getByRole('button', { name: first.name });
    expect(screen.queryByText(first.description)).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const panel = document.getElementById(trigger.getAttribute('aria-controls')!);
    expect(panel?.parentElement).toBe(trigger.closest('li'));
    expect(within(panel!).getByText(first.description)).toBeInTheDocument();
    expect(within(panel!).getAllByRole('button', { name: /View larger image/ })).toHaveLength(first.images.length);

    await user.click(within(panel!).getByRole('button', { name: 'Close project' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
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

  it('keeps Work and Play gardens independent', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const workProject = projects.find((p) => p.group === 'work');
    const playProject = projects.find((p) => p.group === 'play');
    if (!workProject || !playProject) {
      throw new Error('Test requires at least one Work and one Play project');
    }

    const workTile = screen.getByRole('button', { name: new RegExp(workProject.name, 'i') });
    const playTile = screen.getByRole('button', { name: new RegExp(playProject.name, 'i') });

    await user.click(workTile);
    expect(workTile).toHaveAttribute('aria-expanded', 'true');

    await user.click(playTile);
    expect(playTile).toHaveAttribute('aria-expanded', 'true');
    expect(workTile).toHaveAttribute('aria-expanded', 'true');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ProjectGarden from './ProjectGarden';
import type { Project } from '@/content/projects';

const mockProjects: Project[] = [
  {
    id: 'alpha',
    name: 'Alpha',
    tagline: 'First test project.',
    description: 'This is the alpha project.',
    images: [null],
  },
  {
    id: 'beta',
    name: 'Beta',
    tagline: 'Second test project.',
    description: 'This is the beta project.',
    images: [null, null],
  },
];

describe('ProjectGarden', () => {
  it('renders a tile for every supplied project', () => {
    render(<ProjectGarden projects={mockProjects} />);
    mockProjects.forEach((p) => {
      expect(screen.getByRole('button', { name: new RegExp(p.name, 'i') })).toBeInTheDocument();
    });
  });

  it('opens a tile and shows the detail panel', async () => {
    const user = userEvent.setup();
    render(<ProjectGarden projects={mockProjects} />);

    const first = mockProjects[0];
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

  it('only opens one tile at a time', async () => {
    const user = userEvent.setup();
    render(<ProjectGarden projects={mockProjects} />);

    const one = screen.getByRole('button', { name: /alpha/i });
    const two = screen.getByRole('button', { name: /beta/i });

    await user.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');

    await user.click(two);
    expect(two).toHaveAttribute('aria-expanded', 'true');
    expect(one).toHaveAttribute('aria-expanded', 'false');
  });
});

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
    group: 'work',
  },
  {
    id: 'beta',
    name: 'Beta',
    tagline: 'Second test project.',
    description: 'This is the beta project.',
    url: 'https://example.com/beta',
    images: [null, null],
    group: 'play',
  },
];

describe('ProjectGarden', () => {
  it('renders a row for every supplied project', () => {
    render(<ProjectGarden projects={mockProjects} />);
    mockProjects.forEach((p) => {
      expect(screen.getByRole('button', { name: new RegExp(p.name, 'i') })).toBeInTheDocument();
    });
  });

  it('offers an independent live link beside the collapsed project', async () => {
    const user = userEvent.setup();
    render(<ProjectGarden projects={mockProjects} />);

    const toggle = screen.getByRole('button', { name: 'Beta' });
    const link = screen.getByRole('link', { name: 'Link to Beta' });
    expect(link).toHaveTextContent('Link');
    expect(link).toHaveAttribute('href', 'https://example.com/beta');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.parentElement).toBe(toggle.parentElement);
    expect(screen.getAllByRole('link')).toEqual([link]);

    await user.click(link);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a project and preserves missing screenshot placeholders', async () => {
    const user = userEvent.setup();
    render(<ProjectGarden projects={mockProjects} />);

    const first = mockProjects[0];
    const tile = screen.getByRole('button', { name: new RegExp(first.name, 'i') });
    expect(tile).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(first.description)).not.toBeInTheDocument();

    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(first.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View larger image 1 of 1/i })).toHaveTextContent('screenshot');

    await user.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'false');
  });

  it('only opens one project at a time and gives each panel a unique id', async () => {
    const user = userEvent.setup();
    render(<ProjectGarden projects={mockProjects} />);

    const one = screen.getByRole('button', { name: /alpha/i });
    const two = screen.getByRole('button', { name: /beta/i });
    expect(one.getAttribute('aria-controls')).not.toEqual(two.getAttribute('aria-controls'));

    await user.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');

    await user.click(two);
    expect(two).toHaveAttribute('aria-expanded', 'true');
    expect(one).toHaveAttribute('aria-expanded', 'false');
  });
});

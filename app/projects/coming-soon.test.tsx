import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// The shipped state of the tab: live in the nav, but the garden parked behind
// the comingSoon flag in content/projects.ts. Force the tab live and the flag
// on, the same combination production runs until the garden is ready.
vi.mock('@/content/site', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/site')>();
  return { ...actual, isLive: () => true };
});

vi.mock('@/content/projects', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/projects')>();
  return { ...actual, comingSoon: true };
});

import ProjectsPage from './page';

describe('Projects page, coming soon state', () => {
  it('shows the teaser and no garden tiles', () => {
    render(<ProjectsPage />);

    expect(screen.getByText('Coming soon')).toBeInTheDocument();
    expect(screen.getByText(/side projects and hobbies/i)).toBeInTheDocument();
    // No garden: nothing expandable, no placeholder tiles.
    expect(screen.queryByRole('button', { name: /placeholder/i })).not.toBeInTheDocument();
  });
});

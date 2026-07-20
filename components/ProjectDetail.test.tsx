import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ProjectDetail from './ProjectDetail';

const mockProject = {
  id: 'demo',
  name: 'Demo Project',
  tagline: 'A demo for testing.',
  description: 'This is the demo project description.',
  images: ['/images/demo/01.webp', '/images/demo/02.webp'],
  captions: ['First caption'],
  group: 'play' as const,
};

describe('ProjectDetail', () => {
  it('opens the lightbox when a screenshot is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /View larger image 1 of 2/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — First caption');
  });

  it('navigates images with arrow keys', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /View larger image 1 of 2/i }));
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — First caption');

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — Screenshot 2');

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — First caption');
  });

  it('closes the lightbox on Escape', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /View larger image 1 of 2/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

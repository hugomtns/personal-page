import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import TimelineRole from './TimelineRole';
import type { Role } from '@/content/cv';

const role: Role = {
  company: 'PVcase',
  title: 'Senior Product Manager',
  context: 'Renewable energy B2B SaaS — Berlin',
  start: 'Aug 2024',
  end: 'Present',
  summary: 'Lead the Ground Mount flagship product.',
  stories: [{ title: 'Knowledge graph', body: 'Built a multi-source knowledge graph.' }],
};

describe('TimelineRole', () => {
  it('shows company, title and dates without interaction', () => {
    render(<TimelineRole role={role} />);
    expect(screen.getByText('PVcase')).toBeInTheDocument();
    expect(screen.getByText(/senior product manager/i)).toBeInTheDocument();
    expect(screen.getByText(/aug 2024/i)).toBeInTheDocument();
  });

  it('hides story detail until expanded', () => {
    render(<TimelineRole role={role} />);
    expect(screen.queryByText(/multi-source knowledge graph/i)).not.toBeInTheDocument();
  });

  it('reveals stories when expanded', async () => {
    const user = userEvent.setup();
    render(<TimelineRole role={role} />);
    await user.click(screen.getByRole('button', { name: /pvcase/i }));
    expect(screen.getByText(/multi-source knowledge graph/i)).toBeInTheDocument();
  });

  it('reports expansion state to assistive tech', async () => {
    const user = userEvent.setup();
    render(<TimelineRole role={role} />);
    const trigger = screen.getByRole('button', { name: /pvcase/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});

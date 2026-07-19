import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders a bordered surface div by default', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');
    expect(card.tagName).toBe('DIV');
    expect(card).toHaveClass('rounded-card', 'border', 'bg-surface', 'border-border');
  });

  it('keeps the accent border when open', () => {
    render(<Card open>Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('border-accent');
    expect(screen.getByText('Content')).not.toHaveClass('border-border');
  });

  it('lifts the border on hover only when interactive', () => {
    render(<Card interactive>Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('hover:border-accent');
  });

  it('renders as a button for whole-card click targets', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card as="button" onClick={onClick} aria-expanded={false}>
        Content
      </Card>
    );
    const card = screen.getByRole('button', { name: 'Content' });
    expect(card).toHaveAttribute('type', 'button');
    await user.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes layout classes through', () => {
    render(<Card className="p-6 sm:p-8">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('p-6', 'sm:p-8');
  });
});

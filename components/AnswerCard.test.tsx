import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AnswerCard from './AnswerCard';

const answer = { text: 'Ship a thin slice and learn from it', scores: true };

describe('AnswerCard', () => {
  it('is itself the button: clicking the card commits its answer', async () => {
    const onCommit = vi.fn();
    render(<AnswerCard answer={answer} onCommit={onCommit} />);

    await userEvent.click(screen.getByRole('button', { name: answer.text }));
    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  it('announces the answer exactly once (the card text IS the accessible name)', () => {
    render(<AnswerCard answer={answer} onCommit={() => {}} />);
    expect(screen.getAllByText(answer.text)).toHaveLength(1);
    expect(screen.getByRole('button', { name: answer.text })).toBeInTheDocument();
  });

  it('renders a native button with a decorative terminal prompt', () => {
    const { container } = render(
      <AnswerCard answer={answer} onCommit={() => {}} />,
    );
    const button = screen.getByRole('button', { name: answer.text });
    expect(container.firstElementChild).toBe(button);
    expect(button.querySelector('[aria-hidden="true"]')).toHaveTextContent('>');
  });
});

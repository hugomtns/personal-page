import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AnswerCard from './AnswerCard';

const answer = { text: 'Ship a thin slice and learn from it', scores: true };

describe('AnswerCard', () => {
  it('is itself the button: clicking the card commits its answer', async () => {
    const onCommit = vi.fn();
    render(<AnswerCard side="left" answer={answer} reduce={false} onCommit={onCommit} />);

    await userEvent.click(screen.getByRole('button', { name: answer.text }));
    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  it('announces the answer exactly once (the card text IS the accessible name)', () => {
    render(<AnswerCard side="left" answer={answer} reduce={false} onCommit={() => {}} />);
    expect(screen.getAllByText(answer.text)).toHaveLength(1);
    expect(screen.getByRole('button', { name: answer.text })).toBeInTheDocument();
  });

  it('deals the card portrait, like a playing card', () => {
    const { container } = render(
      <AnswerCard side="left" answer={answer} reduce={true} onCommit={() => {}} />,
    );
    expect(container.querySelector('.aspect-\\[5\\/7\\]')).not.toBeNull();
  });

  it('tells the pair apart by border color: ink on the left, accent on the right', () => {
    render(
      <>
        <AnswerCard side="left" answer={answer} reduce={true} onCommit={() => {}} />
        <AnswerCard side="right" answer={answer} reduce={true} onCommit={() => {}} />
      </>,
    );
    const [left, right] = screen.getAllByRole('button');
    expect(left.className).toContain('border-fg');
    expect(right.className).toContain('border-accent');
  });

  it('tilts outward from the middle: left card counter-clockwise, right card clockwise', () => {
    // reduce={true} pins initial === final, so Motion writes the transform
    // synchronously on mount. Verified against motion v12 in jsdom: rotate
    // lands in style.transform as `rotate(-4deg)`, not the CSS rotate property.
    const { container: leftBox } = render(
      <AnswerCard side="left" answer={answer} reduce={true} onCommit={() => {}} />,
    );
    const { container: rightBox } = render(
      <AnswerCard side="right" answer={answer} reduce={true} onCommit={() => {}} />,
    );
    const leftCard = leftBox.querySelector('[data-answer-card]') as HTMLElement;
    const rightCard = rightBox.querySelector('[data-answer-card]') as HTMLElement;
    expect(leftCard.style.transform).toContain('rotate(-4deg)');
    expect(rightCard.style.transform).toContain('rotate(4deg)');
  });
});

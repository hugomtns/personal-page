import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AnswerCard, { shouldCommitSwipe } from './AnswerCard';

const answer = { text: 'Ship a thin slice and learn from it', scores: true };

describe('shouldCommitSwipe', () => {
  it('commits when the card is dragged far enough in its own direction', () => {
    expect(shouldCommitSwipe(-121, 0, 'left')).toBe(true);
    expect(shouldCommitSwipe(121, 0, 'right')).toBe(true);
  });

  it('commits on a fast flick short of the distance', () => {
    expect(shouldCommitSwipe(-40, -600, 'left')).toBe(true);
    expect(shouldCommitSwipe(40, 600, 'right')).toBe(true);
  });

  it('does not commit below both thresholds', () => {
    expect(shouldCommitSwipe(-119, 0, 'left')).toBe(false);
    expect(shouldCommitSwipe(119, 0, 'right')).toBe(false);
  });

  it('never commits in the wrong direction', () => {
    expect(shouldCommitSwipe(200, 900, 'left')).toBe(false);
    expect(shouldCommitSwipe(-200, -900, 'right')).toBe(false);
  });
});

describe('AnswerCard', () => {
  it('offers the answer as a real button (the click/keyboard path)', async () => {
    const onCommit = vi.fn();
    render(<AnswerCard side="left" answer={answer} reduce={false} onCommit={onCommit} />);

    await userEvent.click(screen.getByRole('button', { name: answer.text }));
    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  it('shows the answer text on the card exactly once to assistive tech', () => {
    render(<AnswerCard side="left" answer={answer} reduce={false} onCommit={() => {}} />);
    // The card's copy is aria-hidden (the button carries the accessible
    // name), so the text is announced once, not twice.
    expect(screen.getAllByText(answer.text)).toHaveLength(2); // card + button in the DOM
    expect(screen.getByRole('button', { name: answer.text })).toBeInTheDocument();
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

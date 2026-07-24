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
  it('offers a "Choose" button as the click/keyboard path', async () => {
    const onCommit = vi.fn();
    render(<AnswerCard side="left" answer={answer} reduce={false} onCommit={onCommit} />);

    // Both buttons in a pair read "Choose"; the accessible name carries the
    // answer so assistive tech (and tests) can tell them apart.
    await userEvent.click(screen.getByRole('button', { name: `Choose: ${answer.text}` }));
    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  it('shows the answer text exactly once: on the aria-hidden card, not the button', () => {
    render(<AnswerCard side="left" answer={answer} reduce={false} onCommit={() => {}} />);
    // The card is aria-hidden and the button visibly reads only "Choose", so
    // the answer text exists once in the DOM and is announced once, inside
    // the button's accessible name.
    expect(screen.getAllByText(answer.text)).toHaveLength(1);
    const button = screen.getByRole('button', { name: `Choose: ${answer.text}` });
    expect(button).toHaveTextContent('Choose');
  });

  it('deals the card portrait, like a playing card', () => {
    const { container } = render(
      <AnswerCard side="left" answer={answer} reduce={true} onCommit={() => {}} />,
    );
    expect(container.querySelector('.aspect-\\[5\\/7\\]')).not.toBeNull();
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

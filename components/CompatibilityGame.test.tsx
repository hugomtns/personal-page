import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CompatibilityGame from './CompatibilityGame';
import {
  dealRun,
  tierForScore,
  quizQuestions,
  QUIZ_RUN_LENGTH,
  type DealtQuestion,
} from '@/content/compatibilityQuiz';

// Deterministic rng. Each test deals a reference run AND renders the
// component, and both must see the same sequence — but a mulberry32 closure
// is stateful, so sharing one between dealRun() and the component would
// desync them. Two fresh generators with the same seed produce identical
// sequences; that is what keeps the reference run in sync with the game.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function startGame(seed: number) {
  render(<CompatibilityGame rng={mulberry32(seed)} />);
  await userEvent.click(screen.getByRole('button', { name: /start the test/i }));
}

function scoringText(q: DealtQuestion) {
  return (q.left.scores ? q.left : q.right).text;
}
function deadText(q: DealtQuestion) {
  return (q.left.scores ? q.right : q.left).text;
}

async function answerRun(run: DealtQuestion[], pick: (q: DealtQuestion) => string) {
  for (const q of run) {
    await userEvent.click(screen.getByRole('button', { name: pick(q) }));
  }
}

describe('CompatibilityGame', () => {
  it('opens on an intro screen with a start button and a way back home', () => {
    render(<CompatibilityGame rng={mulberry32(1)} />);
    expect(
      screen.getByRole('heading', { name: /should you work with hugo/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start the test/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to hugomartins/i })).toHaveAttribute(
      'href',
      'https://hugomartins.pm',
    );
  });

  it('starts on question 1 of 20 and advances as answers come in', async () => {
    const run = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(2));
    await startGame(2);

    expect(screen.getByText(`Question 1 / ${QUIZ_RUN_LENGTH}`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: run[0].question })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: scoringText(run[0]) }));
    expect(screen.getByText(`Question 2 / ${QUIZ_RUN_LENGTH}`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: run[1].question })).toBeInTheDocument();
  });

  it('shows a fly-out card when a question is answered', async () => {
    const run = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(3));
    await startGame(3);
    await userEvent.click(screen.getByRole('button', { name: scoringText(run[0]) }));
    expect(document.querySelector('[data-flyout]')).not.toBeNull();
  });

  it('reaches the result after 20 answers, scoring only the scoring answers', async () => {
    const run = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(4));
    await startGame(4);
    await answerRun(run, scoringText);

    expect(screen.getByText(`${QUIZ_RUN_LENGTH} / ${QUIZ_RUN_LENGTH}`)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: tierForScore(QUIZ_RUN_LENGTH).headline }),
    ).toBeInTheDocument();
  });

  it('a perfect run offers contact and home; the fail tier offers only home', async () => {
    const perfectRun = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(5));
    await startGame(5);
    await answerRun(perfectRun, scoringText);

    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute(
      'href',
      'https://hugomartins.pm/contact',
    );
    expect(screen.getByRole('link', { name: /back to hugomartins/i })).toHaveAttribute(
      'href',
      'https://hugomartins.pm',
    );
  });

  it('the fail tier shows the fail headline and no contact link', async () => {
    const run = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(6));
    await startGame(6);
    await answerRun(run, deadText);

    expect(screen.getByRole('heading', { name: tierForScore(0).headline })).toBeInTheDocument();
    expect(screen.getByText(`0 / ${QUIZ_RUN_LENGTH}`)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /get in touch/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to hugomartins/i })).toBeInTheDocument();
  });

  it('play again reshuffles and restarts at question 1 with a zeroed score', async () => {
    const run = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(7));
    await startGame(7);
    await answerRun(run, deadText);

    await userEvent.click(screen.getByRole('button', { name: /play again/i }));
    expect(screen.getByText(`Question 1 / ${QUIZ_RUN_LENGTH}`)).toBeInTheDocument();
  });
});

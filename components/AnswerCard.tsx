'use client';

import { motion } from 'motion/react';
import type { QuizAnswer } from '@/content/compatibilityQuiz';
import { EASE_OUT } from '@/lib/motion';

const TILT = 4; // degrees outward from the middle; the dealt-pair look

type Props = {
  side: 'left' | 'right';
  answer: QuizAnswer;
  reduce: boolean | null;
  onCommit: () => void;
};

export default function AnswerCard({ side, answer, reduce, onCommit }: Props) {
  const tilt = side === 'left' ? -TILT : TILT;

  return (
    // Keep the answer itself as the button's accessible name.
    <motion.div
      data-answer-card
      initial={reduce ? { opacity: 1, y: 0, rotate: tilt } : { opacity: 0, y: 24, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE_OUT }}
      whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
      className="select-none"
    >
      <button
        type="button"
        onClick={onCommit}
        className={`terminal-quiz__card aspect-[5/7] ${
          side === 'left' ? 'border-fg' : 'border-accent'
        }`}
      >
        <span className="terminal-quiz__card-prompt" aria-hidden="true">&gt;</span>
        <span className="terminal-quiz__answer">{answer.text}</span>
      </button>
    </motion.div>
  );
}

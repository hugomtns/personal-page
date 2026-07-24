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
    // The card IS the button: click, keyboard, and screen reader all use it
    // directly, so the answer is announced exactly once (the card's own
    // text). The site-wide rule in globals.css gives buttons the pointer
    // cursor on hover; whileHover straightens and lifts the card. The pair is
    // told apart by border color — ink (fg) on the left, accent on the right,
    // one step off the page's own palette in each theme.
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
        className={`flex aspect-[5/7] w-full items-center justify-center rounded-card border-2 bg-surface p-6 text-center shadow-[0_12px_32px_-12px_rgb(0_0_0/0.3)] ${
          side === 'left' ? 'border-fg' : 'border-accent'
        }`}
      >
        <span className="text-body leading-snug">{answer.text}</span>
      </button>
    </motion.div>
  );
}

'use client';

import { motion } from 'motion/react';
import Card from './Card';
import Button from './Button';
import type { QuizAnswer } from '@/content/compatibilityQuiz';
import { EASE_OUT } from '@/lib/motion';

// How a swipe commits: dragged past the distance, or flicked past the
// velocity, in the card's own direction. The left card only ever commits
// leftward and the right card rightward, so a drag toward the middle always
// springs back. Pure and exported so the thresholds are unit-testable —
// jsdom cannot fire real drag gestures.
export const SWIPE_DISTANCE = 120;
export const SWIPE_VELOCITY = 500;

export function shouldCommitSwipe(
  offsetX: number,
  velocityX: number,
  side: 'left' | 'right',
): boolean {
  const dir = side === 'left' ? -1 : 1;
  return offsetX * dir > SWIPE_DISTANCE || velocityX * dir > SWIPE_VELOCITY;
}

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
    <div className="flex flex-col gap-4">
      {/*
        The card is presentation: draggable, tilted, aria-hidden. The button
        below is the control (click, keyboard, screen reader). Both commit the
        same answer, so no interaction requires the drag. `touch-pan-y` keeps
        vertical page scrolling alive on touch while horizontal drags go to
        the card.
      */}
      <motion.div
        data-answer-card
        aria-hidden
        drag={reduce ? false : 'x'}
        dragConstraints={{ left: side === 'left' ? -320 : 0, right: side === 'right' ? 320 : 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (shouldCommitSwipe(info.offset.x, info.velocity.x, side)) onCommit();
        }}
        initial={reduce ? { opacity: 1, y: 0, rotate: tilt } : { opacity: 0, y: 24, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: tilt }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE_OUT }}
        whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
        className="touch-pan-y select-none"
      >
        <Card className="flex min-h-44 items-center justify-center p-6 text-center shadow-[0_12px_32px_-12px_rgb(0_0_0/0.3)]">
          <span className="text-body leading-snug">{answer.text}</span>
        </Card>
      </motion.div>

      <Button onClick={onCommit} className="w-full">
        {answer.text}
      </Button>
    </div>
  );
}

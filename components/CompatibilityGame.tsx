'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Button from './Button';
import AnswerCard from './AnswerCard';
import {
  dealRun,
  tierForScore,
  quizQuestions,
  QUIZ_RUN_LENGTH,
  type DealtQuestion,
  type QuizAnswer,
} from '@/content/compatibilityQuiz';
import { EASE_OUT } from '@/lib/motion';

type Phase = 'intro' | 'playing' | 'result';

// The card just answered, flying off while the next pair deals in. It is
// aria-hidden and pointer-events-none: presentation over the live UI, never
// a duplicate control. If its completion callback never fires (jsdom), the
// only cost is a hidden overlay; the game itself never waits on it.
type FlyOut = { direction: 'left' | 'right'; text: string } | null;

// Exit links are absolute: the game is served under a subdomain, and a
// relative "/" would resolve against it.
const HOME_URL = 'https://hugomartins.pm';
const CONTACT_URL = 'https://hugomartins.pm/contact';

const exitLinkClass =
  'inline-flex min-h-11 items-center rounded-full border border-border px-6 text-small transition-colors duration-180 hover:border-accent';

export default function CompatibilityGame({ rng = Math.random }: { rng?: () => number }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('intro');
  const [run, setRun] = useState<DealtQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [flyOut, setFlyOut] = useState<FlyOut>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  // The answer pair remounts per question (key={index} below), so the button
  // a keyboard user just pressed unmounts and focus would fall to <body>.
  // Hand it to the new question instead; tabIndex={-1} makes the heading
  // focusable without adding it to the tab order.
  useEffect(() => {
    if (phase === 'playing') questionRef.current?.focus();
  }, [index, phase]);

  useEffect(() => {
    if (phase === 'result') resultRef.current?.focus();
  }, [phase]);

  function start() {
    setRun(dealRun(quizQuestions, QUIZ_RUN_LENGTH, rng));
    setIndex(0);
    setScore(0);
    setFlyOut(null);
    setPhase('playing');
  }

  function answer(side: 'left' | 'right', choice: QuizAnswer) {
    setScore((s) => s + (choice.scores ? 1 : 0));
    if (!reduce) setFlyOut({ direction: side, text: choice.text });
    if (index + 1 >= run.length) setPhase('result');
    else setIndex((i) => i + 1);
  }

  if (phase === 'intro') {
    return (
      <div className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center px-6 py-20">
        <p className="label">A compatibility test</p>
        <h1 className="mt-4 text-h1">Should you work with Hugo?</h1>
        <p className="mt-6 max-w-xl text-h2 leading-snug text-muted">
          Twenty questions about how product work gets done. Two answers each.
          One of them is how I work.
        </p>
        <p className="mt-4 max-w-xl text-muted">
          Swipe a card or tap an answer. There are no trick questions.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button onClick={start}>Start the test</Button>
          <a href={HOME_URL} className="label weight-hover hover:text-accent">
            Back to hugomartins.pm
          </a>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const tier = tierForScore(score);
    return (
      <div className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center px-6 py-20">
        <p className="label">Your score</p>
        <motion.p
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT }}
          className="mt-4 font-display text-display"
        >
          {score} / {QUIZ_RUN_LENGTH}
        </motion.p>
        <h1 ref={resultRef} tabIndex={-1} className="mt-6 text-h1">{tier.headline}</h1>
        <p className="mt-6 max-w-xl text-h2 leading-snug text-muted">{tier.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button onClick={start}>Play again</Button>
          <a href={HOME_URL} className={exitLinkClass}>
            Back to hugomartins.pm
          </a>
          {tier.showContact && (
            <a href={CONTACT_URL} className={exitLinkClass}>
              Get in touch
            </a>
          )}
        </div>
      </div>
    );
  }

  const current = run[index];
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col px-6 py-10">
      <div aria-live="polite" className="label flex justify-between">
        <span>
          Question {index + 1} / {run.length}
        </span>
      </div>
      {/* Plain CSS transition: the global reduced-motion kill-switch in
          globals.css already flattens it. */}
      <div className="mt-2 h-px bg-border">
        <div
          className="h-px bg-accent transition-[width] duration-180"
          style={{ width: `${((index + 1) / run.length) * 100}%` }}
        />
      </div>

      <div className="mt-12 flex items-start gap-4">
        {/* Abstract avatar placeholder: a monogram mark standing in for a
            future illustration. Deliberately not the portrait photo. */}
        <div
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface font-display text-small"
        >
          HM
        </div>
        <h1 ref={questionRef} tabIndex={-1} className="text-h3 max-w-xl">{current.question}</h1>
      </div>

      {/* key={index} remounts the pair per question, replaying the deal-in. */}
      <div key={index} className="mt-12 grid gap-6 sm:grid-cols-2">
        <AnswerCard
          side="left"
          answer={current.left}
          reduce={reduce}
          onCommit={() => answer('left', current.left)}
        />
        <AnswerCard
          side="right"
          answer={current.right}
          reduce={reduce}
          onCommit={() => answer('right', current.right)}
        />
      </div>

      {flyOut && (
        <motion.div
          data-flyout
          aria-hidden
          initial={false}
          animate={{
            x: flyOut.direction === 'left' ? -600 : 600,
            opacity: 0,
            rotate: flyOut.direction === 'left' ? -12 : 12,
          }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          onAnimationComplete={() => setFlyOut(null)}
          className="pointer-events-none fixed top-1/2 left-1/2 z-50 w-64 -translate-x-1/2 -translate-y-1/2 rounded-card border border-border bg-surface p-6 text-center shadow-[0_12px_32px_-12px_rgb(0_0_0/0.3)]"
        >
          {flyOut.text}
        </motion.div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import Button from './Button';
import AnswerCard from './AnswerCard';
import ThemeToggle from './ThemeToggle';
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

const QUESTION_AVATAR = '/images/quiz/question-pixel.webp';

function QuizFrame({ children }: { children: ReactNode }) {
  return (
    <div className="terminal-frame terminal-quiz">
      <div className="terminal-bar terminal-quiz__bar">
        <span>A compatibility test</span>
        <ThemeToggle />
      </div>
      <div className="terminal-quiz__body">{children}</div>
    </div>
  );
}

function quizAvatar(src: string | null) {
  return (
    <div aria-hidden className="terminal-quiz__avatar">
      {src ? <Image src={src} alt="" width={96} height={96} /> : 'HM'}
    </div>
  );
}

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

  // Local preview helper: on the dev server, ?score=N jumps straight to the
  // result screen so the three verdict tiers can be reviewed without playing
  // twenty questions (?score=5 fail, ?score=13 mid, ?score=18 top). Inert
  // everywhere else, guarded on the hostname. It must be an effect, not a
  // lazy useState initializer: the server has no window, so it always
  // renders the intro, and initialising to the result on the client would
  // be a hydration mismatch. Reading the URL once at mount is the legitimate
  // exception to the no-setState-in-effect rule.
  useEffect(() => {
    if (!window.location.hostname.endsWith('localhost')) return;
    const forced = new URLSearchParams(window.location.search).get('score');
    if (forced === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScore(Math.max(0, Math.min(QUIZ_RUN_LENGTH, Number(forced) || 0)));
    setPhase('result');
  }, []);

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
      <QuizFrame>
        <h1 className="terminal-quiz__headline">Should you work with Hugo?</h1>
        <p className="terminal-quiz__description">
          Twenty questions about how product work gets done, with two answers
          each. Takes only a few minutes.
        </p>
        <div className="terminal-quiz__actions">
          <Button onClick={start}>Start the game</Button>
          <a href={HOME_URL} className="terminal-control">
            Back to hugomartins.pm
          </a>
        </div>
      </QuizFrame>
    );
  }

  if (phase === 'result') {
    const tier = tierForScore(score);
    return (
      <QuizFrame>
        <p className="terminal-quiz__status">Your score</p>
        <div className="terminal-quiz__result">
          {quizAvatar(tier.avatar)}
          <motion.p
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT }}
            className="terminal-quiz__score"
          >
            {score} / {QUIZ_RUN_LENGTH}
          </motion.p>
        </div>
        <h1 ref={resultRef} tabIndex={-1} className="terminal-quiz__headline" style={{ outline: 'none' }}>
          {tier.headline}
        </h1>
        <p className="terminal-quiz__description">{tier.body}</p>
        <div className="terminal-quiz__actions">
          {tier.showContact ? (
            <>
              <a href={CONTACT_URL} className="btn-primary">Get in touch</a>
              <button type="button" onClick={start} className="terminal-control">Play again</button>
            </>
          ) : (
            <Button onClick={start}>Play again</Button>
          )}
          <a href={HOME_URL} className="terminal-control">Back to hugomartins.pm</a>
        </div>
      </QuizFrame>
    );
  }

  const current = run[index];
  return (
    <QuizFrame>
      <p aria-live="polite" className="terminal-quiz__status">
        Question {index + 1} / {run.length}
      </p>
      <div className="terminal-quiz__progress" aria-hidden="true">
        <span style={{ width: `${((index + 1) / run.length) * 100}%` }} />
      </div>
      <div className="terminal-quiz__question-block">
        {quizAvatar(QUESTION_AVATAR)}
        <h1 ref={questionRef} tabIndex={-1} className="terminal-quiz__question" style={{ outline: 'none' }}>
          {current.question}
        </h1>
      </div>
      {/* Remount the pair per question to replay the deal-in. */}
      <div key={index} className="terminal-quiz__cards">
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
          className="terminal-quiz__flyout"
        >
          {flyOut.text}
        </motion.div>
      )}
    </QuizFrame>
  );
}

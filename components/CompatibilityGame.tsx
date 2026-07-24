'use client';

import { useEffect, useRef, useState } from 'react';
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

// The secondary action: a quiet bordered pill.
const exitLinkClass =
  'inline-flex min-h-11 items-center rounded-full border border-border px-6 text-small transition-colors duration-180 hover:border-accent';

// The primary action as a link wears the same class Button does. It must be
// the class, not utility copies of it: the unlayered `a { color: inherit }`
// rule in globals.css beats layered color utilities on anchors.
const primaryLinkClass = 'btn-primary';

// The quiz has no site header, so it carries its own theme toggle, pinned to
// the corner of every screen.
const themeToggle = (
  <div className="fixed top-4 right-4 z-50">
    <ThemeToggle />
  </div>
);

// Abstract avatar placeholder, sized to take a circle-cropped portrait later
// (Hugo plans a set of expressive shots). The monogram stands in until then;
// rounded-full + overflow-hidden means a plain <img> drops in with no layout
// change. Shared by the question and result screens.
const quizAvatar = (
  <div
    aria-hidden
    className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-surface font-display"
  >
    HM
  </div>
);

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
      <>
        {themeToggle}
        <div className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center px-6 py-20">
          <p className="label">A compatibility test</p>
          <h1 className="mt-4 text-h1">Should you work with Hugo?</h1>
          <p className="mt-6 max-w-xl text-h2 leading-snug text-muted">
            Twenty questions about how product work gets done, with two answers
            each. Takes only a few minutes.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button onClick={start}>Start the game</Button>
            <a href={HOME_URL} className="label weight-hover hover:text-accent">
              Back to hugomartins.pm
            </a>
          </div>
        </div>
      </>
    );
  }

  if (phase === 'result') {
    const tier = tierForScore(score);
    return (
      <>
        {themeToggle}
        <div className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center px-6 py-20">
          <p className="label">Your score</p>
          {/* The score is capped at the avatar's height (6rem) so the pair
              reads as one lockup instead of a number with a stamp next to it. */}
          <div className="mt-4 flex items-center gap-6">
            {quizAvatar}
            <motion.p
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT }}
              className="font-display text-[clamp(3.5rem,9vw,6rem)] leading-none tracking-[-0.035em]"
            >
              {score} / {QUIZ_RUN_LENGTH}
            </motion.p>
          </div>
          <h1 ref={resultRef} tabIndex={-1} className="mt-6 text-h1" style={{ outline: 'none' }}>
            {tier.headline}
          </h1>
          <p className="mt-6 max-w-xl text-h2 leading-snug text-muted">{tier.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* On the tiers that offer contact, that is the point of the page:
                the primary CTA, with Play again and the way home as
                secondaries. On the fail tier there is nothing to offer, so
                Play again keeps the primary slot. */}
            {tier.showContact ? (
              <>
                <a href={CONTACT_URL} className={primaryLinkClass}>
                  Get in touch
                </a>
                <button type="button" onClick={start} className={exitLinkClass}>
                  Play again
                </button>
              </>
            ) : (
              <Button onClick={start}>Play again</Button>
            )}
            <a href={HOME_URL} className={exitLinkClass}>
              Back to hugomartins.pm
            </a>
          </div>
        </div>
      </>
    );
  }

  const current = run[index];
  return (
    <>
      {themeToggle}
      <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-6 py-10">
        <div aria-live="polite" className="label">
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

        {/* The question block reserves its full height whether the question
            runs one line or two, and the stack is pinned to its top, so the
            avatar, question, and cards all sit in the same spot on every
            step instead of riding up and down with the text length. */}
        <div className="mt-12 flex min-h-60 flex-col items-center justify-start gap-6 text-center">
          {quizAvatar}
          <h1
            ref={questionRef}
            tabIndex={-1}
            className="text-h3 max-w-xl"
            // Focused programmatically on each new question (see the effect
            // above). Inline, because the site-wide :focus-visible rule is
            // unlayered and beats any Tailwind outline utility.
            style={{ outline: 'none' }}
          >
            {current.question}
          </h1>
        </div>

        {/* key={index} remounts the pair per question, replaying the deal-in.
            max-w-lg + gap-8 keeps the tilted cards from touching at their
            inner bottom corners. */}
        <div key={index} className="mx-auto mt-12 grid w-full max-w-lg gap-8 sm:grid-cols-2">
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
    </>
  );
}

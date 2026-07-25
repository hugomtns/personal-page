/**
 * The compatibility quiz at shouldiworkwith.hugomartins.pm: a pool of 24
 * either/or questions about product-management working models. Each run
 * draws 20 (QUIZ_RUN_LENGTH) in random order, and which answer sits on the
 * left card is random too — `scores` is data, never position, so players
 * cannot learn "the good answer is always on one side".
 *
 * One answer per question scores a point: the one that matches how Hugo
 * works. Both options are honest working styles, not virtue tests.
 */

export type QuizAnswer = { text: string; scores: boolean };

export type QuizQuestion = {
  id: string;
  question: string;
  answers: [QuizAnswer, QuizAnswer];
};

export type DealtQuestion = {
  id: string;
  question: string;
  left: QuizAnswer;
  right: QuizAnswer;
};

export type QuizTier = {
  /** Inclusive lower bound of the score band. */
  min: number;
  headline: string;
  body: string;
  showContact: boolean;
  /**
   * Expression photo for the result-screen avatar, or null to fall back to
   * the monogram. Files live in public/images/quiz/ (192x192 webp, made from
   * the squares in assets/avatar-source/).
   */
  avatar: string | null;
};

export const QUIZ_RUN_LENGTH = 20;

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'goodSkill',
    question: 'A great product manager has:',
    answers: [
      { text: 'A wide breadth of experience that lets them see the bigger picture and adapt to circumstances.', scores: true },
      { text: 'Deep expertise in a specific domain, so they can hit the ground running.', scores: false },
    ],
  },
  {
    id: 'mondayFeature',
    question: 'A C-level asks for a feature on a short deadline. You:',
    answers: [
      { text: 'Ship a thin slice and learn from it, and risk disappointing the higher up.', scores: true },
      { text: 'Commit to the full feature to avoid disappointment, in spite of the deadline.', scores: false },
    ],
  },
  {
    id: 'discovery',
    question: 'A new initiative lands on your desk. First move:',
    answers: [
      { text: 'Talk to five users before writing a single ticket.', scores: true },
      { text: 'Start from the data; users will bias you.', scores: false },
    ],
  },
  {
    id: 'roadmap',
    question: 'A roadmap should be:',
    answers: [
      { text: 'A direction with enough room to change in light of new evidence.', scores: true },
      { text: 'A committed plan with timelines that the org can rely on.', scores: false },
    ],
  },
  {
    id: 'meetings',
    question: 'Meetings:',
    answers: [
      { text: 'Default to async; meet only when it really matters.', scores: true },
      { text: 'Always better to have a face-to-face, regardless of topic.', scores: false },
    ],
  },
  {
    id: 'specs',
    question: 'Before engineers build, they need:',
    answers: [
      { text: 'One page of problem and constraints', scores: true },
      { text: 'A complete spec covering every case.', scores: false },
    ],
  },
  {
    id: 'dataIntuition',
    question: 'Data and intuition disagree. You:',
    answers: [
      { text: 'Let data inform, but intution decides. Run an experiment to gain confidence.', scores: true },
      { text: 'Follow the data; feelings do not scale. You can always adjust later.', scores: false },
    ],
  },
  {
    id: 'pushback',
    question: 'An engineer pushes back on your priority. You:',
    answers: [
      { text: 'Argue it out, and let the best reasoning win.', scores: true },
      { text: 'Alignment beats debate, push for agreeing to disagree.', scores: false },
    ],
  },
  {
    id: 'shipping',
    question: 'The right release cadence:',
    answers: [
      { text: 'Small releases whenever possible.', scores: true },
      { text: 'Polished launches one or a few times a quarter.', scores: false },
    ],
  },
  {
    id: 'okrs',
    question: 'OKRs are:',
    answers: [
      { text: 'A compass, not a contract.', scores: true },
      { text: 'Commitments you hit or explain why you didn\'t.', scores: false },
    ],
  },
  {
    id: 'designRole',
    question: 'Designers on your team:',
    answers: [
      { text: 'Shape the problem with me.', scores: true },
      { text: 'Execute the problem I define.', scores: false },
    ],
  },
  {
    id: 'techDebt',
    question: 'Tech debt:',
    answers: [
      { text: 'Is a budget you take on, or defend every cycle.', scores: true },
      { text: 'Something to manage and deal with around features.', scores: false },
    ],
  },
  {
    id: 'badLaunch',
    question: 'A launch goes badly. You:',
    answers: [
      { text: 'Own it, learn from it, move on.', scores: true },
      { text: 'Analyse extensively until we know whose call failed.', scores: false },
    ],
  },
  {
    id: 'salesAsk',
    question: 'Sales wants a custom feature for one big deal. You:',
    answers: [
      { text: 'Pull them into a call and identify the pattern behind the request.', scores: true },
      { text: 'Move priorities to close the deal; the roadmap can be adjusted.', scores: false },
    ],
  },
  {
    id: 'writing',
    question: 'Important decisions:',
    answers: [
      { text: 'Does not matter where they are written down, as long as there is a paper trail.', scores: true },
      { text: 'Should be clarified thoroughly in central documentation.', scores: false },
    ],
  },
  {
    id: 'priorities',
    question: 'The team can handle:',
    answers: [
      { text: 'One thing at a time, done well.', scores: true },
      { text: 'Several bets running in parallel.', scores: false },
    ],
  },
  {
    id: 'research',
    question: 'User research:',
    answers: [
      { text: "Continuous, lightweight, and everyone's job.", scores: true },
      { text: 'A dedicated phase at the start of each cycle.', scores: false },
    ],
  },
  {
    id: 'ai',
    question: 'AI in the product:',
    answers: [
      { text: 'Ship it where it moves the needle.', scores: true },
      { text: 'Add it as much as possible.', scores: false },
    ],
  },
  {
    id: 'sayingNo',
    question: 'Saying no:',
    answers: [
      { text: 'The most important word in the job, when used thoughtfully.', scores: true },
      { text: 'A last resort; "yes" keeps doors open.', scores: false },
    ],
  },
  {
    id: 'aiProduct',
    question: 'A Product Manager should leverage AI to:',
    answers: [
      { text: 'Augment human judgment, surface opportunities, improve prototypes.', scores: true },
      { text: 'Produce communication pieces, create production-level content.', scores: false },
    ],
  },
  {
    id: 'feedback',
    question: 'Hard feedback is best given:',
    answers: [
      { text: 'Direct, early, and in private.', scores: true },
      { text: 'Carefully, documented, through the process.', scores: false },
    ],
  },
  {
    id: 'process',
    question: 'Processes in product should be:',
    answers: [
      { text: 'Enough to keep quality, and adapted to the team\'s needs, no more.', scores: true },
      { text: 'A strong set of guidelines that scales beyond people, and prevents chaos.', scores: false },
    ],
  },
  {
    id: 'strategy',
    question: 'Strategy is:',
    answers: [
      { text: 'A few hard choices, clearly communicated and dilligently made.', scores: true },
      { text: 'A horizon to aspire to, that will be validated along the way.', scores: false },
    ],
  },
  {
    id: 'remoteWork',
    question: 'Working fully remotely:',
    answers: [
      { text: 'Is a sign of a mature org, that promotes trust above control.', scores: true },
      { text: 'It is shown to result in lower productivity and hinders collaboration.', scores: false },
    ],
  },
  {
    id: 'success',
    question: 'Success means:',
    answers: [
      { text: 'Outcomes the user can feel.', scores: true },
      { text: 'Output the org can count on.', scores: false },
    ],
  },
];

/**
 * Score bands, ascending min. 0-9 fails quietly (no contact button, just the
 * way back); 10-16 and 17-20 both offer /contact next to the homepage link.
 */
export const tiers: QuizTier[] = [
  {
    min: 0,
    headline: 'Not going to work.',
    body: 'Twenty questions, and we landed on different sides of most of them. Better to find out here than in a kickoff call.',
    showContact: false,
    avatar: '/images/quiz/fail.webp',
  },
  {
    min: 10,
    headline: 'We might click.',
    body: 'We agree on the fundamentals and that might be the start of something. How about a first chat?',
    showContact: true,
    avatar: '/images/quiz/ok.webp',
  },
  {
    min: 17,
    headline: 'We need to talk.',
    body: 'You answered like someone I would enjoy building products with. Drop me a message, and let\'s chat!',
    showContact: true,
    avatar: '/images/quiz/great.webp',
  },
];

export function tierForScore(score: number): QuizTier {
  return tiers.filter((tier) => score >= tier.min).at(-1) ?? tiers[0];
}

/**
 * Shuffle the pool (Fisher-Yates), take `count`, and coin-flip which answer
 * sits on the left card. The rng is injectable so tests are deterministic.
 */
export function dealRun(
  pool: QuizQuestion[],
  count: number,
  rng: () => number = Math.random,
): DealtQuestion[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count).map((q) => {
    const [a, b] = q.answers;
    return rng() < 0.5
      ? { id: q.id, question: q.question, left: a, right: b }
      : { id: q.id, question: q.question, left: b, right: a };
  });
}

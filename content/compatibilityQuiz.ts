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
};

export const QUIZ_RUN_LENGTH = 20;

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'mondayFeature',
    question: 'A stakeholder asks for a feature by Monday. You:',
    answers: [
      { text: 'Ship a thin slice and learn from it', scores: true },
      { text: 'Commit to the full feature to avoid disappointment', scores: false },
    ],
  },
  {
    id: 'discovery',
    question: 'A new initiative lands on your desk. First move:',
    answers: [
      { text: 'Talk to five users before writing a ticket', scores: true },
      { text: 'Start from the data; users will bias you', scores: false },
    ],
  },
  {
    id: 'roadmap',
    question: 'A roadmap should be:',
    answers: [
      { text: 'A direction with room to change', scores: true },
      { text: 'A committed plan the org can rely on', scores: false },
    ],
  },
  {
    id: 'meetings',
    question: 'Meetings:',
    answers: [
      { text: 'Default to async; meet when it matters', scores: true },
      { text: 'Regular rituals keep everyone aligned', scores: false },
    ],
  },
  {
    id: 'specs',
    question: 'Before engineers build, they need:',
    answers: [
      { text: 'One page of problem and constraints', scores: true },
      { text: 'A complete spec covering every case', scores: false },
    ],
  },
  {
    id: 'dataIntuition',
    question: 'Data and judgment disagree. You:',
    answers: [
      { text: 'Let data inform, but judgment decides', scores: true },
      { text: 'Follow the data; feelings do not scale', scores: false },
    ],
  },
  {
    id: 'pushback',
    question: 'An engineer pushes back on your priority. You:',
    answers: [
      { text: 'Argue it out; the best reasoning wins', scores: true },
      { text: 'Pull rank; alignment beats debate', scores: false },
    ],
  },
  {
    id: 'shipping',
    question: 'The right release cadence:',
    answers: [
      { text: 'Small releases every week', scores: true },
      { text: 'Polished launches a few times a quarter', scores: false },
    ],
  },
  {
    id: 'okrs',
    question: 'OKRs are:',
    answers: [
      { text: 'A compass, not a contract', scores: true },
      { text: 'Commitments you hit or explain', scores: false },
    ],
  },
  {
    id: 'designRole',
    question: 'Designers on your team:',
    answers: [
      { text: 'Shape the problem with me', scores: true },
      { text: 'Execute the problem I define', scores: false },
    ],
  },
  {
    id: 'techDebt',
    question: 'Tech debt:',
    answers: [
      { text: 'A budget you defend every cycle', scores: true },
      { text: 'Something to fit in around features', scores: false },
    ],
  },
  {
    id: 'badLaunch',
    question: 'A launch goes badly. You:',
    answers: [
      { text: 'Own it, learn, move on', scores: true },
      { text: 'Analyse until we know exactly whose call failed', scores: false },
    ],
  },
  {
    id: 'salesAsk',
    question: 'Sales wants a custom feature for one deal. You:',
    answers: [
      { text: 'Find the pattern behind the ask', scores: true },
      { text: 'Close the deal; the roadmap absorbs it', scores: false },
    ],
  },
  {
    id: 'writing',
    question: 'Decisions:',
    answers: [
      { text: 'Get written down', scores: true },
      { text: 'Live in the meeting; docs go stale', scores: false },
    ],
  },
  {
    id: 'priorities',
    question: 'The team can handle:',
    answers: [
      { text: 'One thing at a time, done well', scores: true },
      { text: 'Several bets running in parallel', scores: false },
    ],
  },
  {
    id: 'research',
    question: 'User research:',
    answers: [
      { text: "Continuous, lightweight, everyone's job", scores: true },
      { text: 'A dedicated phase at the start of each project', scores: false },
    ],
  },
  {
    id: 'ai',
    question: 'AI in the product:',
    answers: [
      { text: 'Ship it where it removes real work', scores: true },
      { text: 'Add it where it demos well', scores: false },
    ],
  },
  {
    id: 'sayingNo',
    question: 'Saying no:',
    answers: [
      { text: 'The most important word in the job', scores: true },
      { text: 'A last resort; yes keeps doors open', scores: false },
    ],
  },
  {
    id: 'estimates',
    question: 'Estimates should be:',
    answers: [
      { text: 'Rough ranges with honest uncertainty', scores: true },
      { text: 'Dates the business can plan around', scores: false },
    ],
  },
  {
    id: 'feedback',
    question: 'Hard feedback is best given:',
    answers: [
      { text: 'Direct, early, in private', scores: true },
      { text: 'Carefully, documented, through the process', scores: false },
    ],
  },
  {
    id: 'process',
    question: 'Process:',
    answers: [
      { text: 'Enough to keep quality, no more', scores: true },
      { text: 'A strong process scales beyond people', scores: false },
    ],
  },
  {
    id: 'strategy',
    question: 'Strategy is:',
    answers: [
      { text: 'A few hard choices, clearly made', scores: true },
      { text: 'Covering every opportunity to hedge the risk', scores: false },
    ],
  },
  {
    id: 'disagreement',
    question: 'The team disagrees with your call. You:',
    answers: [
      { text: 'Disagree and commit, mine or theirs', scores: true },
      { text: 'Keep discussing until there is consensus', scores: false },
    ],
  },
  {
    id: 'success',
    question: 'Success means:',
    answers: [
      { text: 'Outcomes the user can feel', scores: true },
      { text: 'Output the org can count', scores: false },
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
    headline: 'We would not click.',
    body: 'Twenty questions, and we landed on different sides of most of them. Better to find out here than in a kickoff call.',
    showContact: false,
  },
  {
    min: 10,
    headline: 'We might click.',
    body: 'We agree on the fundamentals and differ on the rest, which is usually where the interesting conversations are.',
    showContact: true,
  },
  {
    min: 17,
    headline: 'We should talk.',
    body: 'You answered like someone I would enjoy building with. That is rarer than it should be.',
    showContact: true,
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

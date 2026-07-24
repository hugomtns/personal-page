import { describe, it, expect } from 'vitest';
import {
  quizQuestions,
  tiers,
  tierForScore,
  dealRun,
  QUIZ_RUN_LENGTH,
} from './compatibilityQuiz';

// Deterministic RNG so shuffle and side placement are reproducible in tests.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('quizQuestions', () => {
  it('has a pool of 24 questions', () => {
    expect(quizQuestions).toHaveLength(24);
  });

  it('gives every question a unique id', () => {
    const ids = quizQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(quizQuestions.length);
  });

  it('gives every question exactly two answers, exactly one of them scoring', () => {
    for (const q of quizQuestions) {
      expect(q.answers).toHaveLength(2);
      expect(q.answers.filter((a) => a.scores)).toHaveLength(1);
      expect(q.answers[0].text).not.toBe(q.answers[1].text);
    }
  });
});

describe('tierForScore', () => {
  it('fails scores of 0-9', () => {
    expect(tierForScore(0).showContact).toBe(false);
    expect(tierForScore(9).showContact).toBe(false);
  });

  it('puts 10-16 in the middle tier', () => {
    expect(tierForScore(10).headline).toBe(tiers[1].headline);
    expect(tierForScore(16).headline).toBe(tiers[1].headline);
  });

  it('puts 17-20 in the top tier', () => {
    expect(tierForScore(17).headline).toBe(tiers[2].headline);
    expect(tierForScore(20).headline).toBe(tiers[2].headline);
  });

  it('only the fail tier hides the contact button', () => {
    expect(tiers[0].showContact).toBe(false);
    expect(tiers[1].showContact).toBe(true);
    expect(tiers[2].showContact).toBe(true);
  });
});

describe('dealRun', () => {
  it('draws QUIZ_RUN_LENGTH unique questions from the pool', () => {
    const run = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(1));
    expect(run).toHaveLength(QUIZ_RUN_LENGTH);
    expect(new Set(run.map((q) => q.id)).size).toBe(QUIZ_RUN_LENGTH);
  });

  it('deals both answers of each question, one per side', () => {
    const run = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(2));
    for (const dealt of run) {
      const source = quizQuestions.find((q) => q.id === dealt.id)!;
      const texts = [dealt.left.text, dealt.right.text].sort();
      expect(texts).toEqual(source.answers.map((a) => a.text).sort());
    }
  });

  it('is deterministic for a given rng and differs across seeds', () => {
    const a = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(3));
    const b = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(3));
    const c = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(4));
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
    expect(a.map((q) => q.id)).not.toEqual(c.map((q) => q.id));
  });

  it('randomises which answer lands on the left card', () => {
    // Across seeds, at least one question must change sides: the scoring
    // answer cannot be learnable as "always on the left".
    const first = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(5));
    const second = dealRun(quizQuestions, QUIZ_RUN_LENGTH, mulberry32(6));
    const sidesOf = (run: typeof first) =>
      new Map(run.map((q) => [q.id, q.left.scores]));
    const a = sidesOf(first);
    const b = sidesOf(second);
    const shared = [...a.keys()].filter((id) => b.has(id));
    expect(shared.some((id) => a.get(id) !== b.get(id))).toBe(true);
  });
});

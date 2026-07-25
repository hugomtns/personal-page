import { describe, it, expect, vi, beforeEach } from 'vitest';

// redirect() throws in real Next.js — mirror that, like notFound() in
// app/unlaunched-routes.test.tsx, or a page that fails to redirect would
// "pass" by rendering its markup after the call.
const NEXT_REDIRECT = 'NEXT_REDIRECT';
vi.mock('next/navigation', () => ({
  redirect: vi.fn(() => {
    throw new Error(NEXT_REDIRECT);
  }),
}));

const headersMock = vi.hoisted(() => vi.fn());
vi.mock('next/headers', () => ({
  headers: headersMock,
}));

import QuizPage from './page';

const host = (value: string) => Promise.resolve({ get: () => value });

beforeEach(() => {
  vi.clearAllMocks();
});

// The canonical URL is the subdomain. The proxy covers visitors arriving via
// the subdomain; this redirect covers typing the route on the apex domain.
describe('quiz page canonical host', () => {
  it('redirects apex-domain visits to the quiz subdomain', async () => {
    headersMock.mockReturnValue(host('hugomartins.pm'));
    await expect(QuizPage()).rejects.toThrow(NEXT_REDIRECT);
  });

  it('serves the quiz on the quiz subdomain', async () => {
    headersMock.mockReturnValue(host('shouldiworkwith.hugomartins.pm'));
    await expect(QuizPage()).resolves.toBeTruthy();
  });
});

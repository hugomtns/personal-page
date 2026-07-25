import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { isRewrite, getRewrittenUrl } from 'next/experimental/testing/server';
import { proxy } from './proxy';

// NextRequest does not derive a host header from the URL in tests, so each
// request sets it explicitly — the header is what the proxy keys on.
const quizHost = { headers: { host: 'shouldiworkwith.hugomartins.pm' } };
const apexHost = { headers: { host: 'hugomartins.pm' } };

// The whole subdomain is a single-page experience: every path on it serves
// the quiz, and the address bar keeps the clean subdomain URL.
describe('proxy subdomain rewrite', () => {
  it('rewrites the quiz subdomain root to the quiz route', async () => {
    const request = new NextRequest(
      'https://shouldiworkwith.hugomartins.pm/',
      quizHost,
    );
    const response = await proxy(request);
    expect(isRewrite(response)).toBe(true);
    expect(getRewrittenUrl(response)).toBe(
      'https://shouldiworkwith.hugomartins.pm/should-i-work-with',
    );
  });

  it('rewrites any path on the quiz subdomain to the quiz route', async () => {
    const request = new NextRequest(
      'https://shouldiworkwith.hugomartins.pm/anything/at/all',
      quizHost,
    );
    const response = await proxy(request);
    expect(isRewrite(response)).toBe(true);
    expect(getRewrittenUrl(response)).toBe(
      'https://shouldiworkwith.hugomartins.pm/should-i-work-with',
    );
  });

  it('leaves the apex domain alone', async () => {
    const request = new NextRequest('https://hugomartins.pm/', apexHost);
    const response = await proxy(request);
    expect(isRewrite(response)).toBe(false);
  });

  it('leaves the quiz route on the apex domain alone (the page itself redirects)', async () => {
    const request = new NextRequest(
      'https://hugomartins.pm/should-i-work-with',
      apexHost,
    );
    const response = await proxy(request);
    expect(isRewrite(response)).toBe(false);
  });
});

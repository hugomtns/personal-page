import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// shouldiworkwith.hugomartins.pm is the compatibility quiz and nothing else.
// Rather than teaching every route about the subdomain, the proxy rewrites
// the whole host to the one quiz route; the address bar keeps the clean URL.
// The matcher keeps static assets and the contact API off this code path.
const QUIZ_HOST_PREFIX = 'shouldiworkwith.';
const QUIZ_PATH = '/should-i-work-with';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  if (!host.startsWith(QUIZ_HOST_PREFIX)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = QUIZ_PATH;
  return NextResponse.rewrite(url);
}

// The matcher must keep four things off the rewrite path, or the quiz host
// serves quiz HTML where it does not belong: `api/` (the contact form posts
// there; note the trailing slash, a bare `api` would also exclude any first
// segment starting with those letters), `_vercel` (analytics and
// speed-insights inject root-relative /_vercel/* scripts; rewriting them to
// HTML is the "Unexpected token '<'" pageerror), `icon` (the favicon route),
// and `images` (the quiz avatar photos under public/images/). This config is
// not covered by proxy.test.ts, which calls proxy() directly — this comment
// is the guard.
export const config = {
  matcher: '/((?!api/|_next/static|_next/image|_vercel|icon|images|favicon.ico).*)',
};

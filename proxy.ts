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

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

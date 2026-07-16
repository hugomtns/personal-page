import { describe, it, expect, vi, beforeEach } from 'vitest';

// notFound() throws in real Next.js — that is how it unwinds out of a Server
// Component. Mirror that, or a page that fails to hide would "pass" by simply
// returning its markup after the call.
const NOT_FOUND = 'NEXT_NOT_FOUND';
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error(NOT_FOUND);
  }),
}));

// vi.hoisted, because vi.mock is lifted above every top-level const — a plain
// `const isLiveMock = vi.fn()` is still in the temporal dead zone when the
// factory below runs.
const isLiveMock = vi.hoisted(() => vi.fn());
vi.mock('@/content/site', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/site')>();
  return { ...actual, isLive: isLiveMock };
});

import CVPage from './cv/page';
import ProjectsPage from './projects/page';

beforeEach(() => {
  vi.clearAllMocks();
});

// A tab with live: false is hidden from the nav, dropped from the sitemap and
// marked noindex — but none of that stops anyone who simply types the URL.
// "Not linked" is not "not public", and this page holds a full CV. Until the
// tab ships it must genuinely not resolve.
describe('routes that have not launched', () => {
  it('serves the CV page once it is live', () => {
    isLiveMock.mockReturnValue(true);
    expect(() => CVPage()).not.toThrow();
  });

  it('404s the CV page while it is not live', () => {
    isLiveMock.mockReturnValue(false);
    expect(() => CVPage()).toThrow(NOT_FOUND);
  });

  it('gates the CV page on its own tab, not on some other tab', () => {
    isLiveMock.mockReturnValue(false);
    expect(() => CVPage()).toThrow();
    expect(isLiveMock).toHaveBeenCalledWith('/cv');
  });

  it('serves the Projects page once it is live', () => {
    isLiveMock.mockReturnValue(true);
    expect(() => ProjectsPage()).not.toThrow();
  });

  it('404s the Projects page while it is not live', () => {
    isLiveMock.mockReturnValue(false);
    expect(() => ProjectsPage()).toThrow(NOT_FOUND);
  });

  it('gates the Projects page on its own tab', () => {
    isLiveMock.mockReturnValue(false);
    expect(() => ProjectsPage()).toThrow();
    expect(isLiveMock).toHaveBeenCalledWith('/projects');
  });
});

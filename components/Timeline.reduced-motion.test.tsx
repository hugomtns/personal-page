import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// motion-dom's prefers-reduced-motion state is a module-level singleton,
// initialised once (lazily, on first useReducedMotion() call) per JS realm
// — see node_modules/motion-dom/dist/es/render/utils/reduced-motion/*.
// It must be mocked *before* Timeline's first render in a file of its own,
// otherwise it would pick up whatever an earlier test in the same file
// already initialised. (See components/Hero.reduced-motion.test.tsx.)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

import Timeline from './Timeline';

// This is the single most dangerous failure mode for the timeline: a
// reduced-motion visitor must land on the FINISHED state immediately for
// every role — fully visible — never a CV stuck at opacity: 0.
//
// The subtle part, and the one that shipped broken: it is NOT enough for
// Motion to decline to animate. The server cannot read a motion preference,
// so it renders the pre-animation state (opacity: 0) straight into the HTML.
// If the client then hands Motion no props, that opacity: 0 is never undone
// and four of the five roles stay invisible — on the page a recruiter is most
// likely to actually read. So the assertion here is deliberately that Motion
// *does* write the visible state, without waiting for a scroll or an
// IntersectionObserver that a reduced-motion visitor may never trigger.
describe('Timeline with prefers-reduced-motion: reduce', () => {
  it('asserts the finished, visible state for every role instead of leaving the server-rendered opacity: 0 in place', () => {
    const { container } = render(<Timeline />);

    const companies = ['PVcase', 'Staffbase', 'Medwing', 'Helpling', 'ResearchGate'];

    for (const company of companies) {
      const el = screen.getByText(company);
      // toBeVisible() fails if computed opacity is 0, display is none,
      // visibility is hidden, etc. — this is the actual "is it readable" check.
      expect(el).toBeVisible();
    }

    const root = container.firstElementChild as HTMLElement;
    expect(root).not.toBeNull();
    const wrappers = Array.from(root.children) as HTMLElement[];
    expect(wrappers).toHaveLength(companies.length);

    // The load-bearing one: an explicit opacity: 1 is what overwrites what the
    // server put there. An empty string means Motion left the DOM untouched —
    // which is exactly how these roles went invisible in a real browser while
    // this test was passing. No scroll happens here, and the stubbed
    // IntersectionObserver never fires, so this can only pass if the visible
    // state is applied up front.
    for (const wrapper of wrappers) {
      expect(wrapper.style.opacity).toBe('1');
    }
  });
});

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
// every role — fully visible — never a CV stuck at opacity: 0. The
// scroll-reveal animation is skipped entirely, not merely sped up.
describe('Timeline with prefers-reduced-motion: reduce', () => {
  it('renders every role fully visible with no opacity/transform applied, without any scroll or IntersectionObserver firing', () => {
    const { container } = render(<Timeline />);

    const companies = ['PVcase', 'Staffbase', 'Medwing', 'Helpling', 'ResearchGate'];

    for (const company of companies) {
      const el = screen.getByText(company);
      // toBeVisible() fails if computed opacity is 0, display is none,
      // visibility is hidden, etc. — this is the actual "is it readable" check.
      expect(el).toBeVisible();
    }

    // Belt-and-braces: confirm motion did not write initial/whileInView
    // inline styles on the wrapping motion.div at all (whileInView === {}
    // when reduce is true), rather than merely landing on opacity: 1 after
    // an animation/observer tick that a stubbed IntersectionObserver never fires.
    const root = container.firstElementChild as HTMLElement;
    expect(root).not.toBeNull();
    const wrappers = Array.from(root.children) as HTMLElement[];
    expect(wrappers).toHaveLength(companies.length);
    for (const wrapper of wrappers) {
      expect(wrapper.style.opacity).toBe('');
      expect(wrapper.style.transform).toBe('');
    }
  });
});

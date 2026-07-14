import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { nav } from '@/content/site';

describe('sitemap', () => {
  it("lists the homepage, absolute-URL'd", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain('https://hugomartins.pm');
  });

  it('lists every live tab', () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const tab of nav.filter((t) => t.live)) {
      expect(urls).toContain(`https://hugomartins.pm${tab.href}`);
    }
  });

  it('never advertises a tab that is still hidden', () => {
    const urls = sitemap().map((entry) => entry.url);
    const hidden = nav.filter((t) => !t.live);

    // Guards the reason the flag exists: a half-built page that Google has
    // indexed is worse than no page. If this fires, a tab was hidden from the
    // nav but left in the sitemap — the worst of both.
    for (const tab of hidden) {
      expect(urls).not.toContain(`https://hugomartins.pm${tab.href}`);
    }
  });
});

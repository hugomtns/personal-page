import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists the homepage and the CV, absolute-URL\'d', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain('https://hugomartins.pm');
    expect(urls).toContain('https://hugomartins.pm/cv');
  });
});

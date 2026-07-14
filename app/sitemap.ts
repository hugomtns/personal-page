import type { MetadataRoute } from 'next';
import { site, liveNav } from '@/content/site';

// Only what is actually finished. A tab that is still hidden from the nav must
// not be advertised to Google — the page exists so it can be previewed, not
// so it can be indexed half-built.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...liveNav().map((tab) => ({
      url: `${site.url}${tab.href}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}

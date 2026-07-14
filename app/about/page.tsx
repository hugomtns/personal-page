import type { Metadata } from 'next';
import Portrait from '@/components/Portrait';
import { body } from '@/content/about';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description:
    'Product manager in Berlin. Eleven years building software products, mostly in B2B SaaS.',
  robots: isLive('/about') ? undefined : { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-16 text-[length:var(--text-h1)]">About</h1>

      <div className="grid gap-12 md:grid-cols-[24rem_1fr] md:gap-16">
        <div className="md:sticky md:top-32 md:self-start">
          <Portrait />
        </div>

        <div className="grid max-w-2xl gap-6 text-[length:var(--text-body)] leading-relaxed">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

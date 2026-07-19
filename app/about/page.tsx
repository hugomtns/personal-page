import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Portrait from '@/components/Portrait';
import { body } from '@/content/about';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: site.description,
  robots: isLive('/about') ? undefined : { index: false, follow: false },
};

export default function AboutPage() {
  // Symmetric with CV and Projects: a gated tab must genuinely not resolve,
  // not merely be unadvertised.
  if (!isLive('/about')) notFound();

  return (
    <PageShell title="About">
      <div className="grid gap-12 md:grid-cols-[24rem_1fr] md:gap-16">
        <div className="md:sticky md:top-32 md:self-start">
          <Portrait />
        </div>

        <div className="grid max-w-2xl gap-6 text-body leading-relaxed">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import PageShell from '@/components/PageShell';
import AboutFlip from '@/components/AboutFlip';
import ScrollProgress from '@/components/ScrollProgress';
import { body, personal } from '@/content/about';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: site.description,
  robots: isLive('/about') ? undefined : { index: false, follow: false },
};

const PERSONAL_PHOTO = 'hugo-martins-personal.jpg';

export default function AboutPage() {
  // Symmetric with CV and Projects: a gated tab must genuinely not resolve,
  // not merely be unadvertised.
  if (!isLive('/about')) notFound();

  // Server side, so the check costs nothing: the flip's back face only points
  // at the personal photo if it actually exists in public/.
  const personalSrc = existsSync(join(process.cwd(), 'public', PERSONAL_PHOTO))
    ? `/${PERSONAL_PHOTO}`
    : null;

  return (
    <>
      <ScrollProgress />
      <PageShell title="About">
      <div className="grid gap-12 md:grid-cols-[24rem_1fr] md:gap-16">
        <AboutFlip
          portraitSrc="/hugo-martins.jpg"
          personalSrc={personalSrc}
          professional={body}
          personal={personal}
          links={[
            {
              match: 'Bacalhau com Natas',
              href: 'https://wetravelportugal.com/bacalhau-com-natas/',
            },
          ]}
        />
      </div>
    </PageShell>
    </>
  );
}

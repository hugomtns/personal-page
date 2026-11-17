import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutFlip from '@/components/AboutFlip';
import ScrollProgress from '@/components/ScrollProgress';
import { body, personal } from '@/content/about';
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
    <>
      <ScrollProgress />
      <AboutFlip
        professional={body}
        personal={personal}
        links={[
          {
            match: 'Bacalhau com Natas',
            href: 'https://wetravelportugal.com/bacalhau-com-natas/',
          },
        ]}
      />
    </>
  );
}

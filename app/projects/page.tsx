import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import ProjectGarden from '@/components/ProjectGarden';
import { comingSoon } from '@/content/projects';
import { isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things Hugo Martins built for the fun of it.',
  robots: isLive('/projects') ? undefined : { index: false, follow: false },
};

export default function ProjectsPage() {
  // noindex and a hidden nav link only stop people who were never going to type
  // the URL. Until the garden ships it must genuinely not resolve, not merely
  // be unadvertised.
  if (!isLive('/projects')) notFound();

  // The tab is live but the garden is not: show the teaser and keep the
  // garden code and data parked behind the comingSoon flag.
  if (comingSoon) {
    return (
      <PageShell title="Projects">
        <p className="label mb-4">Coming soon</p>
        <p className="max-w-xl text-muted">
          Side projects and hobbies, built for the fun of it. A few of them
          will live here soon.
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell title="Projects">
      <ProjectGarden />
    </PageShell>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import ProjectGarden from '@/components/ProjectGarden';
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

  return (
    <PageShell title="Projects">
      <ProjectGarden />
    </PageShell>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectGarden from '@/components/ProjectGarden';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: 'Things Hugo Martins built for the fun of it.',
  robots: isLive('/projects') ? undefined : { index: false, follow: false },
};

export default function ProjectsPage() {
  // noindex and a hidden nav link only stop people who were never going to type
  // the URL. Until the garden ships it must genuinely not resolve, not merely
  // be unadvertised.
  if (!isLive('/projects')) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-16 text-[length:var(--text-h1)]">Projects</h1>
      <ProjectGarden />
    </div>
  );
}

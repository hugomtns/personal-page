import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import ProjectGarden from '@/components/ProjectGarden';
import { comingSoon, projects } from '@/content/projects';
import { isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects and product prototypes by Hugo Martins.',
  robots: isLive('/projects') ? undefined : { index: false, follow: false },
};

export default function ProjectsPage() {
  if (!isLive('/projects')) notFound();

  if (comingSoon) {
    return (
      <PageShell title="Projects">
        <p className="label mb-4">Coming soon</p>
        <p className="max-w-xl text-muted">
          Side projects and prototypes, from discovery and user research work
          to things built for the fun of it. A few of them will live here
          soon.
        </p>
      </PageShell>
    );
  }

  const workProjects = projects.filter((p) => p.group === 'work');
  const playProjects = projects.filter((p) => p.group === 'play');

  return (
    <PageShell title="Projects">
      <section className="mb-12">
        <h2 className="font-display text-h1">Work</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Product prototypes and domain tools, mostly in the solar and B2B space.
        </p>
        <div className="mt-6">
          <ProjectGarden projects={workProjects} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-h1">Play</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Games, tools, and experiments built for the fun of it.
        </p>
        <div className="mt-6">
          <ProjectGarden projects={playProjects} />
        </div>
      </section>
    </PageShell>
  );
}

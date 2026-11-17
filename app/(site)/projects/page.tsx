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

  const workProjects = projects.filter((p) => p.group === 'work');
  const playProjects = projects.filter((p) => p.group === 'play');

  return (
    <PageShell title="Projects" command="projects">
      <div className="terminal-projects">
        {comingSoon ? (
          <section>
            <h2 className="terminal-projects__heading">Coming soon</h2>
            <p className="max-w-xl text-muted">
              Side projects and prototypes, from discovery and user research work
              to things built for the fun of it. A few of them will live here
              soon.
            </p>
          </section>
        ) : (
          <>
            <section>
              <h2 className="terminal-projects__heading terminal-projects__heading--section">Work</h2>
              <p className="terminal-projects__intro">
                Product prototypes and domain tools, mostly in the solar and B2B space.
              </p>
              <ProjectGarden projects={workProjects} />
            </section>
            <section>
              <h2 className="terminal-projects__heading terminal-projects__heading--section">Play</h2>
              <p className="terminal-projects__intro">
                Games, tools, and experiments built for the fun of it.
              </p>
              <ProjectGarden projects={playProjects} />
            </section>
          </>
        )}
      </div>
    </PageShell>
  );
}

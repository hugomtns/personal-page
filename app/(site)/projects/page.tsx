import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import ProjectGarden from '@/components/ProjectGarden';
import { comingSoon, projects } from '@/content/projects';
import { isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects, product prototypes, and Stellaris mods by Hugo Martins.',
  robots: isLive('/projects') ? undefined : { index: false, follow: false },
};

const categories = [
  {
    id: 'work',
    title: 'Work',
    intro: 'Product prototypes and domain tools, mostly in the solar and B2B space.',
  },
  {
    id: 'play',
    title: 'Play',
    intro: 'Games, tools, and experiments built for the fun of it.',
  },
  {
    id: 'stellaris-mods',
    title: 'Stellaris Mods',
    intro: 'Modifications I built for one of my favourite videogames, Stellaris.',
  },
] as const;

export default function ProjectsPage() {
  if (!isLive('/projects')) notFound();

  const navigation = !comingSoon && (
    <nav className="terminal-projects__navigation" aria-label="Project categories">
      <ul>
        {categories.map(({ id, title }, index) => (
          <li key={id}>
            {index > 0 && <span aria-hidden="true">/</span>}
            <a href={`#${id}`}>{title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <PageShell title="Projects" command="projects" stickyHeading={!comingSoon} headingNavigation={navigation}>
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
          categories.map(({ id, title, intro }) => (
            <section key={id} aria-labelledby={id}>
              <h2 id={id} tabIndex={-1} className="terminal-projects__heading terminal-projects__heading--section">
                {title}
              </h2>
              <p className="terminal-projects__intro">{intro}</p>
              <ProjectGarden projects={projects.filter((project) => project.group === id)} />
            </section>
          ))
        )}
      </div>
    </PageShell>
  );
}

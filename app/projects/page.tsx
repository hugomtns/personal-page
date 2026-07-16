import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: 'Prototypes built by Hugo Martins.',
  robots: isLive('/projects') ? undefined : { index: false, follow: false },
};

export default function ProjectsPage() {
  // An unfinished page saying "this is unfinished" is still an unfinished page
  // on a portfolio. Until it has something on it, it does not resolve.
  if (!isLive('/projects')) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-16 text-[length:var(--text-h1)]">Projects</h1>

      <p className="max-w-2xl text-[length:var(--text-h2)] leading-snug text-muted">
        The gallery is being put together — the prototypes exist, the screenshots
        do not yet.
      </p>
    </div>
  );
}

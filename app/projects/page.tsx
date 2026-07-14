import type { Metadata } from 'next';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: 'Prototypes built by Hugo Martins.',
  robots: isLive('/projects') ? undefined : { index: false, follow: false },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-16 text-[length:var(--text-h1)]">Projects</h1>

      <p className="max-w-2xl text-[length:var(--text-h2)] leading-snug text-muted">
        The gallery is being put together — the prototypes exist, the screenshots
        do not yet.
      </p>

      <p className="mt-6 max-w-2xl text-muted">
        This page is not linked from the nav and is marked noindex until it has
        something on it.
      </p>
    </div>
  );
}

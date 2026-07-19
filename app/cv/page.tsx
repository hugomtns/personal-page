import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CVTimeline from '@/components/CVTimeline';
import { education, certifications } from '@/content/cvTimeline';
import { isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Eleven years of product management across B2B SaaS, healthtech and marketplaces.',
  robots: isLive('/cv') ? undefined : { index: false, follow: false },
};

export default function CVPage() {
  // noindex and a hidden nav link only stop people who were never going to type
  // the URL. This page is a full CV — until the tab ships it must genuinely not
  // resolve, not merely be unadvertised.
  if (!isLive('/cv')) notFound();

  return (
    // No PDF download. The CV is handed over deliberately, not scraped off
    // a page by anyone who finds it.
    <PageShell title="Curriculum Vitae">
      <section className="mb-20">
        <h2 className="label mb-10">Experience</h2>
        <CVTimeline />
      </section>

      <section className="mb-20">
        <h2 className="label mb-10">Education</h2>
        <dl className="grid gap-6">
          {education.map((e) => (
            <div
              key={e.degree}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-border pb-4"
            >
              <dt className="font-display text-h2">{e.degree}</dt>
              <dd className="label justify-self-end whitespace-nowrap">{e.years}</dd>
              <dd className="text-small text-muted">{e.institution}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="label mb-10">Certifications</h2>
        <dl className="grid gap-6">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-border pb-4"
            >
              <dt className="font-display text-h2">{c.name}</dt>
              <dd className="label justify-self-end whitespace-nowrap">{c.date}</dd>
              <dd className="text-small text-muted">{c.issuer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}

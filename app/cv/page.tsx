import type { Metadata } from 'next';
import Timeline from '@/components/Timeline';
import { education, certifications } from '@/content/cv';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'CV — Hugo Martins',
  description:
    'Eleven years of product management across B2B SaaS, healthtech and marketplaces.',
};

export default function CVPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <h1 className="text-[length:var(--text-h1)]">Curriculum Vitae</h1>
        <a
          href={site.cvPdfPath}
          download
          className="-mt-3.5 inline-flex border-b border-accent pb-1 pt-3.5 text-accent"
        >
          Download PDF
        </a>
      </div>

      <section className="mb-20">
        <h2 className="label mb-10">Experience</h2>
        <Timeline />
      </section>

      <section className="mb-20">
        <h2 className="label mb-10">Education</h2>
        <dl className="grid gap-6">
          {education.map((e) => (
            <div
              key={e.degree}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-border pb-4"
            >
              <dt className="font-display text-[length:var(--text-h2)]">{e.degree}</dt>
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
              <dt className="font-display text-[length:var(--text-h2)]">{c.name}</dt>
              <dd className="label justify-self-end whitespace-nowrap">{c.date}</dd>
              <dd className="text-small text-muted">{c.issuer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

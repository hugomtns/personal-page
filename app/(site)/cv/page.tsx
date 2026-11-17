import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CVTimeline from '@/components/CVTimeline';
import ScrollProgress from '@/components/ScrollProgress';
import { education, certifications } from '@/content/cvTimeline';
import { isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Experienced product leader: twelve years shipping B2B SaaS, analytics and data products, including ML recommendations and generative AI.',
  robots: isLive('/cv') ? undefined : { index: false, follow: false },
};

const credentials = [
  {
    title: 'Certifications',
    entries: certifications.map(({ name, issuer, date }) => ({ name, detail: issuer, date })),
  },
  {
    title: 'Education',
    entries: education.map(({ degree, institution, years }) => ({ name: degree, detail: institution, date: years })),
  },
];

export default function CVPage() {
  // noindex and a hidden nav link only stop people who were never going to type
  // the URL. This page is a full CV — until the tab ships it must genuinely not
  // resolve, not merely be unadvertised.
  if (!isLive('/cv')) notFound();

  return (
    // No PDF download. The CV is handed over deliberately, not scraped off
    // a page by anyone who finds it.
    <>
      <ScrollProgress />
      <PageShell title="Curriculum Vitae" terminal>
        <div className="terminal-cv">
          <section>
            <h2 className="terminal-cv__heading">Experience</h2>
            <CVTimeline />
          </section>

          {credentials.map(({ title, entries }) => (
            <section key={title}>
              <h2 className="terminal-cv__heading">{title}</h2>
              <dl className="terminal-cv__credentials">
                {entries.map(({ name, detail, date }) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd className="terminal-cv__dates">{date}</dd>
                    <dd className="terminal-cv__summary">{detail}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </PageShell>
    </>
  );
}

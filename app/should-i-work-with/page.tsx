import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Should you work with Hugo?',
  description:
    'A twenty-question compatibility test about product-management working styles. Swipe your answers, get a verdict.',
};

const QUIZ_ORIGIN = 'https://shouldiworkwith.hugomartins.pm';

export default async function QuizPage() {
  // The subdomain is the canonical URL. The proxy rewrites the subdomain to
  // this route; anyone reaching the route on the apex domain gets sent to
  // the canonical URL instead of getting a second address for the same page.
  const host = (await headers()).get('host') ?? '';
  if (!host.startsWith('shouldiworkwith.')) redirect(QUIZ_ORIGIN);

  // Placeholder until components/CompatibilityGame lands.
  return <p>Quiz goes here.</p>;
}

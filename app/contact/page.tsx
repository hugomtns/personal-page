import type { Metadata } from 'next';
import BookingEmbed from '@/components/BookingEmbed';
import ContactForm from '@/components/ContactForm';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: 'Book a call with Hugo Martins, or send a message.',
  robots: isLive('/contact') ? undefined : { index: false, follow: false },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-16 text-[length:var(--text-h1)]">Contact</h1>

      <BookingEmbed />

      <section className="mt-24">
        <h2 className="label mb-10">Or send a message</h2>
        <ContactForm />
      </section>
    </div>
  );
}

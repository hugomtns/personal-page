import type { Metadata } from 'next';
import BookingButton from '@/components/BookingButton';
import ContactForm from '@/components/ContactForm';
import { site, isLive } from '@/content/site';

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: 'Book a call with Hugo Martins, send a message, or both.',
  robots: isLive('/contact') ? undefined : { index: false, follow: false },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-[length:var(--text-h1)]">Contact</h1>

      <p className="mt-6 max-w-xl text-[length:var(--text-h2)] leading-snug text-muted">
        Two ways to reach me. Take either, or both.
      </p>

      {/* Side by side from `sm` up, so they read as two offers of equal weight.
          They used to be stacked under "Book a call" and "Or send a message",
          which made the message the consolation prize for people unwilling to
          put a call in the diary — and implied you had to pick one. */}
      <div className="mt-20 grid gap-16 sm:grid-cols-2 sm:gap-12">
        <section>
          <h2 className="label mb-6">Book a call</h2>
          <BookingButton />
        </section>

        <section>
          <h2 className="label mb-6">Send a message</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import BookingButton from '@/components/BookingButton';
import ContactForm from '@/components/ContactForm';
import { isLive } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a call with Hugo Martins, send a message, or both.',
  robots: isLive('/contact') ? undefined : { index: false, follow: false },
};

export default function ContactPage() {
  // Symmetric with CV and Projects: a gated tab must genuinely not resolve,
  // not merely be unadvertised.
  if (!isLive('/contact')) notFound();

  return (
    <PageShell title="Contact" command="contact">
      <div className="terminal-contact">
        <section>
          <h2 className="terminal-contact__heading">Send a message</h2>
          <ContactForm />
        </section>

        <section>
          <h2 className="terminal-contact__heading">Book a call</h2>
          <BookingButton />
        </section>
      </div>
    </PageShell>
  );
}

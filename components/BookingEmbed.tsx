import { site } from '@/content/site';

export default function BookingEmbed() {
  return (
    <section id="book" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="label mb-10">Book a call</h2>

      <p className="mb-8 max-w-2xl text-[length:var(--text-h2)] leading-snug">
        Hiring, advising, or just want to compare notes on AI product work —
        grab a slot.
      </p>

      <div className="overflow-hidden rounded-lg border border-border">
        <iframe
          src={site.bookingUrl}
          title="Book a call with Hugo Martins"
          className="h-[600px] w-full"
          loading="lazy"
        />
      </div>

      <p className="mt-4 text-small text-muted">
        Not loading?{' '}
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          Open the booking page
        </a>
        .
      </p>
    </section>
  );
}

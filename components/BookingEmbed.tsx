'use client';

import { useState } from 'react';
import { site } from '@/content/site';

export default function BookingEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="book" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="label mb-10">Book a call</h2>

      <p className="mb-8 max-w-2xl text-[length:var(--text-h2)] leading-snug">
        Hiring, advising, or just want to compare notes on AI product work —
        grab a slot.
      </p>

      {/* Click-to-load. Google's calendar sets a third-party cookie the moment
          its iframe mounts, so it must not mount until someone asks for it.
          This is what keeps the site free of a consent banner. */}
      {loaded ? (
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            src={site.bookingUrl}
            title="Book a call with Hugo Martins"
            className="h-[600px] w-full"
          />
        </div>
      ) : (
        <div className="grid place-items-center rounded-lg border border-border px-6 py-20 text-center">
          <p className="max-w-sm text-small text-muted">
            Booking runs on Google Calendar. Loading it sets a Google cookie, so
            it stays off until you say so.
          </p>

          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="mt-6 border-b border-accent pb-1 text-accent transition-opacity hover:opacity-70"
          >
            Load booking calendar
          </button>
        </div>
      )}

      <p className="mt-4 text-small text-muted">
        Prefer not to?{' '}
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          Open the booking page in a new tab
        </a>
        .
      </p>
    </section>
  );
}

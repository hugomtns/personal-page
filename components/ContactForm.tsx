'use client';

import { useState } from 'react';
import { contactSchema } from '@/lib/contact-schema';

type State = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setState('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error('Request failed');
      setState('sent');
    } catch {
      setState('error');
      setError('Something went wrong. Try the booking link instead.');
    }
  }

  if (state === 'sent') {
    return (
      <p role="status" className="text-[length:var(--text-h2)] leading-snug">
        Thank you — I&apos;ll come back to you shortly.
      </p>
    );
  }

  const field =
    'w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-accent';

  return (
    <form onSubmit={onSubmit} noValidate className="grid max-w-xl gap-6">
      <div>
        <label htmlFor="name" className="label mb-2 block">Name</label>
        <input id="name" name="name" type="text" required className={field} />
      </div>

      <div>
        <label htmlFor="email" className="label mb-2 block">Email</label>
        <input id="email" name="email" type="email" required className={field} />
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block">Message</label>
        <textarea id="message" name="message" rows={4} required className={field} />
      </div>

      {/* Honeypot. Hidden from humans; bots fill it and are silently dropped. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="text-small text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="justify-self-start border-b border-accent pb-1 text-accent disabled:opacity-50"
      >
        {state === 'sending' ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}

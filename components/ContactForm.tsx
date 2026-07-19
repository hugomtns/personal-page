'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from './Button';
import { contactSchema } from '@/lib/contact-schema';

type State = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
      setError('Something went wrong. Try booking a call instead.');
    }
  }

  if (state === 'sent') {
    return (
      <p role="status" className="text-h2 leading-snug">
        Thank you. I&apos;ll come back to you shortly.
      </p>
    );
  }

  // The underline is the field. A box would be the only hard-edged rectangle on
  // a site built from hairlines and space, and `bg-transparent` keeps it that
  // way in both themes. py-3 plus the label puts every target over 44px without
  // a box to measure.
  const field =
    'w-full border-b border-border bg-transparent py-3 outline-none transition-colors duration-180 hover:border-muted focus:border-accent';

  return (
    <form onSubmit={onSubmit} noValidate className="grid w-full gap-7">
      <div>
        <label htmlFor="name" className="label mb-1 block">
          Name
        </label>
        <input id="name" name="name" type="text" required className={field} />
      </div>

      <div>
        <label htmlFor="email" className="label mb-1 block">
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} />
      </div>

      <div>
        <label htmlFor="message" className="label mb-1 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot. Hidden from humans; bots fill it and are silently dropped. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="-mt-2 text-small text-accent">
          {error}
        </p>
      )}

      <Button type="submit" disabled={state === 'sending'} className="justify-self-start">
        {state === 'sending' ? 'Sending…' : 'Send'}
      </Button>
    </form>
  );
}

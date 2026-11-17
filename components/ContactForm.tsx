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
      <p role="status" className="terminal-contact__feedback">
        Thank you. I&apos;ll come back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid w-full gap-5">
      <div>
        <label htmlFor="name" className="terminal-contact__label">
          Name
        </label>
        <input id="name" name="name" type="text" required className="terminal-contact__field" />
      </div>

      <div>
        <label htmlFor="email" className="terminal-contact__label">
          Email
        </label>
        <input id="email" name="email" type="email" required className="terminal-contact__field" />
      </div>

      <div>
        <label htmlFor="message" className="terminal-contact__label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="terminal-contact__field resize-y"
        />
      </div>

      {/* Honeypot. Hidden from humans; bots fill it and are silently dropped. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="terminal-contact__feedback">
          {error}
        </p>
      )}

      <Button type="submit" disabled={state === 'sending'} className="justify-self-start">
        <span aria-hidden="true">&gt;</span>
        {state === 'sending' ? 'Sending…' : 'Send'}
      </Button>
    </form>
  );
}

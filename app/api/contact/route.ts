import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (err) {
    console.error('Contact form: request body was not valid JSON.', err);
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped: a bot filled a field no human can see.
  // Return 200 so the bot believes it succeeded and does not retry.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // Guard explicitly rather than let a missing var surface as a confusing
  // Resend error — every legitimate submission would otherwise be lost.
  if (!apiKey || !to) {
    console.error('Contact form misconfigured: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.');
    return NextResponse.json({ error: 'Could not send.' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Portfolio <contact@hugomartins.pm>',
      to,
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error('Resend failed:', error);
      return NextResponse.json({ error: 'Could not send.' }, { status: 500 });
    }
  } catch (err) {
    console.error('Resend threw unexpectedly:', err);
    return NextResponse.json({ error: 'Could not send.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

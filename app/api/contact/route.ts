import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped: a bot filled a field no human can see.
  // Return 200 so the bot believes it succeeded and does not retry.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'Portfolio <contact@hugomartins.pm>',
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    text: `${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error('Resend failed:', error);
    return NextResponse.json({ error: 'Could not send.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

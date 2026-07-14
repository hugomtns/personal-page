import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const sendMock = vi.fn();

vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(function MockResend() {
      return { emails: { send: sendMock } };
    }),
  };
});

// Import after the mock so the route picks up the mocked module.
import { Resend } from 'resend';
import { POST } from './route';

const ORIGINAL_ENV = { ...process.env };

function makeRequest(body: string) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
  });
}

const validPayload = {
  name: 'Jane Recruiter',
  email: 'jane@example.com',
  message: 'We have a Head of Product role that fits you.',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    vi.mocked(Resend).mockClear();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.CONTACT_TO_EMAIL = 'me@example.com';
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns 400 for a malformed JSON body instead of throwing', async () => {
    const response = await POST(makeRequest('not-json-at-all{'));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid submission.' });
  });

  it('returns 400 for an empty body', async () => {
    const response = await POST(makeRequest(''));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid submission.' });
  });

  it('returns 400 for a schema-invalid body', async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ name: 'x', email: 'not-an-email', message: 'short' }))
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid submission.' });
  });

  it('returns a clean 500 when RESEND_API_KEY is missing, without throwing', async () => {
    delete process.env.RESEND_API_KEY;

    const response = await POST(makeRequest(JSON.stringify(validPayload)));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Could not send.' });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('returns a clean 500 when CONTACT_TO_EMAIL is missing, without throwing', async () => {
    delete process.env.CONTACT_TO_EMAIL;

    const response = await POST(makeRequest(JSON.stringify(validPayload)));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Could not send.' });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('honeypot: returns 200 and never calls Resend', async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ ...validPayload, website: 'https://spam.example' }))
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('happy path: sends via Resend with the right to/replyTo and returns 200', async () => {
    const response = await POST(makeRequest(JSON.stringify(validPayload)));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'me@example.com',
        replyTo: 'jane@example.com',
      })
    );
  });
});

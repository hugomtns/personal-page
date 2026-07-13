import { describe, it, expect } from 'vitest';
import { contactSchema } from './contact-schema';

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Recruiter',
      email: 'jane@example.com',
      message: 'We have a Head of Product role that fits you.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects a malformed email', () => {
    const result = contactSchema.safeParse({
      name: 'Jane',
      email: 'not-an-email',
      message: 'Hello there, this is long enough.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a message too short to be real', () => {
    const result = contactSchema.safeParse({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'hi',
    });
    expect(result.success).toBe(false);
  });
});

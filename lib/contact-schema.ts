import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Please give your name.').max(100, 'That name is too long.'),
  email: z.email('That email address does not look right.'),
  message: z.string().min(10, 'A little more detail, please.').max(5000),
  // Honeypot: hidden from humans, irresistible to bots. Must stay empty.
  website: z.string().optional(),
});

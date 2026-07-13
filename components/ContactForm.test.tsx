import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactForm from './ContactForm';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) }))
  );
});

describe('ContactForm', () => {
  it('labels every field', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows a validation error instead of submitting a bad email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'nope');
    await user.type(screen.getByLabelText(/message/i), 'A real message here.');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/email/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('confirms success after a valid submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), 'Jane Recruiter');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'We have a role for you.');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/thank/i);
    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import Modal from './Modal';

/** Mirrors real usage: a trigger owns the open state, so focus has somewhere
    to return to and the dialog genuinely mounts and unmounts. */
function Harness({ onClose }: { onClose?: () => void } = {}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
        title="Book a call"
      >
        <a href="https://example.com">Inner link</a>
      </Modal>
    </>
  );
}

describe('Modal', () => {
  it('renders nothing until it is opened', () => {
    render(<Harness />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('is announced as a modal dialog with a name', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('Book a call');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when the scrim behind it is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    await user.click(container.querySelector('[data-modal-scrim]')!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('moves focus into the dialog on open', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();
  });

  it('returns focus to the trigger on close, not to the document body', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Open' });

    await user.click(trigger);
    await user.keyboard('{Escape}');

    // Stranding focus on <body> drops a keyboard user back at the top of the
    // page with no idea where they are.
    expect(trigger).toHaveFocus();
  });

  it('keeps Tab inside the dialog instead of letting it reach the page behind', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    const close = screen.getByRole('button', { name: /close/i });
    const inner = screen.getByRole('link', { name: 'Inner link' });

    // Close is first and the link is last, so Tab from the last wraps to the
    // first rather than escaping to the still-present page underneath.
    expect(close).toHaveFocus();
    await user.tab();
    expect(inner).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();

    await user.tab({ shift: true });
    expect(inner).toHaveFocus();
  });

  it('locks the page behind it from scrolling, and unlocks it again', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('calls onClose once per dismissal', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

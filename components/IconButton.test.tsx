import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import IconButton, { CloseIcon } from './IconButton';

describe('IconButton', () => {
  it('renders a button named by its aria-label', () => {
    render(<IconButton aria-label="Close">x</IconButton>);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('defaults to type="button" so it can never submit a surrounding form', () => {
    render(<IconButton aria-label="Close">x</IconButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Close" onClick={onClick}>
        x
      </IconButton>
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('keeps the shared square and merges call-site classes on top', () => {
    render(
      <IconButton aria-label="Close" className="-mr-2 text-muted">
        x
      </IconButton>
    );
    expect(screen.getByRole('button')).toHaveClass(
      'grid',
      'size-11',
      'place-items-center',
      '-mr-2',
      'text-muted'
    );
  });

  it('renders an anchor when given an href', () => {
    render(
      <IconButton
        aria-label="GitHub"
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        x
      </IconButton>
    );
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('forwards a ref to the button (Modal focuses its close button)', () => {
    let el: HTMLButtonElement | null = null;
    render(
      <IconButton
        aria-label="Close"
        ref={(node) => {
          el = node;
        }}
      >
        x
      </IconButton>
    );
    expect(el).toBe(screen.getByRole('button'));
  });

  it('hides the close glyph from assistive tech; the button has the name', () => {
    const { container } = render(<CloseIcon />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});

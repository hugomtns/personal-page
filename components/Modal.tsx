'use client';

import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

type Props = {
  open: boolean;
  onClose: () => void;
  /** Names the dialog for screen readers, and titles it on screen. */
  title: string;
  children: React.ReactNode;
};

/**
 * Hand-rolled rather than a native <dialog>, deliberately.
 *
 * <dialog>.showModal() would give the focus trap, the backdrop and Escape for
 * free — but jsdom 29 does not implement it, so every test of this component
 * would be testing a stub instead of the thing that ships. The pieces below are
 * the ones showModal() would have provided; they are here so they can be
 * asserted. Header.tsx already hand-rolls the same Escape-and-restore pattern.
 *
 * Returns null when closed, so nothing is server-rendered in a pre-open state —
 * which is what keeps this clear of the stranded-opacity trap that the animated
 * components have to work around.
 */
export default function Modal({ open, onClose, title, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // Without this, Tab walks straight out of the dialog and into the page
      // behind it — which is still there, just visually covered. A keyboard
      // user would be editing a form they cannot see.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    // Captured before focus moves into the dialog, restored on the way out.
    // Otherwise closing strands focus on the document body and a keyboard user
    // starts again from the top of the page.
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6">
      <div
        data-modal-scrim
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-bg"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
          <h2 className="label">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 grid size-11 place-items-center text-muted transition-colors hover:text-fg"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

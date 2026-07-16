'use client';

import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { site } from '@/content/site';

/**
 * The iframe lives inside the Modal, which renders nothing until it is opened —
 * so opening the dialog IS the click-to-load. Google's calendar sets a
 * third-party cookie the moment its iframe mounts, and nothing mounts here
 * until someone asks. That is what keeps this site free of a consent banner.
 *
 * The cookie note sits under the button rather than inside the dialog on
 * purpose: by the time the dialog is open the iframe has already mounted and
 * the cookie is already set, so a notice in there would be telling people
 * something after the fact instead of before it.
 */
export default function BookingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Book a call
      </Button>

      <p className="mt-5 max-w-sm text-small text-muted">
        Booking runs on Google Calendar, and opening it sets a Google cookie —
        so it stays closed until you ask. You can also{' '}
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          open the booking page in a new tab
        </a>
        .
      </p>

      <Modal open={open} onClose={() => setOpen(false)} title="Book a call">
        <iframe
          src={site.bookingUrl}
          title="Book a call with Hugo Martins"
          className="h-[70vh] w-full"
        />
      </Modal>
    </>
  );
}

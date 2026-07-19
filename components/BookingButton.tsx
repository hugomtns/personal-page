'use client';

import { useState } from 'react';
import Button from './Button';
import Magnetic from './Magnetic';
import Modal from './Modal';
import { site } from '@/content/site';

/**
 * The iframe lives inside the Modal, which renders nothing until it is opened,
 * so opening the dialog IS the click-to-load. Google's calendar sets a
 * third-party cookie the moment its iframe mounts, and nothing mounts here
 * until someone asks. That is what keeps this site free of a consent banner.
 *
 * The cookie line sits outside the dialog, above the button that opens it. Not
 * decoration, and not arbitrary placement: by the time the dialog is open the
 * iframe has mounted and the cookie is already set, so saying it in there would
 * be telling people something after the fact. Above the button, it is the last
 * thing read before the click that consents to it.
 *
 * The button also comes last for the same reason the form's Send does: the
 * action belongs at the end of what you need to know to take it.
 */
export default function BookingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <p className="mb-7 max-w-sm text-small text-muted">
        Booking takes place via Google Calendar. Opening the booking modal sets
        a Google cookie.
      </p>

      {/* The one magnetic element on the site. It only moves the button's
          pixels; the Modal below still mounts nothing until the click. */}
      <Magnetic>
        <Button type="button" onClick={() => setOpen(true)}>
          Book a call
        </Button>
      </Magnetic>

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

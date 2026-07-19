'use client';

import { useEffect, useState } from 'react';

// The formatter pins the zone, so the line shows Berlin time no matter where
// the visitor is. `short` yields CET/CEST and follows daylight saving on its
// own, so nothing here is hardcoded per season.
const berlin = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Europe/Berlin',
  timeZoneName: 'short',
});

/**
 * The ambient line in the footer: "Berlin, 14:32 CET". Cheap, human, and it
 * keeps the site feeling maintained.
 *
 * The server and the client never agree on the current minute, so nothing
 * renders until mount. Rendering the server's time and swapping it during
 * hydration would be the classic mismatch; an empty footer for one paint is
 * the honest version.
 */
export default function BerlinTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    // Minute granularity; 30s keeps the displayed minute honest.
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;

  return (
    <span className="font-mono text-label text-muted">Berlin, {berlin.format(now)}</span>
  );
}

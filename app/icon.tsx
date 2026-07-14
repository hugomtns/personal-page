import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Same Satori caveat as the OG card: no system fonts, so the display face has
// to be handed over as raw bytes or the monogram silently renders in a default.
export default async function Icon() {
  const instrumentSerif = await readFile(
    join(process.cwd(), 'assets/InstrumentSerif-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111111',
          color: '#fafaf8',
          fontFamily: 'Instrument Serif',
          fontSize: 26,
          lineHeight: 1,
        }}
      >
        H
      </div>
    ),
    { ...size, fonts: [{ name: 'Instrument Serif', data: instrumentSerif, style: 'normal', weight: 400 }] }
  );
}

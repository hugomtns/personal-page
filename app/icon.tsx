import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Same Satori caveat as the OG card: no system fonts, so the display face has
// to be handed over as raw bytes or the monogram silently renders in a default.
export default async function Icon() {
  const spaceGrotesk = await readFile(
    join(process.cwd(), 'assets/SpaceGrotesk-Bold.ttf')
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
          fontFamily: 'Space Grotesk',
          fontSize: 19,
          letterSpacing: -1,
          lineHeight: 1,
        }}
      >
        HM
      </div>
    ),
    { ...size, fonts: [{ name: 'Space Grotesk', data: spaceGrotesk, style: 'normal', weight: 700 }] }
  );
}

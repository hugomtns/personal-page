import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/content/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Satori (next/og's renderer) has no system fonts — a named family with no
// matching `fonts` entry silently falls back to its built-in default, and
// supplying a `fonts` array at all replaces that default outright, so every
// family used below (including the body face) must be loaded explicitly.
export default async function Image() {
  const [instrumentSerif, geist] = await Promise.all([
    readFile(join(process.cwd(), 'assets/InstrumentSerif-Regular.ttf')),
    readFile(join(process.cwd(), 'assets/Geist-Regular.ttf')),
  ]);

  return new ImageResponse(
    (
      // Dark, to match the site a click away. No slogan — the name and the
      // fact of what he does, nothing sold.
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0d0d0d',
          padding: '80px',
          fontFamily: 'Geist',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Instrument Serif',
            fontSize: 150,
            color: '#f5f5f3',
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#6b8aff',
            marginTop: 36,
          }}
        >
          {site.role} — {site.location.split(',')[0]}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Serif',
          data: instrumentSerif,
          style: 'normal',
          weight: 400,
        },
        { name: 'Geist', data: geist, style: 'normal', weight: 400 },
      ],
    }
  );
}

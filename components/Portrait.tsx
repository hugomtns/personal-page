import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';

const PORTRAIT_FILE = 'hugo-martins.jpg';

/**
 * The portrait, or a placeholder that says so.
 *
 * This is a Server Component, so it can just look on disk. Drop the photo at
 * public/hugo-martins.jpg and it appears — no code change, and no broken image
 * icon in the meantime if the file is not there yet.
 */
export default function Portrait() {
  const present = existsSync(join(process.cwd(), 'public', PORTRAIT_FILE));

  if (!present) {
    return (
      <div className="grid aspect-[4/5] w-full place-items-center rounded-panel border border-dashed border-border bg-surface p-6 text-center">
        <p className="text-small text-muted">
          Portrait goes here.
          <br />
          <span className="text-fg/60">public/{PORTRAIT_FILE}</span>
        </p>
      </div>
    );
  }

  return (
    // The source is square; the frame is 4:5. object-cover crops the sides,
    // which is what we want — it tightens onto the face and loses the plant.
    <Image
      src={`/${PORTRAIT_FILE}`}
      alt="Hugo Martins"
      width={1254}
      height={1254}
      // The portrait is the largest thing on /about and sits at the top of it,
      // so it is the LCP element. It must not be lazy-loaded.
      priority
      sizes="(min-width: 768px) 24rem, 100vw"
      className="aspect-[4/5] w-full rounded-panel object-cover"
    />
  );
}

import Image from 'next/image';

/**
 * The screenshot frame shared by the Projects gallery and CV product
 * shots. The call site sets size, ratio and
 * border via className so every shot reads as one system; a missing shot
 * shows the placeholder instead of a broken image.
 *
 * next/image, not a plain <img>: the source frames are 1200x750, and a plain
 * img ships all 1200px to every tile (a ~350px slot gets the same file as the
 * lightbox) and ships them eagerly — on /projects that was ten-plus frames
 * competing with the LCP on page load. next/image serves the size the slot
 * actually needs (`sizes` describes the slot) and lazy-loads everything that
 * is not marked `priority`. The wrapper needs `relative` for `fill` to
 * position against; the aspect class on it keeps the layout reserved.
 */
export default function Screenshot({
  src,
  alt,
  className,
  sizes = '100vw',
  priority = false,
}: {
  src: string | null;
  alt: string;
  className: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <span className={`relative block overflow-hidden bg-surface-strong ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <span className="label flex h-full w-full items-center justify-center">
          screenshot
        </span>
      )}
    </span>
  );
}

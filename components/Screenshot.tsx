/**
 * The screenshot frame shared by the project tiles, the project detail
 * gallery, and the CV product shots. The call site sets size, ratio and
 * border via className so every shot reads as one system; a missing shot
 * shows the placeholder instead of a broken image.
 *
 * Promoted out of ProjectTile.tsx, where CVProduct had already grown a
 * hand-rolled duplicate of the same frame.
 */
export default function Screenshot({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className: string;
}) {
  return (
    <span className={`block overflow-hidden bg-surface-strong ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="label flex h-full w-full items-center justify-center">
          screenshot
        </span>
      )}
    </span>
  );
}

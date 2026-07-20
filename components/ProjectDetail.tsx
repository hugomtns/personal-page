'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Project } from '@/content/projects';
import Card from './Card';
import IconButton, { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './IconButton';
import Modal from './Modal';
import Screenshot from './Screenshot';

/**
 * The detail for an open project: the story and the screenshot gallery. It is
 * the inner content of the full-width panel the garden opens below a tile's row
 * (see ProjectGarden) — so it carries no positioning of its own, just the
 * layout of the content and a close affordance.
 */
export default function ProjectDetail({
  project: p,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = () => setLightbox(null);
  const goPrev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : i === 0 ? p.images.length - 1 : i - 1
      ),
    [p.images.length]
  );
  const goNext = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % p.images.length)),
    [p.images.length]
  );

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, goPrev, goNext]);

  return (
    <>
      <Card open className="p-6 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-h1">{p.name}</h2>
          <p className="mt-1 text-small text-muted">{p.tagline}</p>
        </div>
        <IconButton
          onClick={onClose}
          aria-label="Close"
          className="-mr-2 -mt-1 shrink-0 text-muted transition-colors duration-180 hover:text-fg"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="max-w-prose leading-relaxed">{p.description}</p>
          {p.details?.split('\n\n').map((paragraph, i) => (
            <p key={i} className="max-w-prose leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Landscape shots are 16:10; portrait/mobile shots keep their ratio. */}
        <div className="grid gap-4">
          {p.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View larger image ${i + 1} of ${p.images.length}`}
              className="text-left"
            >
              {p.portrait ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img ?? undefined}
                    alt={`${p.name}: ${i + 1}`}
                    className="h-auto max-h-[70vh] w-auto rounded-frame border border-border"
                  />
                </>
              ) : (
                <Screenshot
                  src={img}
                  alt={`${p.name}: ${i + 1}`}
                  className="aspect-[16/10] w-full rounded-frame border border-border"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </Card>

    <Modal
      open={lightbox !== null}
      onClose={closeLightbox}
      title={
        lightbox !== null
          ? `${p.name} — ${p.captions?.[lightbox] ?? `Screenshot ${lightbox + 1}`}`
          : p.name
      }
      className="max-w-6xl"
      frameActions={
        lightbox !== null ? (
          <>
            <IconButton
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 text-bg transition-colors duration-180 hover:text-white"
            >
              <ArrowLeftIcon />
            </IconButton>
            <IconButton
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-bg transition-colors duration-180 hover:text-white"
            >
              <ArrowRightIcon />
            </IconButton>
          </>
        ) : null
      }
    >
      {lightbox !== null && (
        <div className="p-4 sm:p-6">
          {p.images[lightbox] ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={p.images[lightbox]!}
              alt={`${p.name}: ${lightbox + 1}`}
              className={`rounded-frame ${p.portrait ? 'mx-auto h-auto max-h-[80vh] w-auto' : 'w-full'}`}
            />
          ) : (
            <span
              className={`label flex w-full items-center justify-center rounded-frame bg-surface-strong ${p.portrait ? 'aspect-[9/16]' : 'aspect-[16/10]'}`}
            >
              screenshot
            </span>
          )}
          {p.captions?.[lightbox] && (
            <p className="mt-4 text-small text-muted">{p.captions[lightbox]}</p>
          )}
        </div>
      )}
    </Modal>
    </>
  );
}

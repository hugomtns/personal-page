'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/content/projects';
import IconButton, { ArrowLeftIcon, ArrowRightIcon } from './IconButton';
import Modal from './Modal';
import Screenshot from './Screenshot';

export default function ProjectDetail({
  project: p,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
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
      <div className="terminal-projects__detail">
        <div className="terminal-projects__body">
          <div className="terminal-projects__story">
            <p>{p.description}</p>
            {p.details?.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
          {p.images.length > 0 && (
            <section className="terminal-projects__gallery">
              <h3 className="terminal-projects__heading">Screenshots</h3>
              <ul className="terminal-projects__screenshots">
                {p.images.map((image, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setLightbox(i)}
                      aria-label={`View larger image ${i + 1} of ${p.images.length}`}
                      className="terminal-projects__thumbnail"
                    >
                      <Screenshot
                        src={image}
                        alt={`${p.name}: ${i + 1}`}
                        className={p.portrait ? 'aspect-[9/16]' : 'aspect-[16/10]'}
                        sizes="(max-width: 639px) 45vw, (max-width: 899px) 40vw, 230px"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <button type="button" onClick={onClose} className="terminal-control terminal-projects__close">
          <span aria-hidden="true">[-]</span> Close project
        </button>
      </div>

      {lightbox !== null && createPortal(
        <Modal
          open
          onClose={closeLightbox}
          title={`${p.name} — ${p.captions?.[lightbox] ?? `Screenshot ${lightbox + 1}`}`}
          className="max-w-6xl"
          terminal
        >
          <div className="terminal-projects__lightbox">
            {p.images[lightbox] ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={p.images[lightbox]!}
                alt={`${p.name}: ${lightbox + 1}`}
                className="terminal-projects__full-image"
              />
            ) : (
              <span className="terminal-projects__placeholder">screenshot</span>
            )}
            {p.images.length > 1 && (
              <div className="terminal-projects__image-nav">
                <IconButton onClick={goPrev} aria-label="Previous image" className="terminal-control">
                  <ArrowLeftIcon />
                </IconButton>
                <span aria-live="polite">{lightbox + 1} / {p.images.length}</span>
                <IconButton onClick={goNext} aria-label="Next image" className="terminal-control">
                  <ArrowRightIcon />
                </IconButton>
              </div>
            )}
          </div>
        </Modal>,
        document.body,
      )}
    </>
  );
}

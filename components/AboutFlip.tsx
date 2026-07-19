'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_OUT } from '@/lib/motion';

type AboutFlipProps = {
  /** The professional portrait, always present. */
  portraitSrc: string;
  /** The personal photo. Null renders a "photo goes here" back face. */
  personalSrc: string | null;
  professional: string[];
  personal: string[];
  /** Inline links inside paragraphs: the first occurrence of `match` in any
      paragraph becomes an external link. */
  links?: { match: string; href: string }[];
};

/**
 * The two-sided About. A button under the portrait flips the card: the photo
 * rotates on the Y axis to its other face while the text column crossfades to
 * the matching copy. Same button flips back.
 *
 * The flip is a CSS 3D transform, not a Motion tween: rotateY with
 * backface-visibility hidden is exactly what transforms are for, and jsdom
 * cannot measure it either way. The text swap is Motion, on the shared
 * duration/easing scale.
 *
 * Reduced motion gets no rotation and no crossfade: both faces and both texts
 * stay fully visible (opacity 1), the swap is instant.
 */
export default function AboutFlip({
  portraitSrc,
  personalSrc,
  professional,
  personal,
  links,
}: AboutFlipProps) {
  const reduce = useReducedMotion();
  const [side, setSide] = useState<'professional' | 'personal'>('professional');
  const flipped = side === 'personal';
  const paragraphs = flipped ? personal : professional;

  const renderText = (text: string) => {
    const link = links?.find((l) => text.includes(l.match));
    if (!link) return text;
    const [before, after] = text.split(link.match);
    return (
      <>
        {before}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent underline-offset-4 transition-colors duration-180 hover:text-accent"
        >
          {link.match}
        </a>
        {after}
      </>
    );
  };

  const backFace = personalSrc ? (
    <Image
      src={personalSrc}
      alt="Hugo Martins, off the clock"
      width={1254}
      height={1254}
      sizes="(min-width: 768px) 24rem, 100vw"
      className="aspect-[4/5] w-full rounded-panel object-cover"
    />
  ) : (
    <div className="grid aspect-[4/5] w-full place-items-center rounded-panel border border-dashed border-border bg-surface p-6 text-center">
      <p className="text-small text-muted">
        Personal photo goes here.
        <br />
        <span className="text-fg/60">public/hugo-martins-personal.jpg</span>
      </p>
    </div>
  );

  return (
    <>
      <div className="md:sticky md:top-32 md:self-start">
        {reduce ? (
          // No 3D under reduced motion: render whichever face is active.
          flipped ? (
            backFace
          ) : (
            <Image
              src={portraitSrc}
              alt="Hugo Martins"
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 768px) 24rem, 100vw"
              className="aspect-[4/5] w-full rounded-panel object-cover"
            />
          )
        ) : (
          /* Perspective lives on the wrapper; the card inside rotates. */
          <div className="[perspective:1200px]">
            <div
              className={`relative aspect-[4/5] w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out ${
                flipped ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              <Image
                src={portraitSrc}
                alt="Hugo Martins"
                width={1254}
                height={1254}
                // The portrait is the largest thing on /about and sits at the
                // top of it, so it is the LCP element. Never lazy-loaded.
                priority
                sizes="(min-width: 768px) 24rem, 100vw"
                className="absolute inset-0 aspect-[4/5] w-full rounded-panel object-cover [backface-visibility:hidden]"
              />
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                {backFace}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSide(flipped ? 'professional' : 'personal')}
          className="label mt-4 inline-block transition-colors duration-180 hover:text-accent"
        >
          {flipped ? '← The professional side' : 'The personal side →'}
        </button>
      </div>

      {/* aria-live so the copy swap is announced, not just seen. */}
      <div aria-live="polite" className="grid max-w-2xl gap-6 text-body leading-relaxed">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={side}
            className="grid gap-6"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : DURATION.fast, ease: EASE_OUT }}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{renderText(paragraph)}</p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

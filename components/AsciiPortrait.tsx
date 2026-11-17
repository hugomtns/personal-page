import type { CSSProperties } from 'react';
import { asciiPortrait } from '@/content/asciiPortrait';

export default function AsciiPortrait({ className = '' }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="ASCII portrait of Hugo Martins"
      className={`ascii-portrait ${className}`}
    >
      {(['desktop', 'mobile'] as const).map((variant) => {
        const portrait = asciiPortrait[variant];
        const style = { '--columns': portrait.columns, '--rows': portrait.rows } as CSSProperties;
        return (['dark', 'light'] as const).map((theme) => (
          <pre
            key={`${variant}-${theme}`}
            aria-hidden="true"
            className={`ascii-portrait__${variant} ascii-portrait__${theme}`}
            style={style}
          >
            {portrait[theme]}
          </pre>
        ));
      })}
    </div>
  );
}

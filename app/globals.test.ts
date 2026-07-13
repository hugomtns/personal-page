import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/** Relative luminance per WCAG 2.1. */
function luminance(hex: string): number {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = rgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const css = readFileSync(path.resolve(__dirname, 'globals.css'), 'utf-8');

function token(name: string): string {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token ${name} not found in globals.css`);
  return match[1];
}

describe('design tokens', () => {
  it('light accent meets WCAG AA against the light background', () => {
    expect(contrast(token('--color-accent-light'), token('--color-bg-light')))
      .toBeGreaterThanOrEqual(4.5);
  });

  it('dark accent meets WCAG AA against the dark background', () => {
    expect(contrast(token('--color-accent-dark'), token('--color-bg-dark')))
      .toBeGreaterThanOrEqual(4.5);
  });

  it('body text meets WCAG AA in both themes', () => {
    expect(contrast(token('--color-fg-light'), token('--color-bg-light')))
      .toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('--color-fg-dark'), token('--color-bg-dark')))
      .toBeGreaterThanOrEqual(4.5);
  });
});

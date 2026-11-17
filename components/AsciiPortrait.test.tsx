import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AsciiPortrait from './AsciiPortrait';
import { asciiPortrait } from '@/content/asciiPortrait';

describe('AsciiPortrait', () => {
  it('announces a single portrait while keeping the character art decorative', () => {
    render(<AsciiPortrait />);
    const portrait = screen.getByRole('img', { name: 'ASCII portrait of Hugo Martins' });
    expect(screen.getAllByRole('img')).toHaveLength(1);
    const blocks = portrait.querySelectorAll('pre');
    expect(blocks).toHaveLength(4);
    for (const block of blocks) {
      expect(block).toHaveAttribute('aria-hidden', 'true');
      expect(block.textContent?.trim()).not.toBe('');
    }
  });

  it.each(['desktop', 'mobile'] as const)('%s art fits its character grid', (variant) => {
    const { dark, light, columns, rows } = asciiPortrait[variant];
    for (const text of [dark, light]) {
      expect(text).toMatch(/^[\x20-\x7e\n]+$/);
      const lines = text.split('\n');
      expect(lines).toHaveLength(rows);
      expect(Math.max(...lines.map((line) => line.length))).toBeLessThanOrEqual(columns);
      expect(text.trim().length).toBeGreaterThan(columns);
    }
    expect(light).not.toBe(dark);
  });
});

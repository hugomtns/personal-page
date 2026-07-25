import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Screenshot from './Screenshot';

// The frame is the site's image-loading policy: next/image everywhere, lazy
// by default, eager only when the call site marks the shot as above the fold.
// next/image rewrites src through the optimizer (/_next/image?url=...), which
// is also what proves no plain full-size <img> snuck back in.
describe('Screenshot', () => {
  it('serves the shot through the image optimizer, lazy by default', () => {
    render(<Screenshot src="/images/projects/x/01.webp" alt="X" className="aspect-[16/10]" />);
    const img = screen.getByRole('img', { name: 'X' });
    expect(img.getAttribute('src')).toContain('/_next/image');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('loads eagerly when marked priority (the above-fold row)', () => {
    render(
      <Screenshot src="/images/projects/x/01.webp" alt="X" className="aspect-[16/10]" priority />,
    );
    // Priority shots get no loading attribute (absent = eager), and in the
    // browser also a preload link + fetchPriority="high", which jsdom does
    // not surface. The checkable contract here: not lazy.
    expect(screen.getByRole('img', { name: 'X' }).getAttribute('loading')).toBeNull();
  });

  it('shows the placeholder instead of a broken image when the shot is missing', () => {
    render(<Screenshot src={null} alt="X" className="aspect-[16/10]" />);
    expect(screen.getByText('screenshot')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

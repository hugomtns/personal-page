import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageShell from './PageShell';

describe('PageShell', () => {
  it('renders the title as the page heading, then the content', () => {
    render(
      <PageShell title="About">
        <p>Body</p>
      </PageShell>
    );
    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('wraps everything in the shared centered column', () => {
    const { container } = render(<PageShell title="About">Body</PageShell>);
    expect(container.firstChild).toHaveClass('mx-auto', 'max-w-5xl', 'px-6', 'py-20');
  });

  it('spaces the heading off the content by default', () => {
    render(<PageShell title="About">Body</PageShell>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-h1', 'mb-16');
  });

  it('lets a page override the heading spacing', () => {
    render(
      <PageShell title="Contact" headingClassName="">
        Body
      </PageShell>
    );
    expect(screen.getByRole('heading', { level: 1 })).not.toHaveClass('mb-16');
  });
});

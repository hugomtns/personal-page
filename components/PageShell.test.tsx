import { render, screen, within } from '@testing-library/react';
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

  it('shows the terminal command while keeping the page heading name', () => {
    render(<PageShell title="About" command="whoami">Body</PageShell>);
    const heading = screen.getByRole('heading', { level: 1, name: 'About' });
    const prompt = within(heading).getByText('hugo@berlin:~$ whoami');
    expect(prompt.closest('[aria-hidden="true"]')).not.toBeNull();
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

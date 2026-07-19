import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MetaList from './MetaList';

describe('MetaList', () => {
  it('renders each item as a dt/dd group inside the dl', () => {
    const { container } = render(
      <MetaList
        items={[
          { label: 'About', value: 'About text' },
          { label: 'My role', value: 'Role text' },
        ]}
      />
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Role text')).toBeInTheDocument();

    // dl > div > dt+dd keeps the list valid HTML (app/cv/page.test.tsx pins
    // this shape across the whole CV page).
    const group = container.querySelector('dl > div');
    expect(group?.children[0].tagName).toBe('DT');
    expect(group?.children[1].tagName).toBe('DD');
  });

  it('passes className through so call sites own the accent border', () => {
    const { container } = render(
      <MetaList className="border-l border-accent pl-6" items={[{ label: 'A', value: 'B' }]} />
    );
    expect(container.querySelector('dl')).toHaveClass('grid', 'gap-5', 'border-l', 'border-accent');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Timeline from './Timeline';

describe('Timeline', () => {
  it('renders every role', () => {
    render(<Timeline />);
    expect(screen.getByText('PVcase')).toBeInTheDocument();
    expect(screen.getByText('Staffbase')).toBeInTheDocument();
    expect(screen.getByText('Medwing')).toBeInTheDocument();
    expect(screen.getByText('Helpling')).toBeInTheDocument();
    expect(screen.getByText('ResearchGate')).toBeInTheDocument();
  });
});

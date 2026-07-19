import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CVProduct from './CVProduct';
import type { Product } from '@/content/cvTimeline';

const product: Product = {
  id: 'p1',
  name: 'Flagship Rebuild',
  year: '2022',
  tagline: 'Rebuilt the core platform.',
  audience: 'Enterprise admins',
  problem: 'The problem text.',
  did: 'The work text.',
  outcome: 'The outcome text.',
  image: null,
};

describe('CVProduct', () => {
  it('reveals Problem, What I did and Outcome, plus the audience line', async () => {
    const user = userEvent.setup();
    render(<CVProduct product={product} />);

    await user.click(screen.getByRole('button', { name: /flagship rebuild/i }));

    expect(screen.getByText('Problem')).toBeInTheDocument();
    expect(screen.getByText('What I did')).toBeInTheDocument();
    expect(screen.getByText('Outcome')).toBeInTheDocument();
    expect(screen.getByText('For · Enterprise admins')).toBeInTheDocument();
  });

  // A product with an empty audience is a leadership milestone: it shows
  // Scope instead of Problem and drops the "For" line (content/cvTimeline.ts).
  it('shows Scope instead of Problem and drops the audience line for a leadership milestone', async () => {
    const user = userEvent.setup();
    render(<CVProduct product={{ ...product, audience: '' }} />);

    await user.click(screen.getByRole('button', { name: /flagship rebuild/i }));

    expect(screen.getByText('Scope')).toBeInTheDocument();
    expect(screen.queryByText('Problem')).not.toBeInTheDocument();
    expect(screen.queryByText(/^For ·/)).not.toBeInTheDocument();
  });

  it('wires the trigger to the panel with aria-expanded and aria-controls', async () => {
    const user = userEvent.setup();
    render(<CVProduct product={product} />);
    const trigger = screen.getByRole('button', { name: /flagship rebuild/i });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const regionId = trigger.getAttribute('aria-controls');
    expect(regionId).toBeTruthy();
    expect(document.getElementById(regionId!)).toContainElement(
      screen.getByText('The problem text.')
    );
  });
});

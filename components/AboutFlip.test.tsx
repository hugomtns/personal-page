import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import AboutPage from '@/app/(site)/about/page';
import AboutFlip from './AboutFlip';

const professional = ['The professional paragraph.'];
const personal = ['The personal paragraph.'];

const renderFlip = () =>
  render(
    <AboutFlip
      professional={professional}
      personal={personal}
    />
  );

describe('AboutFlip', () => {
  it('starts on the professional side', () => {
    renderFlip();

    expect(screen.getByText('The professional paragraph.')).toBeInTheDocument();
    expect(screen.queryByText('The personal paragraph.')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /personal side/i })).toBeInTheDocument();
  });

  it('flips to the personal side and back', async () => {
    const user = userEvent.setup();
    renderFlip();

    await user.click(screen.getByRole('button', { name: /personal side/i }));

    expect(await screen.findByText('The personal paragraph.')).toBeInTheDocument();
    expect(screen.queryByText('The professional paragraph.')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /professional side/i }));

    expect(await screen.findByText('The professional paragraph.')).toBeInTheDocument();
  });

  it('linkifies a matched phrase inside a paragraph', async () => {
    const user = userEvent.setup();
    render(
      <AboutFlip
        professional={['The professional paragraph.']}
        personal={['Here is the recipe: Bacalhau com Natas. Enjoy!']}
        links={[{ match: 'Bacalhau com Natas', href: 'https://example.com/recipe' }]}
      />
    );

    await user.click(screen.getByRole('button', { name: /personal side/i }));

    const link = await screen.findByRole('link', { name: 'Bacalhau com Natas' });
    expect(link).toHaveAttribute('href', 'https://example.com/recipe');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders both About sides without images', async () => {
    const user = userEvent.setup();
    const { container } = render(<AboutPage />);
    const titleBar = screen.getByRole('heading', { name: 'About', level: 1 }).closest('.terminal-bar');
    expect(titleBar).not.toBeNull();

    expect(screen.getByText(/studied Biochemistry and Bioinformatics/)).toBeInTheDocument();
    expect(container.querySelector('img, [role="img"]')).toBeNull();

    await user.click(within(titleBar as HTMLElement).getByRole('button', { name: /personal side/i }));
    expect(await screen.findByText(/Portuguese town called Guarda/)).toBeInTheDocument();
    expect(container.querySelector('img, [role="img"]')).toBeNull();
  });
});

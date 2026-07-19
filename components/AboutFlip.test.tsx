import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import AboutFlip from './AboutFlip';

const professional = ['The professional paragraph.'];
const personal = ['The personal paragraph.'];

const renderFlip = () =>
  render(
    <AboutFlip
      portraitSrc="/hugo-martins.jpg"
      personalSrc="/hugo-martins-personal.jpg"
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
    // The personal photo is now the visible face.
    expect(screen.getByAltText('Hugo Martins, off the clock')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /professional side/i }));

    expect(await screen.findByText('The professional paragraph.')).toBeInTheDocument();
  });

  it('linkifies a matched phrase inside a paragraph', async () => {
    const user = userEvent.setup();
    render(
      <AboutFlip
        portraitSrc="/hugo-martins.jpg"
        personalSrc={null}
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

  it('shows a placeholder back face when the personal photo is missing', () => {
    render(
      <AboutFlip
        portraitSrc="/hugo-martins.jpg"
        personalSrc={null}
        professional={professional}
        personal={personal}
      />
    );

    expect(screen.getByText(/personal photo goes here/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Accordion, { AccordionPanel } from './Accordion';

function Harness() {
  return (
    <Accordion
      trigger={({ open, ...props }) => (
        <button type="button" {...props}>
          {open ? 'Close details' : 'Open details'}
        </button>
      )}
    >
      <p>Panel body</p>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('starts closed: trigger collapsed, panel absent from the DOM', () => {
    render(<Harness />);

    expect(screen.getByRole('button', { name: 'Open details' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.queryByText('Panel body')).not.toBeInTheDocument();
  });

  it('opens on click and wires aria-controls to the panel region', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const body = screen.getByText('Panel body');
    const regionId = trigger.getAttribute('aria-controls');
    // aria-controls is only meaningful if it resolves to the panel's region.
    expect(regionId).toBeTruthy();
    expect(document.getElementById(regionId!)).toContainElement(body);
  });

  it('collapses again on a second click', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button');

    await user.click(trigger);
    await user.click(trigger);

    // The panel's exit animation may still be unwinding; aria-expanded is the
    // synchronous gate.
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('hands the open state to the trigger so it can restyle itself', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button', { name: 'Close details' })).toBeInTheDocument();
  });

  it('honours a caller-provided panel id', () => {
    render(
      <Accordion id="my-panel" trigger={(props) => <button type="button" {...props}>Toggle</button>}>
        <p>Body</p>
      </Accordion>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'my-panel');
  });
});

describe('AccordionPanel', () => {
  it('renders nothing while closed', () => {
    render(
      <AccordionPanel open={false} id="panel">
        <p>Hidden</p>
      </AccordionPanel>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('can render the region as an li, for the garden grid rows', () => {
    render(
      <ul>
        <AccordionPanel as="li" open id="panel">
          <p>Row panel</p>
        </AccordionPanel>
      </ul>
    );
    expect(screen.getByText('Row panel').closest('li')).toHaveAttribute('id', 'panel');
  });
});

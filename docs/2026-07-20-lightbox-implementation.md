# Project garden lightbox + expanded descriptions implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a click-to-enlarge image lightbox with keyboard navigation to the `/projects` detail panel, and expand every project description with codebase-specific detail.

**Architecture:** Reuse the existing `Modal` component for the lightbox. Wrap each `Screenshot` in a button inside `ProjectDetail`, track the open image index with local state, and listen for left/right arrow keys while the modal is open. Add an optional `captions` array to the `Project` type. Keep all copy in `content/projects.ts`.

**Tech stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, existing `Modal` and `Screenshot` primitives, Vitest + React Testing Library.

## Global constraints

- No em dashes in site copy.
- `description` remains the single story field shown in the detail panel.
- Captions are optional plain text; missing captions fall back to a generic label.
- Keyboard nav must not break the existing `Modal` focus trap or Escape behavior.
- All existing tests plus new tests must pass; lint and `tsc --noEmit` must be clean.

---

### Task 1: Extend the Project type with optional captions

**Files:**
- Modify: `content/projects.ts:9-15`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Project.captions?: string[]`.

- [ ] **Step 1: Add the optional field**

Add `captions?: string[];` to the `Project` type, directly below `images`.

```ts
export type Project = {
  id: string;
  name: string;
  /** One line shown on the tile face. */
  tagline: string;
  /** The story: what it is, why it exists, what it does. Shown when expanded. */
  description: string;
  /** Screenshots. First is the tile thumbnail; the rest join it in the gallery.
      A null entry renders the placeholder frame. */
  images: (string | null)[];
  /** Optional plain-text caption for each image, used by the lightbox. */
  captions?: string[];
  /** Which section the project belongs to. */
  group: 'work' | 'play';
};
```

- [ ] **Step 2: Commit**

```bash
git add content/projects.ts
git commit -m "Add optional captions field to Project type"
```

---

### Task 2: Let Modal accept a custom width class

**Files:**
- Modify: `components/Modal.tsx:11-16`, `components/Modal.tsx:94-100`

**Interfaces:**
- Consumes: nothing.
- Produces: `Modal` accepts an optional `className` prop applied to the panel.

- [ ] **Step 1: Add the prop**

```ts
type Props = {
  open: boolean;
  onClose: () => void;
  /** Names the dialog for screen readers, and titles it on screen. */
  title: string;
  children: ReactNode;
  className?: string;
};
```

Update the function signature:

```ts
export default function Modal({ open, onClose, title, children, className }: Props) {
```

- [ ] **Step 2: Apply the className to the panel**

Replace the panel's fixed `max-w-3xl` with a conditional default:

```tsx
<div
  ref={panelRef}
  role="dialog"
  aria-modal="true"
  aria-label={title}
  className={`relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-panel border border-border bg-bg ${className ?? 'max-w-3xl'}`}
>
```

- [ ] **Step 3: Run the Modal tests**

```bash
npx vitest run components/Modal.test.tsx
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add components/Modal.tsx
git commit -m "Add optional className prop to Modal panel"
```

---

### Task 3: Implement the lightbox in ProjectDetail

**Files:**
- Modify: `components/ProjectDetail.tsx`

**Interfaces:**
- Consumes: `Project.captions?: string[]`, `Modal` with `className`, `Screenshot`.
- Produces: clickable screenshots that open a full-size image lightbox with left/right arrow navigation.

- [ ] **Step 1: Import Modal and useState/useEffect**

```ts
import { useEffect, useState } from 'react';
import type { Project } from '@/content/projects';
import Card from './Card';
import IconButton, { CloseIcon } from './IconButton';
import Modal from './Modal';
import Screenshot from './Screenshot';
```

- [ ] **Step 2: Add lightbox state and keyboard navigation**

Inside `ProjectDetail`, before the return:

```ts
const [lightbox, setLightbox] = useState<number | null>(null);
const closeLightbox = () => setLightbox(null);

useEffect(() => {
  if (lightbox === null) return;

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setLightbox((i) =>
        i === null ? i : i === 0 ? p.images.length - 1 : i - 1
      );
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setLightbox((i) => (i === null ? i : (i + 1) % p.images.length));
    }
  };

  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [lightbox, p.images.length]);
```

- [ ] **Step 3: Make screenshots clickable**

Replace the gallery loop with buttons:

```tsx
{/* Every shot, each 16:10 so the set reads as one system. */}
<div className="grid gap-4">
  {p.images.map((img, i) => (
    <button
      key={i}
      type="button"
      onClick={() => setLightbox(i)}
      aria-label={`View larger image ${i + 1} of ${p.images.length}`}
      className="text-left"
    >
      <Screenshot
        src={img}
        alt={`${p.name}: ${i + 1}`}
        className="aspect-[16/10] w-full rounded-frame border border-border"
      />
    </button>
  ))}
</div>
```

- [ ] **Step 4: Render the lightbox Modal**

After the Card:

```tsx
<Modal
  open={lightbox !== null}
  onClose={closeLightbox}
  title={
    lightbox !== null
      ? `${p.name} — ${p.captions?.[lightbox] ?? `Screenshot ${lightbox + 1}`}`
      : p.name
  }
  className="max-w-5xl"
>
  {lightbox !== null && (
    <div className="p-4 sm:p-6">
      {p.images[lightbox] ? (
        <img
          src={p.images[lightbox]!}
          alt={`${p.name}: ${lightbox + 1}`}
          className="w-full rounded-frame"
        />
      ) : (
        <span className="label flex aspect-[16/10] w-full items-center justify-center rounded-frame bg-surface-strong">
          screenshot
        </span>
      )}
      {p.captions?.[lightbox] && (
        <p className="mt-4 text-small text-muted">{p.captions[lightbox]}</p>
      )}
    </div>
  )}
</Modal>
```

- [ ] **Step 5: Run tests and lint**

```bash
npx vitest run components/ProjectGarden.test.tsx components/ProjectTile.test.tsx app/projects/page.test.tsx
npm run lint
npx tsc --noEmit
```

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add components/ProjectDetail.tsx
git commit -m "Add screenshot lightbox with keyboard navigation"
```

---

### Task 4: Add tests for the lightbox

**Files:**
- Create: `components/ProjectDetail.test.tsx`

**Interfaces:**
- Consumes: `ProjectDetail` with a mock project.
- Produces: tests covering open, close, arrow navigation, and caption fallback.

- [ ] **Step 1: Create the test file**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ProjectDetail from './ProjectDetail';

const mockProject = {
  id: 'demo',
  name: 'Demo Project',
  tagline: 'A demo for testing.',
  description: 'This is the demo project description.',
  images: ['/images/demo/01.webp', '/images/demo/02.webp'],
  captions: ['First caption', undefined as unknown as string],
  group: 'play' as const,
};

describe('ProjectDetail', () => {
  it('opens the lightbox when a screenshot is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /View larger image 1 of 2/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — First caption');
  });

  it('navigates images with arrow keys', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /View larger image 1 of 2/i }));
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — First caption');

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — Screenshot 2');

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Demo Project — First caption');
  });

  it('closes the lightbox on Escape', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /View larger image 1 of 2/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the new tests**

```bash
npx vitest run components/ProjectDetail.test.tsx
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add components/ProjectDetail.test.tsx
git commit -m "Add ProjectDetail lightbox tests"
```

---

### Task 5: Expand project descriptions

**Files:**
- Modify: `content/projects.ts`

**Interfaces:**
- Consumes: existing project data.
- Produces: longer, codebase-specific `description` strings for every project.

- [ ] **Step 1: Update each `description` with richer copy**

Replace each description with the expanded version below. Keep Hugo's voice: state the fact and stop, no em dashes, no inspirational filler.

Work projects:

```ts
{
  id: 'pvfinance',
  description:
    'A browser-side financial model for utility-scale solar projects. It takes project parameters and runs IRR, NPV, LCOE, debt sizing, and a 25-year cash-flow projection. Sensitivity sliders let you see how assumptions affect returns, an audit log shows the formula behind every number, and it exports a PDF report.',
}
{
  id: 'pv-projectmgmt',
  description:
    'A prototype of project management tooling for utility-scale solar. It tracks tasks, documents, designs, and financials in one place, with a 3D site viewer and a digital twin panel for monitoring. Everything runs client-side with mocked data, so it is easy to demo without a backend.',
}
{
  id: 'design-versioning',
  description:
    'A Hub-flavored prototype for grouping design pushes into Sites and versioning them. It lets a user compare versions side by side, leave scoped comments, and follow a design from Phase 1 to Phase 2.',
}
{
  id: 'lcoe-redesign',
  description:
    'A prototype that moves solar LCOE modeling from the project level down to the design level. It auto-populates CAPEX from design components so the financial model stays tied to the actual bill of materials.',
}
{
  id: 'yield-auto-populate',
  description:
    'A prototype that fills in yield-analysis inputs by pulling data from design and site context. It reduces the manual entry needed before running a production simulation.',
}
{
  id: 'pm-insights',
  description:
    'A PM intelligence dashboard prototype. It aggregates product research, competitive intel, and analytics into one view with AI-powered analysis pipelines. The screenshots show only non-confidential flows.',
}
```

Play projects:

```ts
{
  id: 'ai-tng',
  description:
    'A Star Trek narrative game built inside an LCARS interface. Each crew member is a Gemini character agent, and a narrative director keeps the scene moving. Deterministic fallbacks keep the game alive when the API is down.',
}
{
  id: 'dnd-2024-game',
  description:
    'A browser implementation of the D&D 2024 rules: party creation, turn-based combat, 390 spells, and a playable adventure module. The rules engine is written in pure TypeScript with heavy test coverage.',
}
{
  id: 'mtg-game',
  description:
    'A deterministic Magic: The Gathering rules engine with a local hotseat play surface. It imports real cards via MTGJSON and Scryfall, compiles them into engine definitions, and renders a 3D tabletop.',
}
{
  id: 'series-library',
  description:
    'A personal catalog of around 2,300 IMDb-rated genre series. It filters by year, score, seasons, and trend, and syncs watch state from a local Plex library.',
}
{
  id: 'image-picker',
  description:
    'A daily ritual app that serves one random AI portrait per day from a curated pool. It also generates new portraits by calling the local Codex image tool, with prompts and style controls.',
}
{
  id: 'aih-daily',
  description:
    'A personal health diary for tracking medication, symptoms, vitals, and blood work. It writes entries to a private Google Sheet and is designed as a mobile PWA.',
}
```

- [ ] **Step 2: Run the full check suite**

```bash
npm test -- --run
npm run lint
npx tsc --noEmit
```

Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add content/projects.ts
git commit -m "Expand project descriptions with codebase-specific detail"
```

---

### Task 6: Final verification

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 2: Sanity check in the running dev server**

Open http://localhost:3000/projects, expand a project, click a screenshot, verify the lightbox opens, and use the arrow keys to move between images.

- [ ] **Step 3: Commit any remaining changes**

If the build produced no changes, there is nothing to commit.

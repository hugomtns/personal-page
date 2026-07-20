# Project garden lightbox + expanded descriptions

## Goal
Make the `/projects` screenshot gallery more useful by letting visitors click any image to see it at full size, and give each project a richer written explanation.

## Data model changes

In `content/projects.ts`, add one optional field to `Project`:

```ts
captions?: string[];
```

- Same length as `images` when provided.
- Missing captions fall back to a generic label.

The existing `description` field is kept but expanded per project with codebase-specific detail.

## UI

- In `ProjectDetail`, wrap each `Screenshot` in a `button` with `aria-label="View larger image"`.
- Clicking opens the existing `Modal` component with:
  - Title: `${project.name} — ${caption ?? `Screenshot ${i + 1}`}`
  - Body: the full 1200×750 image, centered, with the optional caption below it.
- The modal uses a wider container (`max-w-5xl`) so the enlarged image is visibly larger than the gallery thumbnails.

## Interaction

- `Escape` closes the lightbox (already handled by `Modal`).
- `ArrowLeft` / `ArrowRight` move to the previous/next image while the modal is open.
- Focus returns to the triggering thumbnail on close (handled by `Modal`).

## Accessibility

- Buttons have visible focus, correct labels, and are keyboard reachable.
- Captions are plain text.

## Tests

Add or extend `components/ProjectDetail.test.tsx` to cover:

- clicking a screenshot opens the modal,
- left/right arrows navigate between images,
- missing captions fall back to generic text.

## Out of scope

- Swipe gestures on mobile.
- Pinch-to-zoom.
- Markdown or rich formatting in captions.

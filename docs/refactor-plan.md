# Refactor & Visual Refresh Plan

Branch: `refactor`. Written 2026-07-19. This file lives in `docs/` (gitignored, local
only). It is designed to be executed phase by phase, by agents across multiple
sessions. Each phase is independently shippable and leaves the test suite green.

Read `AGENTS.md` first. Everything in it still applies.

---

## Guardrails (do not regress, ever)

These are documented, tested decisions. The refactor must not touch their behavior:

- **Booking iframe click-to-load**: `Modal` returns null when closed; the iframe
  mounts only on click. `components/BookingButton.test.tsx` asserts zero iframes
  pre-click. Keep true.
- **Modal is hand-rolled**, not `<dialog>` (jsdom 29 has no `showModal`). Do not
  swap in Radix/native dialog.
- **`Button` is the site's one button** (accent bg + `text-bg`). No new button
  variants.
- **Guard tests are policy, red = blocked change**: `app/globals.test.ts`
  (contrast AA), `app/unlaunched-routes.test.tsx` (gated routes 404),
  `app/cv/page.test.tsx` (no CV download link).
- **`live: false` routes must `notFound()`**. Unlinked ≠ private.
- **No CV PDF** anywhere in the repo or `public/`.
- **Font vars on `<html>`**, theme colors bound via `@theme inline`, never
  self-referencing keys.
- **`cursor: pointer` restored site-wide** in `globals.css`; add new clickable
  controls to that rule, not per-component utilities.
- **Copy voice rules** (AGENTS.md): no em dashes, no availability signalling,
  state the fact and stop, no layout narration, no inspirational filler.
- **Reduced motion must assert the visible state** (`style.opacity === '1'`),
  and reduced-motion tests need their own file (module-level singleton).
- **`vi.hoisted()`** for mock fns.

## Verification commands

```bash
npm test           # vitest run, must stay green after every phase
npm run lint
npm run build
```

Visual checks (CSS/motion phases): `puppeteer-core` + real Chrome per AGENTS.md
tooling notes (`domcontentloaded`, step-scroll before fullPage screenshots,
`rm -rf .next` if a CSS change serves stale).

---

## Phase 0 — Correctness fixes (no visual change)

Small, high-value fixes found during analysis. Each is its own commit candidate.

1. **SkipLink dark-theme contrast fail** — `components/SkipLink.tsx:5` uses
   `focus:bg-accent focus:text-white`; white on the dark accent `#6b8aff` is
   ~3.1:1, below AA. Change to `focus:text-bg` (matches Button's AA-by-
   construction pairing). Extend `app/globals.test.ts` to pin the
   accent-on-`text-bg` pairing in both themes.
2. **Add `muted` contrast assertions** to `app/globals.test.ts` — `text-muted`
   carries real content (taglines, dates, `.label`) but is unpinned. Both
   current values pass (light ~5.1:1, dark ~6.9:1); the guard protects future
   palette tweaks.
3. **Asymmetric route gating** — `app/about/page.tsx:10` and
   `app/contact/page.tsx:9` apply `noindex` when not live but never call
   `notFound()`, unlike CV/Projects. **Decision point for Hugo**: (a) add
   `if (!isLive(...)) notFound()` to both, symmetric with the policy, or
   (b) delete the dead `noindex` branches and document that only CV/Projects
   are gateable. Recommend (a). Extend `app/unlaunched-routes.test.tsx` to
   cover all four routes either way.
4. **zod v4 deprecation** — `lib/contact-schema.ts:5`: `z.string().email()` →
   `z.email()`.
5. **Dead exports** — delete `ContactInput` (`lib/contact-schema.ts:11`,
   unused); drop `export` from `PORTRAIT_FILE` (`components/Portrait.tsx:5`).
6. **Stale comments** — `content/site.ts:36` (`nav` JSDoc) and
   `app/sitemap.ts:5-6` still claim gated pages preview; they `notFound()`.
   Rewrite both to match reality.
7. **Single-source metadata** — the description string is duplicated in
   `app/layout.tsx:25-26` and `app/about/page.tsx:8-9`. Move to
   `content/site.ts` as `site.description`. Add `title.template:
   '%s — Hugo Martins'` in root layout metadata; reduce page titles to bare
   strings.
8. **Empty scaffold** — remove the placeholder comment in `next.config.ts`.

**Exit criteria**: tests green (including new contrast assertions), lint clean,
no visual diff.

---

## Phase 1 — Design tokens (foundation for everything after)

Extend `app/globals.css` `@theme inline`, respecting the existing binding
pattern (keys reference `--*` vars, never self-reference). All palette changes
must keep `app/globals.test.ts` green.

1. **Surface tokens** — the card fill
   `bg-[color-mix(in_oklab,var(--muted)_4%,transparent)]` is repeated verbatim
   at `components/CVCompany.tsx:44`, `components/ProjectTile.tsx:60`,
   `components/ProjectDetail.tsx:20`; the 8% variant at `CVProduct.tsx:67` and
   `ProjectTile.tsx:28`; an ad-hoc `bg-fg/[0.02]` at `Portrait.tsx:19`. Name
   them:

   ```css
   --color-surface: color-mix(in oklab, var(--muted) 4%, transparent);
   --color-surface-strong: color-mix(in oklab, var(--muted) 8%, transparent);
   ```

   Derived from `--muted`, so they switch themes for free. Replace all
   literals with `bg-surface` / `bg-surface-strong`.
2. **`--text-h3`** — absorbs the bespoke clamps at `CVCompany.tsx:64`
   (`clamp(1.75rem,3.2vw,2.6rem)`) and `CVProduct.tsx:46` (`1.0625rem` stays
   as-is or gets its own step; decide during implementation).
3. **Radius tiers** — declare the three tiers already shipped:
   `--radius-frame` (0.375rem, screenshot frames), `--radius-panel` (0.5rem,
   modal/portrait), `--radius-card` (0.75rem, cards). Replace literals.
   `rounded-full` pills stay as-is.
4. **Utility syntax sweep** — `@theme inline` already generates `text-h1`,
   `text-display`, etc. Replace all `text-[length: var(--text-*)]` literals
   (written with a space here so Tailwind's content scan does not pick the
   doc up as a class candidate; the real syntax has no space)
   (`Hero.tsx:27,43`, `ContactForm.tsx:42`, `ProjectDetail.tsx:23`,
   `ProjectTile.tsx:71`, all four page headings, `cv/page.tsx:39,55`).
5. **`lib/motion.ts`** — new module for JS-driven values (can't be CSS keys):

   ```ts
   export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // currently 5 copies
   export const DURATION = { fast: 0.18, panel: 0.35, reveal: 0.5 } as const;
   ```

   Replace the inline easings at `Header.tsx:126`, `CVCompany.tsx:78`,
   `CVProduct.tsx:61`, `ProjectGarden.tsx:71`, `CVTimeline.tsx:28`, and the
   scattered durations.
6. **Optional**: named z-index values (`--z-header: 40`, `--z-modal: 50`) with
   a comment. Low value; skip if it adds noise.

**Exit criteria**: zero visual diff, tests green, no `color-mix` or
`text-[length: ...]` literals left outside `globals.css`.

---

## Phase 2 — Primitives (in-repo design system, no third-party DS)

Decision from analysis: **no shadcn/ui, no Radix**. The site is ~18 components
with a bespoke visual language (timeline trunks, in-flow garden panels), a
documented hand-rolled-Modal test philosophy, and an LCP budget. The token
layer is 80% done; the missing 20% is primitives. Revisit Radix only if
form-heavy UI (selects, popovers, toasts) ever lands.

New components go flat in `components/`, one per file, colocated test, doc
comment explaining *why* (matching `Button.tsx` convention).

1. **`IconButton.tsx`** — absorbs six instances of
   `grid size-11 place-items-center` + negative-margin + hover color:
   `Header.tsx:83`, `Modal.tsx:106`, `ProjectDetail.tsx:30`,
   `ThemeToggle.tsx:33`, `SocialLinks.tsx:29,38`. Ships the shared close-X
   glyph (duplicated byte-for-byte at `Modal.tsx:108-117` and
   `ProjectDetail.tsx:32-41`; also settles the `aria-hidden` inconsistency).
2. **`Accordion.tsx`** — button + `aria-expanded` + the `AnimatePresence`
   height-reveal block duplicated at `CVCompany.tsx:72-114`,
   `CVProduct.tsx:55-103`, `ProjectGarden.tsx:62-76` (same 0.35s + easing,
   same reduced-motion handling). Bakes in reduced-motion behavior. Needs its
   own test **plus** a separate reduced-motion test file (singleton rule).
   This also closes the coverage gap on the leadership-milestone branch
   (`audience === ''` → Scope instead of Problem, `CVProduct.tsx:21,82-88`).
3. **`Card.tsx`** — bordered surface, `interactive` variant (hover/open accent
   border) and static variant. Consumed by CVCompany, ProjectTile,
   ProjectDetail.
4. **`Screenshot.tsx`** — promote from `ProjectTile.tsx:17-40` to its own
   file; use it in `CVProduct.tsx:67-80` (currently hand-rolled duplicate).
5. **`MetaList.tsx`** — the `border-l border-accent pl-6` + `<dl>` block from
   `CVCompany.tsx:83-93` and `CVProduct.tsx:84-98`. Also absorbs the
   Education/Certifications twin blocks in `app/cv/page.tsx:31-61` if the
   shape fits.
6. **`PageShell.tsx`** — the `mx-auto max-w-5xl px-6 py-20` shell + h1 heading
   repeated across all four pages.
7. **`ExternalLink.tsx`** (optional, small) — `target`/`rel`/underline pattern
   from `CVCompany.tsx:99-107` and `SocialLinks.tsx:24-41`.

Do **not** create Tag/Pill/Badge primitives; nothing wears that pattern,
`.label` covers metadata.

Also in this phase:

- **`useSyncExternalStore` for matchMedia** in `ProjectGarden.tsx:29-36`
  (replaces useState+useEffect remount dance). Extract `rowEndFor`
  (`ProjectGarden.tsx:41-42`) as a pure exported function and unit-test the
  2-col/3-col/last-item edge cases; name the `640px` breakpoint constant and
  tie it to the grid classes in a comment.
- **Fix brittle test** `app/projects/page.test.tsx:30-44`: derive from
  `projects[0].name`, assert role/structure instead of hardcoded placeholder
  text and occurrence counts.
- **Consistent React type imports** — explicit `import type { ... }` in
  `ContactForm.tsx:13`, `Modal.tsx:13`, `ThemeProvider.tsx:8` (matching
  `Button.tsx:1`).
- Optional: drop redundant `'use client'` from `ProjectTile.tsx:1`,
  `ProjectDetail.tsx:1`, `CVProduct.tsx:1`, `CVCompany.tsx:1` (only imported
  by client components). Flagged, not required; keeping them is defensible.

**Exit criteria**: each primitive has a test; CV accordion behavior covered;
`rowEndFor` unit-tested; suite green; zero visual diff.

---

## Phase 3 — Visual refresh (design research applied)

Research basis: 2025-26 top portfolios (rauno.me, emilkowal.ski,
linusrogge.com, cydstumpel.nl, paco.me). Direction: raise the craft ceiling,
keep the restraint. Typography and spacing carry the quality signal; the
accent stays scarce. Nothing below changes information architecture or copy
(copy changes, if any, follow AGENTS.md voice rules and are Hugo's call).

Ordered by impact. Each item is independently shippable; all motion items must
fall back to opacity-only/visible under `useReducedMotion()` and keep the
`style.opacity === '1'` test contract.

1. **Oversized masked-reveal hero** — the single highest-impact upgrade.
   Push the hero headline much larger (clamp up to ~8-10vw), tighten tracking,
   reveal each line sliding up from an `overflow: hidden` clip with a small
   stagger (`motion.span` + variants + `staggerChildren`). Space Grotesk 600
   already suits this. Body copy stays ragged right (Windows hyphens caveat,
   do not retry `text-justify`). Reference: rauno.me.
2. **Mono metadata layer** — add Geist Mono via `next/font` (Geist is already
   loaded; same family DNA). Use it for dates, section indices (`01 / Work`),
   locations, the `.label` class. Apply to CV timeline entries and project
   rows. Adds editorial structure with zero visual mass. Reference:
   linusrogge.com.
3. **Unified micro-interaction timing** — one duration/easing scale for every
   interactive element (built on Phase 1's `lib/motion.ts`): link underline
   sweeps (CSS-only), card hover choreography, icon nudges.
   (The magnetic CTA originally planned here shipped and was then removed:
   Hugo saw it live and rejected the effect.)
4. **Spring-based garden accordion** — after Phase 2's `Accordion`, give the
   projects garden a height/layout spring (stiffness ~300, damping ~30) so
   expansion feels physical. This is the restrained version of the
   list-to-detail continuity pattern (cydstumpel.nl) without route
   transitions.
5. **`::selection` in accent** + **dark-tone tuning** — style selection in the
   accent (zero-risk craft detail). Audit dark tones so dark mode reads
   designed, not inverted (warm off-white / warm near-black endpoints are
   already close). Keep the AA guard green.
6. **Scroll progress hairline** — 1px accent bar at top of long pages (CV,
   About) via `useScroll` + `scaleX`. Invisible until scroll.
7. **Ambient detail** — one mono line, e.g. "Berlin — 14:32 CET", in footer or
   header corner. Cheap, human, keeps the site feeling maintained. Update on
   an interval; render server-safe (no hydration mismatch — render nothing or
   a placeholder until mounted).
8. **Weight-axis hover** — Space Grotesk is variable; try 400→500 weight
   shift on link hover instead of color-only changes. Subtle; evaluate in
   browser, drop if it causes layout shift.

Explicitly **avoid** (research-backed, clashes with the brand): scroll-jacking
/Lenis, custom cursors, preloaders, marquee tickers, mesh/aurora gradients,
3D/Spline objects, neo-brutalism, horizontal-scroll sections, AI-generated
imagery, route-level View Transitions during theme toggle (flash risk with
next-themes).

**Exit criteria**: tests green (update/extend motion tests, new reduced-motion
file for the hero reveal), lint clean, build clean, puppeteer screenshots of
all four pages in both themes reviewed by Hugo before merge.

---

## Phase 4 — Final pass

1. Full suite + lint + build.
2. Puppeteer walkthrough: all live pages, both themes, mobile (390px) and
   desktop widths, step-scroll before fullPage captures. Check the header
   menu-button selector trap when scripting clicks (AGENTS.md).
3. Self-review against `code-review-checklist` skill.
4. Confirm no personal documents, no `public/` additions without asking, no
   availability-signalling copy.
5. Present diff summary to Hugo. Do not merge or push without explicit
   approval; remember Vercel SHA-dedupe and preview-SSO caveats when
   verifying deploys.

---

## Sequencing rationale

Phase 0 fixes real bugs first (SkipLink contrast, gating asymmetry) so later
phases build on correct behavior. Phase 1 tokens must land before Phase 2
primitives (primitives consume tokens) and before Phase 3 (micro-interactions
consume `lib/motion.ts`). Phase 2's `Accordion` must land before Phase 3's
spring upgrade. Everything else within a phase is order-independent.

## Decisions (locked 2026-07-19)

- Phase 0.3: **symmetric `notFound()` gating** — About/Contact get the same
  guard as CV/Projects (option a). Hugo deferred to the recommendation.
- Phase 3: **implement everything**, items 1-8, as thorough as possible.
  Hugo explicitly asked for maximum thoroughness on visuals.
- Any copy changes that fall out of the visual work are Hugo's to write.

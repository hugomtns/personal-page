# personal-page

Source for [hugomartins.pm](https://hugomartins.pm) — the personal site of Hugo Martins, Senior Product Manager (Berlin).

## Stack

Next.js (App Router) · TypeScript · Tailwind v4 · Motion · Vitest · deployed on Vercel.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest
npm run lint
npm run build
```

## Structure

```
app/          routes, API handlers, OG image, favicon
components/   UI
content/      site config, nav, CV data, About copy
lib/          shared schema
assets/       build-time files (fonts) — NOT served
public/       served verbatim to anyone, no exceptions
test/         setup
```

## Two things that are easy to break

**`public/` is public.** Anything in it is downloadable by anyone who guesses the
URL, whatever the nav shows and whatever `robots.txt` says. A PDF can't even
carry a `noindex` tag. Files needed at build time but not by visitors belong in
`assets/` — that's why the fonts live there.

**The CV PDF is deliberately not in this repo.** Not in `public/`, not in
`assets/`, no download route, no `cvPdfPath`. The CV is sent deliberately, not
collected by whoever finds the page. `app/cv/page.test.tsx` fails if a download
link reappears.

## Shipping a tab

`content/site.ts` holds the nav, each entry flagged `live`. A tab with
`live: false` is hidden from the nav, dropped from the sitemap, marked
`noindex`, **and its route returns 404** — the page genuinely does not resolve
until it ships. The 404 is the part that matters: the rest is only advertising,
and an unadvertised page is still a public one.

Shipping a finished tab is flipping that one flag.
`app/unlaunched-routes.test.tsx` covers both states.

## Environment

Copy `.env.local.example` to `.env.local` (gitignored) and fill in:

- `RESEND_API_KEY` — contact form delivery ([resend.com/api-keys](https://resend.com/api-keys))
- `CONTACT_TO_EMAIL` — where submissions land

Vercel does not read `.env.local`. The same variables must be set in the Vercel
project, or the form works locally and fails silently in production.

Note `.env.local.example` is tracked — the gitignore rule is `.env*.local`,
which does not match the `.example` suffix. Placeholders only, never real keys.

export const site = {
  name: 'Hugo Martins',
  role: 'Product Builder',
  location: 'Berlin, Germany',
  url: 'https://hugomartins.pm',
  description:
    'Product manager in Berlin. Eleven years building software products, mostly in B2B SaaS.',

  // Google Calendar appointment schedule ("Chat with Hugo", 30 min).
  // Swapping to Cal.com is a change to this line and nothing else.
  //
  // This is the long form of the calendar.app.google/ZFkK9vXtqmqpuDxP6 share
  // link, used deliberately. The short link 302s here, and that redirect hop
  // carries X-Frame-Options: SAMEORIGIN — Chrome ignores it (only the final
  // rendered document is checked) and the embed does work, but relying on that
  // across every browser is a bet with no upside. The long URL has no XFO
  // anywhere in the chain and skips the redirect. `?gv=true` is not needed;
  // it renders identically with and without.
  bookingUrl:
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0y2_E6lKQfqRiJEK-uZwPTQpYhHMxQVSl6TF3Ic9FHRkonfmu9Yj0A_Leacg7zbH-_2YPtLDRA',

  // No cvPdfPath, deliberately. The CV PDF is not in this repo and is not
  // served by the site: it goes out when Hugo sends it, not on a stranger's
  // click. Anything in public/ is downloadable by anyone who guesses the URL,
  // whatever the nav shows — so the only reliable way to not hand it out is to
  // not ship it.

  links: {
    linkedin: 'https://linkedin.com/in/hugommartins',
    github: 'https://github.com/hugomtns', // profile only — never per-project
  },
} as const;

/**
 * The tabs, and whether each is finished enough to be seen.
 *
 * `live: false` hides a tab from the nav, keeps it out of the sitemap, marks
 * the page noindex, and 404s the route itself: the page calls notFound().
 * Unlinked is not private, so a gated tab genuinely does not resolve until it
 * ships. Shipping a tab is a one-word change here.
 */
export type NavItem = { href: string; label: string; live: boolean };

export const nav: NavItem[] = [
  { href: '/about', label: 'About', live: true },
  { href: '/cv', label: 'CV', live: false },
  { href: '/projects', label: 'Projects', live: false },
  { href: '/contact', label: 'Contact', live: true },
];

export const liveNav = () => nav.filter((item) => item.live);

export const isLive = (href: string) =>
  nav.some((item) => item.href === href && item.live);

export const site = {
  name: 'Hugo Martins',
  role: 'Senior Product Manager',
  location: 'Berlin, Germany',
  url: 'https://hugomartins.pm',

  // Google Calendar appointment schedule.
  // Swapping to Cal.com is a change to this line and nothing else.
  bookingUrl: 'https://calendar.google.com/calendar/appointments/REPLACE_ME',

  cvPdfPath: '/hugo-martins-cv.pdf',

  links: {
    linkedin: 'https://linkedin.com/in/hugommartins',
    github: 'https://github.com/hugomtns', // profile only — never per-project
  },
} as const;

/**
 * The tabs, and whether each is finished enough to be seen.
 *
 * `live: false` hides a tab from the nav, keeps it out of the sitemap, and
 * marks the page noindex. The URL still works, so it can be previewed — but a
 * half-built page that Google has already indexed is worse than no page.
 * Shipping a tab is a one-word change here.
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

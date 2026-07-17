// PLACEHOLDER content for the timeline redesign. Two tiers: companies are the
// chapters, products are what happened inside them. Prose under About / My role
// / Problem / What I did / Outcome is lorem, marked as such, so the layout can
// be judged at real density before Hugo writes the copy. Names, dates,
// taglines, audiences and the headline metrics are real — they set the shape.

export type MilestoneLink = { label: string; href: string };

export type Education = { degree: string; institution: string; years: string };
export type Certification = { name: string; issuer: string; date: string };

export type Product = {
  id: string;
  name: string;
  year: string;
  /** One line shown while collapsed. */
  tagline: string;
  /** Who it was for. */
  audience: string;
  problem: string;
  did: string;
  outcome: string;
  /** Optional image. Null renders the placeholder frame. */
  image: string | null;
};

export type Company = {
  id: string;
  name: string;
  /** Rail label, e.g. "2014 — 2019". */
  dates: string;
  /** One line shown next to the company name. */
  tagline: string;
  about: string;
  /** Company-level contribution. For ResearchGate this carries the Product Ops
      leadership arc — the two-tier model makes the leadership story belong
      here, not in a product node. */
  role: string;
  links: MilestoneLink[];
  products: Product[];
};

const LOREM =
  'Placeholder. Nulla facilisi. Morbi in sem quis dui placerat ornare. ' +
  'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. ' +
  'Curabitur pretium tincidunt lacus, nulla gravida orci a odio.';

export const companies: Company[] = [
  {
    id: 'researchgate',
    name: 'ResearchGate',
    dates: '2014 — 2019',
    tagline: 'Academic social network · Berlin',
    about: `About ResearchGate. ${LOREM}`,
    role: `My role. Product Operations Lead, then Product Manager. ${LOREM}`,
    links: [{ label: 'researchgate.net', href: 'https://www.researchgate.net' }],
    products: [
      {
        id: 'rg-ops',
        name: 'Product Operations',
        year: '2014',
        tagline: 'Built the function from zero to a team of eight.',
        audience: '', // leadership milestone — Scope, not audience
        problem: `Scope. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: 'A team of 8, with career growth and promotions.',
        image: null,
      },
      {
        id: 'rg-recruit',
        name: 'Scientific Recruitment',
        year: '2016',
        tagline: 'A paid recruitment product, zero to one.',
        audience: 'Scientists job-hunting, and the employers hiring them',
        problem: `Problem. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: '4M+ EUR ARR. 70% better matching quality via ML recommendations.',
        image: null,
      },
    ],
  },
  {
    id: 'helpling',
    name: 'Helpling',
    dates: '2019 — 2020',
    tagline: 'Home-services marketplace · Berlin',
    about: `About Helpling. ${LOREM}`,
    role: `My role. ${LOREM}`,
    links: [{ label: 'helpling.com', href: 'https://www.helpling.com' }],
    products: [
      {
        id: 'helpling-booking',
        name: 'Cleaner Booking',
        year: '2019',
        tagline: 'A new booking experience across web and mobile.',
        audience: 'People booking home cleaning',
        problem: `Problem. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: '4.5 stars, 2.5x the old rating. 90% less CS time on cancellations.',
        image: null,
      },
    ],
  },
  {
    id: 'medwing',
    name: 'Medwing',
    dates: '2020 — 2021',
    tagline: 'Healthcare staffing · Berlin',
    about: `About Medwing. ${LOREM}`,
    role: `My role. ${LOREM}`,
    links: [{ label: 'medwing.com', href: 'https://www.medwing.com' }],
    products: [
      {
        id: 'medwing-ats',
        name: 'ATS & Shift Management',
        year: '2020',
        tagline: 'Hiring tools, and a validated shift product.',
        audience: 'Care facilities hiring and scheduling staff',
        problem: `Problem. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: '80% faster onboarding. PMF validated across 50+ facilities.',
        image: null,
      },
    ],
  },
  {
    id: 'staffbase',
    name: 'Staffbase',
    dates: '2022 — 2024',
    tagline: 'Employee comms platform · Berlin',
    about: `About Staffbase. ${LOREM}`,
    role: `My role. Led the analytics product group across multiple teams. ${LOREM}`,
    links: [{ label: 'staffbase.com', href: 'https://staffbase.com' }],
    products: [
      {
        id: 'sb-analytics',
        name: 'Analytics Platform',
        year: '2022',
        tagline: 'The core analytics platform, rebuilt.',
        audience: 'Internal comms leads at enterprise scale',
        problem: `Problem. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: 'CSAT 45% to 95%. 3M EUR ARR through enterprise deals.',
        image: null,
      },
      {
        id: 'sb-smart',
        name: 'Smart Impact',
        year: '2023',
        tagline: 'A data-driven comms product, zero to launch.',
        audience: 'Comms teams measuring reach and sentiment',
        problem: `Problem. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: '150% over the adoption goal in Q1.',
        image: null,
      },
    ],
  },
  {
    id: 'pvcase',
    name: 'PVcase',
    dates: '2024 — Now',
    tagline: 'Renewable-energy design software · Berlin',
    about: `About PVcase. ${LOREM}`,
    role: `My role. ${LOREM}`,
    links: [{ label: 'pvcase.com', href: 'https://pvcase.com' }],
    products: [
      {
        id: 'pv-ground',
        name: 'Ground Mount',
        year: '2024',
        tagline: 'The flagship AutoCAD solar-design product.',
        audience: 'Solar engineers designing utility-scale PV plants',
        problem: `Problem. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: '500k+ ARR in new sales.',
        image: null,
      },
      {
        id: 'pv-hub',
        name: 'Hub',
        year: '2025',
        tagline: 'A collaborative web platform, zero to one.',
        audience: 'Solar teams collaborating across a project',
        problem: `Problem. ${LOREM}`,
        did: `What I did. ${LOREM}`,
        outcome: 'Placeholder. Shipped through Alpha and Beta.',
        image: null,
      },
    ],
  },
];

// Real data (not placeholder) — carried over from the old cv.ts.
export const education: Education[] = [
  {
    degree: 'MSc, Bioinformatics',
    institution: 'Aarhus University, Denmark',
    years: '2008 – 2011',
  },
  {
    degree: 'BSc, Biochemistry',
    institution: 'Universidade do Porto, Portugal',
    years: '1999 – 2004',
  },
];

export const certifications: Certification[] = [
  { name: 'Agentic AI Nanodegree', issuer: 'Udacity', date: 'Oct 2025' },
  { name: 'Generative AI Nanodegree', issuer: 'Udacity', date: 'Aug 2025' },
];

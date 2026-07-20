export const comingSoon = false;

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
  /** Which section the project belongs to. */
  group: 'work' | 'play';
};

export const projects: Project[] = [
  // Work
  {
    id: 'pvfinance',
    name: 'PV Finance',
    tagline: 'Solar project finance in the browser.',
    description:
      'A browser-side financial model for utility-scale solar projects. It takes project parameters and runs IRR, NPV, LCOE, debt sizing, and a 25-year cash-flow projection. An audit log shows the formula behind every number, and it exports a PDF report.',
    images: [
      '/images/projects/pvfinance/01.webp',
      '/images/projects/pvfinance/02.webp',
      '/images/projects/pvfinance/03.webp',
      '/images/projects/pvfinance/04.webp',
      '/images/projects/pvfinance/05.webp',
      '/images/projects/pvfinance/06.webp',
      '/images/projects/pvfinance/07.webp',
      '/images/projects/pvfinance/08.webp',
    ],
    group: 'work',
  },
  {
    id: 'pv-projectmgmt',
    name: 'PV Project Management',
    tagline: 'Solar project management with a 3D site view.',
    description:
      'A prototype of project management tooling for utility-scale solar. It tracks tasks, documents, designs, and financials, with a 3D site viewer and a digital twin panel for monitoring. Everything runs client-side with mocked data.',
    images: [
      '/images/projects/pv-projectmgmt/01.webp',
      '/images/projects/pv-projectmgmt/02.webp',
      '/images/projects/pv-projectmgmt/03.webp',
      '/images/projects/pv-projectmgmt/04.webp',
      '/images/projects/pv-projectmgmt/05.webp',
      '/images/projects/pv-projectmgmt/06.webp',
      '/images/projects/pv-projectmgmt/07.webp',
      '/images/projects/pv-projectmgmt/08.webp',
    ],
    group: 'work',
  },
  {
    id: 'design-versioning',
    name: 'Design Versioning',
    tagline: 'Versioning design pushes by Site.',
    description:
      'A Hub-flavored prototype for grouping design pushes into Sites and versioning them. It lets a user compare versions, leave scoped comments, and follow the design from Phase 1 to Phase 2.',
    images: [
      '/images/projects/design-versioning/01.webp',
      '/images/projects/design-versioning/02.webp',
      '/images/projects/design-versioning/03.webp',
      '/images/projects/design-versioning/04.webp',
      '/images/projects/design-versioning/05.webp',
    ],
    group: 'work',
  },
  {
    id: 'lcoe-redesign',
    name: 'LCOE Redesign',
    tagline: 'Design-level solar cost modeling.',
    description:
      'A prototype that moves solar LCOE modeling from the project level down to the design level. It auto-populates CAPEX from design components so the financial model stays tied to the actual bill of materials.',
    images: [null],
    group: 'work',
  },
  {
    id: 'yield-auto-populate',
    name: 'Yield Auto-Populate',
    tagline: 'Auto-populate solar yield inputs.',
    description:
      'A prototype that fills in yield-analysis inputs by pulling data from design and site context. It reduces the manual entry needed before running a production simulation.',
    images: [null],
    group: 'work',
  },
  {
    id: 'pm-insights',
    name: 'PM Insights',
    tagline: 'Product intelligence dashboard.',
    description:
      'A PM intelligence dashboard prototype. It aggregates product research, competitive intel, and analytics into one view with AI-powered analysis pipelines.',
    images: [null],
    group: 'work',
  },
  // Play
  {
    id: 'ai-tng',
    name: 'Project Ten Forward',
    tagline: 'A Star Trek agent game in LCARS.',
    description:
      'A Star Trek narrative game built inside an LCARS interface. Each crew member is a Gemini character agent, and a narrative director keeps the scene moving. Deterministic fallbacks keep the game alive when the API is down.',
    images: [null],
    group: 'play',
  },
  {
    id: 'dnd-2024-game',
    name: 'D&D 2024 Game',
    tagline: 'D&D 2024 rules engine and campaign.',
    description:
      'A browser implementation of the D&D 2024 rules: party creation, turn-based combat, 390 spells, and a playable adventure module. The rules engine is written in pure TypeScript with heavy test coverage.',
    images: [null],
    group: 'play',
  },
  {
    id: 'mtg-game',
    name: 'MTG Game',
    tagline: 'Deterministic MTG rules engine.',
    description:
      'A deterministic Magic: The Gathering rules engine with a local hotseat play surface. It imports real cards via MTGJSON and Scryfall, compiles them into engine definitions, and renders a 3D tabletop.',
    images: [null],
    group: 'play',
  },
  {
    id: 'series-library',
    name: 'Series Library',
    tagline: 'A personal what-to-watch catalog.',
    description:
      'A personal catalog of around 2,300 IMDb-rated genre series. It filters by year, score, seasons, and trend, and syncs watch state from a local Plex library.',
    images: [null],
    group: 'play',
  },
  {
    id: 'image-picker',
    name: 'Image Picker',
    tagline: 'One AI portrait per day.',
    description:
      'A daily ritual app that serves one random AI portrait per day from a curated pool. It also generates new portraits by calling the local Codex image tool, with prompts and style controls.',
    images: [null],
    group: 'play',
  },
  {
    id: 'aih-daily',
    name: 'AIH Daily',
    tagline: 'A private health diary.',
    description:
      'A personal health diary for tracking medication, symptoms, vitals, and blood work. It writes entries to a private Google Sheet and is designed as a mobile PWA.',
    images: [null],
    group: 'play',
  },
];

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
  /** Optional plain-text caption for each image, used by the lightbox. */
  captions?: string[];
  /** Whether the screenshots are portrait (mobile) rather than 16:10 landscape. */
  portrait?: boolean;
  /** Optional longer multi-paragraph copy shown below the summary. */
  details?: string;
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
      'A browser-side financial model for utility-scale solar projects. It takes project parameters and runs IRR, NPV, LCOE, debt sizing, and a 25-year cash-flow projection. Sensitivity sliders let you see how assumptions affect returns, an audit log shows the formula behind every number, and it exports a PDF report.',
    details: `I built this prototype iteratively with a customer who had a very specific pain: it was difficult for them to model financial returns on sales proposals for solar projects, as they were working all out of spreadsheets.

The preparation work involved a lot of research into PV finance for solar projects, mapping out input variables and output KPIs, all the calculations and intermediate variables until I had a reasonably clear picture in my mind of what to build.

The first prototype had just calculations from basic inputs and was slowly expanded to accommodate for bills of materials (BoMs), commercial margins, annual and monthly cash flow breakdowns and a PDF output generator. Lastly, I added templates so that users could store and load predetermined sets of BoMs and margins for reproducible proposals.

The application, while not up to speed with a SaaS solution, allowed us to understand and tweak what had to be done to deliver a simple yet functional financial forecast tool for a PV business development team.`,
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
      'A prototype of project management tooling for utility-scale solar. It tracks tasks, documents, designs, and financials in one place, with a 3D site viewer and a digital twin panel for monitoring. Everything runs client-side with mocked data, so it is easy to demo without a backend.',
    details: `This project was very ambitious. It started as a quick demo to showcase the shadcn design system applied to the way we wanted to show projects on our main product page, and how we could swap between a table view and a kanban style view. Slowly, it grew to almost be a twin to the product itself, a staging area where I would throw ideas at it, test flows, and see if they could work.

It has a lot of what a project manager would need to properly admin a solar project, from conception to asset management. It has basic project creation, editing, user management, user groups for permissions, an RBAC model, and admin logs for auditing.

Each project can be enriched with milestones that are viewed in a timeline mode. Projects themselves have workflows that are fully customizable, tasks that can be assigned to users, and an in-app notification system to alert them of new tasks or upcoming deadlines.

There are many other sub-features, such as component lists, a partial version of the PV Finance prototype built into the management module, and generation of different types of checklists for maintenance, permitting, and notice to proceed or build. All data is generated procedurally.

The fun part is the KML and DXF viewer that allows the application to render the project in a simple Three.js environment, topped with satellite imagery from a free map provider. It can present solar panels and some electrical devices such as transformers and inverters, as well as guidelines for cables, strings, roads, paths, and project boundaries.

In this environment, the design can be commented on. Commenters can @ other users so they get a notification. Furthermore, there is a digital twin mode that simulates the live operation of the power plant as provided. There are a few bugs I never got around fixing, but it was a really cool exercise to test the waters on where the product might or might not go.

A lot of the ideas in this prototype actually made their way into the real product, or onto the roadmap for future iterations.`,
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
      'A Hub-flavored prototype for grouping design pushes into Sites and versioning them. It lets a user compare versions side by side, leave scoped comments, and follow a design from Phase 1 to Phase 2.',
    details: `This is an example of a brainstorming exercise using AI prototypes within the team. The problem was this: users needed a way to add multiple design versions inside a parent "design family" by exporting from the AutoCAD product into our collaboration platform. The status quo was that no designs were related per se, so they showed up separately in a big list.

We tried the concept of design parents and design versions here. In the background, we simulated designs having the same parent ID, so they were added as versions of a single design parent.

The user could then browse between multiple design versions inside the same UI, view or make comments across all versions, and evaluate differences in design metrics.

This discussion became the backbone of our approach to design versioning in the shipped product.`,
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
    images: [
      '/images/projects/lcoe-redesign/01.webp',
      '/images/projects/lcoe-redesign/02.webp',
      '/images/projects/lcoe-redesign/03.webp',
    ],
    group: 'work',
  },
  {
    id: 'yield-auto-populate',
    name: 'Yield Auto-Populate',
    tagline: 'Auto-populate solar yield inputs.',
    description:
      'A prototype that fills in yield-analysis inputs by pulling data from design and site context. It reduces the manual entry needed before running a production simulation.',
    images: [
      '/images/projects/yield-auto-populate/01.webp',
      '/images/projects/yield-auto-populate/02.webp',
      '/images/projects/yield-auto-populate/03.webp',
    ],
    group: 'work',
  },
  {
    id: 'pm-insights',
    name: 'PM Insights',
    tagline: 'Product intelligence dashboard.',
    description:
      'A PM intelligence dashboard prototype. It aggregates product research, competitive intel, and analytics into one view with AI-powered analysis pipelines. The screenshots show only non-confidential flows.',
    images: [
      '/images/projects/pm-insights/01.webp',
      '/images/projects/pm-insights/02.webp',
      '/images/projects/pm-insights/03.webp',
      '/images/projects/pm-insights/04.webp',
      '/images/projects/pm-insights/05.webp',
      '/images/projects/pm-insights/06.webp',
      '/images/projects/pm-insights/07.webp',
    ],
    group: 'work',
  },
  // Play
  {
    id: 'ai-tng',
    name: 'Project Ten Forward',
    tagline: 'A Star Trek agent game in LCARS.',
    description:
      'A Star Trek narrative game built inside an LCARS interface. Each crew member is a Gemini character agent, and a narrative director keeps the scene moving. Deterministic fallbacks keep the game alive when the API is down.',
    images: [
      '/images/projects/ai-tng/01.webp',
      '/images/projects/ai-tng/02.webp',
      '/images/projects/ai-tng/03.webp',
      '/images/projects/ai-tng/04.webp',
    ],
    group: 'play',
  },
  {
    id: 'dnd-2024-game',
    name: 'D&D 2024 Game',
    tagline: 'D&D 2024 rules engine and campaign.',
    description:
      'A browser implementation of the D&D 2024 rules: party creation, turn-based combat, 390 spells, and a playable adventure module. The rules engine is written in pure TypeScript with heavy test coverage.',
    images: [
      '/images/projects/dnd-2024-game/01.webp',
      '/images/projects/dnd-2024-game/02.webp',
      '/images/projects/dnd-2024-game/03.webp',
      '/images/projects/dnd-2024-game/04.webp',
      '/images/projects/dnd-2024-game/05.webp',
      '/images/projects/dnd-2024-game/06.webp',
      '/images/projects/dnd-2024-game/07.webp',
    ],
    group: 'play',
  },
  {
    id: 'mtg-game',
    name: 'MTG Game',
    tagline: 'Deterministic MTG rules engine.',
    description:
      'A deterministic Magic: The Gathering rules engine with a local hotseat play surface. It imports real cards via MTGJSON and Scryfall, compiles them into engine definitions, and renders a 3D tabletop.',
    images: [
      '/images/projects/mtg-game/01.webp',
      '/images/projects/mtg-game/02.webp',
      '/images/projects/mtg-game/03.webp',
      '/images/projects/mtg-game/04.webp',
      '/images/projects/mtg-game/05.webp',
    ],
    group: 'play',
  },
  {
    id: 'series-library',
    name: 'Series Library',
    tagline: 'A personal what-to-watch catalog.',
    description:
      'A personal catalog of around 2,300 IMDb-rated genre series. It filters by year, score, seasons, and trend, and syncs watch state from a local Plex library.',
    images: [
      '/images/projects/series-library/01.webp',
      '/images/projects/series-library/02.webp',
      '/images/projects/series-library/03.webp',
      '/images/projects/series-library/04.webp',
    ],
    group: 'play',
  },
  {
    id: 'image-picker',
    name: 'Image Picker',
    tagline: 'One AI portrait per day.',
    description:
      'A daily ritual app that serves one random AI portrait per day from a curated pool. It also generates new portraits by calling the local Codex image tool, with prompts and style controls.',
    images: [
      '/images/projects/image-picker/01.webp',
      '/images/projects/image-picker/02.webp',
      '/images/projects/image-picker/03.webp',
    ],
    group: 'play',
  },
  {
    id: 'aih-daily',
    name: 'AIH Daily',
    tagline: 'A private health diary.',
    description:
      'A personal health diary for tracking medication, symptoms, vitals, and blood work. It writes entries to a private Google Sheet and is designed as a mobile PWA.',
    images: [
      '/images/projects/aih-daily/01.webp',
      '/images/projects/aih-daily/02.webp',
      '/images/projects/aih-daily/03.webp',
      '/images/projects/aih-daily/04.webp',
    ],
    portrait: true,
    group: 'play',
  },
];

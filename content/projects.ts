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
    details: `Another example of AI prototyping supporting team discussions based on real user findings. Our product had a problem: financial calculations were presented at the project level, but users evaluated financial outcomes at the design level. They had to redo the calculations with every design upload, and the values were not persisted at the design level.

This approach changed that. We performed the calculations at the design level, made adjustments to the UI to allow more granular control over CAPEX and OPEX items, and let users mark a design as the "winner". Only the winning design would surface its financial details to the project level. That concept later evolved into a proper approval flow.

This prototype became the basis for a key iteration on our financial analysis product, which came out of a successful round of user feedback.`,
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
    details: `This is another simple prototype built to support a product iteration ideation phase. The status quo was that users always had to input the total energy generated by a design manually, even though other products in our ecosystem could export those calculations themselves.

In this design, we tested a way to tell the user where a prefilled energy production value, or yield, was coming from when ingestion succeeded. The prototype was also hooked up to our actual backend JSON parser, so we could test changes to the export payload live.

The automatic addition of energy calculation was a small but important milestone in demonstrating cross-product synergies and increasing user adoption.`,
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
    details: `This was the real deal. It was likely the most comprehensive prototype I have ever built, and I could call it a product of sorts, since I was using it almost daily to accelerate my own product workflows. It also spawned several skills that were placed in a common repository so other PMs could leverage the functionality via CLI.

It started as an exploration of my company's product stack in terms of APIs and MCPs, seeing what data could be retrieved and how, driven by a real problem: product management is mostly information and communication work. The information part can be a real problem, especially when all the data and feedback is scattered across a dozen tools that otherwise do not talk to one another.

The basis of the prototype is a series of connectors to APIs and MCPs for Atlassian, Mixpanel, ProductBoard, GitHub, Google Workspace, Dovetail, and other sources; pipelines for data ingestion that run on demand or on a schedule; and a first layer of entities: feedback, documents, Jira tickets, data events, codebase summaries, and more.

The second layer is inference. Intermediate data entities such as customers, features, opportunities, and others were inferred from parsing customer portal feedback, interviews, Slack threads, Mixpanel exports, and all other ingestion payloads. The initial bootstrap work was lengthy, but subsequent updates ran in a few minutes daily. The outcome was a connected graph, tying all ingested and inferred entities with real relationships.

What this enabled was a true end-to-end overview of how ideas and features come to be, from initial feedback or discussion to validation, delivery, and finally adoption. Keeping an eye on this path meant I could often argue for new opportunities with real data and quotes at the click of a button, easily defend choices and strategic decisions, and quickly generate reports on work in progress or feature adoption, all from the same place.

Not all of it worked. There were many other features I tried leveraging LLMs, mostly around writing artifacts and evaluating opportunities against one another using well-tried product frameworks. The generated text was fine for very short snippets, but the quality of long-form text was variable and often disappointing.

The prototype also had an "ask the product" chatbot that let you engage with the knowledge base directly. One key idea that came out of this, after testing a short-lived Slackbot built on it, was to try customer support functions by analyzing incoming customer questions and providing answers based on codebase knowledge. The pilot was very successful and moved into production candidate a month later.

All in all, this was a great learning experience in building knowledge bases, understanding what LLMs can and cannot do in a product context, and building something I would actually use daily rather than a throwaway prototype.`,
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
    details: `This was an attempt that started with a simple question: what if LLMs could be used to mimic NPCs in games?

The concept was a setting where short, open-ended interactions between a player and NPCs could occur, to see if emergent storytelling might happen. I chose Star Trek: The Next Generation as the setting. For this game, I instructed the LLM to mimic an LCARS user interface and used an agent architecture with a central coordinator to keep things running.

The main NPCs each have a dedicated agent with a markdown behavior file dictating personality type, how they act in different situations, how they respond to higher or lower ranks, and so on. All these files share the same structure. There are also generic secondary NPCs that can be spawned on the fly by a narrator agent, which writes a shorter but still usable personality block for each one.

The narrator is the puppet master, interacting with the user and the NPCs. Two more agents run in the background. A game state agent tracks locations, plot points, key items, inventories, and makes regular recordings of a game state file. A coordinator checks relationships, curates the tone of voice of NPCs, makes sure they react as they should, and sends output back for a redo when they do not.

The game works fine for small interactions or short sessions, but it starts losing the plot over time. NPCs struggle to keep track of player rank, for example, and the game has trouble tracking where NPCs and players are over time. The persistence layer was never very reliable. I may come back to it in the future, now that the models have improved substantially since I first began working on it.`,
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
    details: `This is an interactive game in the same line as Project Ten Forward, but with a few differences.

It is a rules-as-written application of the Dungeons & Dragons 2024 core rulebook, also known as 5.5E, with the classes, species, feats, backgrounds, and spells that come with it. The game engine has a text-driven, turn-based combat mechanic with action-economy monitoring, full character creation, and a character experience, progression, and leveling system. You can run an adventure controlling a party of up to six characters.

As with Ten Forward, it has NPC agents, a narrator agent, and a coordinator agent. New here is the battle arbiter, an agent in charge of running and resolving combat. Unlike Ten Forward, this game is built around a specific adventure book, in this case Dragons of Stormwreck Isle, which I own. The plot beats, events, and encounters can all be checked against the book, which minimizes the chance of deviation over time. But, as I learned, it does not completely avoid it.`,
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
    details: `This is the project I am actively working on, and it is quite ambitious. It is meant to be a full rendition of the ruleset of Magic: The Gathering across all expansions. The ruleset exists in a canonical form, and all the cards can be retrieved, with canonical rules, via an API. I thought it could be possible to build a full card game simulation on my machine, together with a system that would let me create my own fantasy cards and play them.

It is easier said than done. Creating a local database of cards and rules was the easy part, but converting the ruleset, over 800 rules in total, into reusable, modular code is a daunting task. Not many card properties are reusable, with the majority of cards having individually unique flavor. The current approach is to build rules based on how frequently a rule is mentioned in canonical card text, maximizing coverage early at the expense of a long tail of unplayable cards.

Card creation uses SVGs and assets from card editions, card types, and colors. You can mix and match any combination of assets to produce the desired card. A built-in image generation integration using OpenAI is also available to create custom card art. The UI lets you fine-tune the position of text elements and save those positions for a particular combination of card assets, since the text elements sit on a superimposed layer that is not always in a precise location.

Finally, the game has a top-down, 2D playing mat with the full match engine coded in. All the phases, allowed actions, and mana economy are handled, although the visuals of the playing mat itself are still far from complete.`,
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
    details: `One day I was thinking there might be some good TV series out there that I had not tried or even heard about, but recommendation systems keep feeding me the same things over and over. So I built my own little version of IMDb using unofficial APIs, since IMDb does not offer free public APIs. I use it, and share it in my household, to discover and mark new series to watch or to avoid.

The app is pretty simple: an interface for a local database that I can update on demand. The interface is mobile-friendly, so we can browse it from the couch. It retrieves series and season ratings for a specific set of categories. The database can also be filtered by year of first season, in addition to category and score. To top it off, it marks series as trending up, trending down, or a plain disaster, depending on the score difference between their last and first seasons, with a minimum of three seasons.

It is a handy tool, more responsive than IMDb's website, and already slimmed down to our needs.`,
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

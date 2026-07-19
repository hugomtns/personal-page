// The CV timeline. Two tiers: companies are the chapters, products are what
// happened inside them. All copy is real, written by Hugo (company About
// paragraphs researched and drafted for him, then reviewed). A product with
// an empty audience is a leadership milestone: it shows Scope instead of
// Problem and drops the For row.

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

export const companies: Company[] = [
  {
    id: 'researchgate',
    name: 'ResearchGate',
    dates: '2014 — 2019',
    tagline: 'Academic social network · Berlin',
    about:
      'ResearchGate is a social network for scientists: members share papers, data and negative results, and find collaborators. Founded in 2008, it grew from Boston to Berlin and reached around 15 million members by the late 2010s, backed by over $100M from investors including Benchmark, Founders Fund and Bill Gates. Membership is free; the revenue comes from advertising and recruiting for scientific markets.',
    role:
      'I started at ResearchGate as a part-time data curator, and after a break to finish my studies, I joined full-time. My job was to keep the scientific job posts accurate, in content and in how they were targeted, and to run the email campaigns sent to specific user segments. As demand grew, I built a product operations team around that workflow and ran it. After two years I moved into product management, taking over the scientific recruitment product I had helped launch from behind the scenes.',
    links: [{ label: 'researchgate.net', href: 'https://www.researchgate.net' }],
    products: [
      {
        id: 'rg-ops',
        name: 'Product Operations',
        year: '2014 – 2016',
        tagline: 'Built the function from zero to a team of eight.',
        audience: '', // leadership milestone — Scope, not audience
        problem:
          'The team owned the quality of every scientific job post on the platform: accurate content, accurate targeting to the right users, and the email campaigns that carried jobs to specific segments. On top of the daily workflow, the team\'s labeling work fed training data to the company\'s recommendation engine.',
        did:
          'Recruited the team from a pool of internal and external candidates, trained them, set up reporting lines and processes, and kept improving the workflow as volume grew. A large part of the job was the people: coaching, and creating the conditions for promotions. The multidisciplinary mix paid off directly: the quality of the labeling and targeting work helped us secure more clients.',
        outcome:
          'A team of 8, with career growth and promotions. Dozens of satisfied clients who managed to recruit through ResearchGate, and kept using the recruitment platform.',
        image: null,
      },
      {
        id: 'rg-recruit',
        name: 'Scientific Recruitment',
        year: '2016 – 2019',
        tagline: 'A paid recruitment product, zero to one.',
        audience: 'Scientists job-hunting, and the employers hiring them',
        problem:
          'Recruitment in academia is a long process that still relied on old-school reputation-based hiring. Big institutions get a lot of attention as candidates organically flock to their career pages. Leveraging ResearchGate\'s millions of publications, the recruitment product could build accurate researcher profiles which, combined with category extraction from job posts, could recommend candidates proactively to recruiters. This recommendation system matched profile skills, academic degree, region and other parameters to ensure that the scientific talent was the best possible match, cutting recruitment time and costs.',
        did:
          'Took the product from a basic job board MVP to a recommendation-powered job match engine: dedicated job pages, a posting flow with assisted targeting, email campaigns, and advertising both in-platform and external.',
        outcome:
          '4M+ EUR ARR. 70% better matching quality via ML recommendations versus purely manual matching, measured by the amount of positive candidate matches as reported by customers.',
        image: null,
      },
    ],
  },
  {
    id: 'helpling',
    name: 'Helpling',
    dates: '2019 — 2020',
    tagline: 'Home-services marketplace · Berlin',
    about:
      'Helpling is an online marketplace for home services, best known for booking vetted, insured cleaners. Incubated by Rocket Internet in Berlin in 2014, it expanded at Rocket pace: 200 cities within its first year, nine countries across three continents by 2017. Customers and cleaners find each other on the platform; Helpling takes a commission.',
    role:
      'I owned two problem spaces at Helpling. First, the mobile app: I led the release of a new React Native experience across Android, iOS and web. Second, the booking flow: I cut operational overhead and lifted stepwise conversion to drive business volume.',
    links: [{ label: 'helpling.com', href: 'https://www.helpling.com' }],
    products: [
      {
        id: 'helpling-app',
        name: 'Mobile App',
        year: '2019',
        tagline: 'A new React Native experience across Android, iOS and web.',
        audience: 'People booking home cleaning',
        problem:
          'The old Helpling mobile app was a Cordova wrapper on an aging web experience, and it was at risk of becoming unsupported. On top of that, the store rating sat marginally above 2 stars.',
        did:
          'Led a focused team to rebuild the app in React Native, one codebase delivering across Android, iOS and web. Mapped every workflow in the old app and ran user research to prioritize what the rebuild should change. Shipped in six months.',
        outcome: 'Over 4.0 stars in both app stores, 2x the old rating.',
        image: null,
      },
      {
        id: 'helpling-booking',
        name: 'Booking Flow',
        year: '2020',
        tagline: 'Single-click cancellations, shipped against company instinct.',
        audience:
          'People looking to cancel a cleaning, and the support team handling cancellations manually',
        problem:
          'With the new app launched, we looked at how the flows performed historically, especially cancellations. Cancelling was only possible over the phone, and the biggest risk that carried was the overhead on customer service: agents buried in cancellation calls had less time for everything else, like cleaner support.',
        did:
          'A risky endeavour: inside the company, the manual call was seen as a way to reduce churn through the human touch. The numbers told a different story. Prevention almost never worked, and the calls ate the team\'s time. We carefully designed an automated, single-click cancellation flow for both individual and recurring cleanings, and rolled it out through consecutive A/B tests, monitoring cancellation rates and conversion at every step to make sure there was no significant negative impact on the business.',
        outcome:
          'Cancellation rates stayed roughly the same as with the fully manual process, but the operational lift was tremendous. Virtually no time was now spent handling cancellations over the phone, shifting energy to more critical customer and cleaner support tasks.',
        image: null,
      },
    ],
  },
  {
    id: 'medwing',
    name: 'Medwing',
    dates: '2020 — 2021',
    tagline: 'Healthcare staffing · Berlin',
    about:
      'Medwing is a digital staffing platform for healthcare, matching nurses and carers with hospitals and care homes for permanent roles and temp shifts. Founded in Berlin in 2017, it operated in Germany and the UK; by 2020 it counted over 200,000 registered healthcare professionals and 2,500 partner facilities. The workflow is fully digital, from job search to signed contract to timesheet.',
    role:
      'I joined Medwing in my first Senior position and took ownership of the core recruitment experience. My goal was to lead candidate management into a new digital experience, and to help other business verticals explore new product opportunities.',
    links: [{ label: 'medwing.com', href: 'https://www.medwing.com' }],
    products: [
      {
        id: 'medwing-ats',
        name: 'Digital ATS',
        year: '2020 – 2021',
        tagline: 'Recruitment, out of the inbox and into a web app.',
        audience: 'Healthcare facilities still relying on outdated recruitment processes',
        problem:
          'Many healthcare and daycare facilities in Germany still run recruitment out of an inbox, or through physical mail applications. It is cumbersome for the institution and for the applicants themselves, especially in an ever more digital age.',
        did:
          'Led the ground-up implementation of a digital application management system inside Medwing: incoming applications funneled into a web experience for candidate review and management, effectively replacing much of the old manual data entry.',
        outcome:
          'Customer onboarding got easier: an 80% reduction in onboarding call time, and increased satisfaction from target customers.',
        image: null,
      },
      {
        id: 'medwing-shift',
        name: 'Shift Management MVP',
        year: '2021',
        tagline: 'Ward staffing, off the whiteboard.',
        audience: 'Healthcare facilities struggling with ward nurse allocation across shifts',
        problem:
          'Shift management is a hard problem in healthcare: staff rotate continuously, every day brings unforeseen circumstances, and low digitalization leaves wards relying on error-prone whiteboards to assign tasks and plan ahead.',
        did:
          'Worked with two key customers to design a shift management system that let managers plan ahead and assign nursing workforce across wards through an intuitive UI, with real-time oversight of ward over- and understaffing.',
        outcome: 'The MVP moved successfully into a real-life trial phase.',
        image: null,
      },
    ],
  },
  {
    id: 'staffbase',
    name: 'Staffbase',
    dates: '2022 — 2024',
    tagline: 'Employee comms platform · Berlin',
    about:
      'Staffbase is an employee communications platform: intranet, employee app and email for large organizations, built to reach frontline workers as well as desk staff. Founded in Chemnitz in 2014, it became a unicorn in March 2022 at a $1.1B valuation, with over 2,000 enterprise customers reaching more than 13 million employees. Customers include Adidas, Audi, DHL and Ikea.',
    role:
      'I joined Staffbase to lead the Surveys product, but the state of Analytics pulled me in within weeks. I ended up leading the analytics product group across multiple teams: first stabilizing the core platform, then taking a new data product from concept to launch.',
    links: [{ label: 'staffbase.com', href: 'https://staffbase.com' }],
    products: [
      {
        id: 'sb-analytics',
        name: 'Analytics Platform',
        year: '2022',
        tagline: 'The core analytics platform, rebuilt.',
        audience: 'Internal comms leads at enterprise scale',
        problem:
          'The analytics product had issues on every layer: RBAC was too restrictive, calculations were unclear, and implementation problems in the backend were corrupting internal data collection.',
        did:
          'I had originally joined Staffbase to lead the Surveys product, but it became apparent almost immediately that Analytics, a core value delivery for the company, lacked product thinking, and its issues were putting customer retention and acquisition at risk. I spent a good stretch weeding out the issues, prioritizing and addressing them, enabling key deals to happen. The most important fix was democratizing access to analytics for users of different access levels, making sure everyone had the data they needed, without the noise.',
        outcome:
          'CSAT 45% to 95%. 3M EUR ARR through enterprise deals. A platform-wide internal event system.',
        image: null,
      },
      {
        id: 'sb-smart',
        name: 'Smart Impact',
        year: '2023',
        tagline: 'A data-driven comms product, zero to launch.',
        audience: 'Customers running multi-channel campaigns that want to be more data-informed',
        problem:
          'Enterprise customers struggled to monitor the true effect of their comms campaigns, especially multichannel ones. Too many disjointed tools, and no measurement beyond views and clicks, made it hard to report on actual progress.',
        did:
          'Led the conceptualization, validation and implementation of a zero-to-one data product through to a successful launch. Managed two product teams and interfaced regularly with data engineering, legal and marketing to make sure the product worked and was delivered with the right messaging.',
        outcome:
          'A validated product that lets customers tell a data-informed narrative across multiple comms channels from a centralized dashboard. Beat the launch sign-up goal by 150%.',
        image: null,
      },
    ],
  },
  {
    id: 'pvcase',
    name: 'PVcase',
    dates: '2024 — 2026',
    tagline: 'Renewable-energy design software · Berlin',
    about:
      'PVcase builds software that automates the design of commercial and utility-scale solar power plants. The original product is an AutoCAD plug-in covering layout, shading analysis and civil design; the suite has since grown toward site selection and yield assessment. Founded in Kaunas, Lithuania in 2018, it raised a $23M Series A in 2021 and a $100M Series B in 2023, with customers in more than 75 countries.',
    role:
      'I joined PVcase on the Roof Mount team, but a restructuring put me in charge of the electrical domain in the company\'s flagship product, Ground Mount. A year later, I spearheaded the development of a brand new product: a collaboration and data platform.',
    links: [{ label: 'pvcase.com', href: 'https://pvcase.com' }],
    products: [
      {
        id: 'pv-ground',
        name: 'Ground Mount',
        year: '2024 – 2025',
        tagline: 'The flagship AutoCAD solar-design product.',
        audience: 'Solar engineers designing utility-scale PV plants',
        problem:
          'Ground Mount is an AutoCAD plug-in that electrical design engineers love. But the field moves extremely fast, and the electrical domain was lagging behind the market: the product had no support for battery system design or for harnesses in electrical designs, which was hampering customer retention and acquisition.',
        did:
          'My job was to close the customer gap with a stream of new features, using voice of customer to prioritize the yearly roadmap. During my tenure the product shipped harness support and AC and DC BESS design, and we ran the research and validation for a standards-compliant cable sizing solution.',
        outcome:
          'Positive adoption of the new features, and a roadmap that kept Ground Mount competitive in a fast-moving market.',
        image: null,
      },
      {
        id: 'pv-hub',
        name: 'Hub',
        year: '2025 – 2026',
        tagline: 'A collaborative web platform, zero to one.',
        audience: 'Solar teams collaborating across a project',
        problem:
          'Bringing a solar project to life is hard. The design phase alone needs people in different functions working in tandem, but they often use disconnected tooling: design, project management, analytics, finance. Each has its own system, and when data does not carry over correctly, costly mistakes happen.',
        did:
          'Took over a product that was stuck in discovery and brought the first alpha version to life. Coordinated the expansion of a customer advisory board to gather regular feedback, and led a development team to build a cross-functional, sellable open beta.',
        outcome: 'Shipped from pre-alpha to open beta, validated with 30+ customers.',
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

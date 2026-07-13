export type Story = { title: string; body: string };

export type Role = {
  company: string;
  title: string;
  context: string;
  start: string;
  end: string;
  summary: string;
  stories: Story[];
};

export type Education = { degree: string; institution: string; years: string };
export type Certification = { name: string; issuer: string; date: string };

export const roles: Role[] = [
  {
    company: 'PVcase',
    title: 'Senior Product Manager',
    context: 'Renewable energy B2B SaaS — Berlin',
    start: 'Aug 2024',
    end: 'Present',
    summary:
      'Lead the Ground Mount flagship product and the 0-to-1 launch of a new data management and collaboration platform.',
    stories: [
      {
        title: 'Ground Mount flagship',
        body: 'Led the flagship AutoCAD design product, launching features that enabled 500k+ ARR in new sales.',
      },
      {
        title: 'A new platform, 0 to 1',
        body: 'Defined and managed the full product life cycle for a new data management and collaboration platform, running it through Alpha and Beta.',
      },
      {
        title: 'Knowledge graph',
        body: 'Built a multi-source knowledge graph with AI connecting the entire product tech stack, generating cross-reference insights that levelled up organizational product work.',
      },
      {
        title: 'Growing a PM',
        body: 'Tutored a junior PM who progressed to mid-level within their first year.',
      },
    ],
  },
  {
    company: 'Staffbase',
    title: 'Senior Product Manager, Analytics Platform',
    context: 'B2B SaaS communications platform — Berlin',
    start: 'Feb 2022',
    end: 'Jun 2024',
    summary:
      'Rebuilt the core analytics platform as GDPR-compliant and API-first, and launched Smart Impact from zero.',
    stories: [
      {
        title: 'Analytics, rebuilt',
        body: 'Transformed the core analytics platform into a GDPR-compliant, API-first product with telemetry-driven evaluation. CSAT went from 45% to 95%, and the work enabled 3M EUR ARR through enterprise deals.',
      },
      {
        title: 'Smart Impact, 0 to 1',
        body: 'Led discovery, validation and launch of a data-driven communications product with multichannel sentiment analysis and AI-generated summaries. Exceeded adoption goals by 150% in Q1 through measurable success criteria and targeted GTM.',
      },
      {
        title: 'Leading across teams',
        body: 'Coordinated product discovery and delivery across the analytics product group, leading multiple development and analytics teams simultaneously.',
      },
    ],
  },
  {
    company: 'Medwing',
    title: 'Senior Product Manager (B2B)',
    context: 'B2B healthcare recruitment — Berlin',
    start: 'Sep 2020',
    end: 'Oct 2021',
    summary:
      'Built healthcare ATS tooling and validated product-market fit for shift management.',
    stories: [
      {
        title: 'Validating PMF',
        body: 'Built healthcare ATS tools and validated product-market fit for shift management through beta testing with 50+ facilities.',
      },
      {
        title: 'Onboarding without the call',
        body: 'Cut 80% of new-customer onboarding time versus the traditional support call, by implementing and iterating on a first-login flow.',
      },
    ],
  },
  {
    company: 'Helpling',
    title: 'Product Manager (Mobile App)',
    context: 'B2C service marketplace — Berlin',
    start: 'Jun 2019',
    end: 'Jul 2020',
    summary:
      'Led the 0-to-1 launch of a new booking experience across web and mobile in an ML-powered marketplace.',
    stories: [
      {
        title: 'A new booking experience',
        body: 'Led discovery, development and 0-to-1 launch of a new cleaner booking experience across web and mobile in a dynamic, ML-powered marketplace.',
      },
      {
        title: 'Apps that people actually rated',
        body: 'Launched iOS and Android apps achieving 4.5 stars — 2.5x the rating of the previous version.',
      },
      {
        title: 'Cancellation, self-served',
        body: 'Launched a self-serve cancellation flow through diligent A/B testing, cutting customer success ticket time on cancellations by 90% while keeping cancellation rates stable.',
      },
    ],
  },
  {
    company: 'ResearchGate',
    title: 'Product Operations Lead / Product Manager',
    context: 'Academic social network — Berlin',
    start: 'Apr 2014',
    end: 'Apr 2019',
    summary:
      'Built Product Operations from 0 to 8, and launched a paid scientific recruitment product generating 4M+ EUR ARR.',
    stories: [
      {
        title: 'Product Ops, 0 to 8',
        body: 'Built Product Operations from the ground up to a team of 8, owning recruitment, KPIs, reporting structures and cross-functional frameworks while ensuring career growth and promotions.',
      },
      {
        title: '4M+ EUR ARR from zero',
        body: 'Launched a 0-to-1 paid scientific recruitment product generating 4M+ EUR ARR, owning both the job seeker and the employer-facing experiences.',
      },
      {
        title: 'ML matching',
        body: 'Led ML recommendation systems for job seeker matching and job advertising. Defined success metrics and worked with data science to deliver a 70% increase in matching quality — the foundation for intelligent, personalized experiences at scale.',
      },
    ],
  },
];

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

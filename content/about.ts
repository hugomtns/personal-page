/**
 * The About copy. Plain data, so rewriting it never means touching a component.
 *
 * `intro` is the one paragraph on the splash page: what he believes, not what
 * he has done. The record — years, employers, products — is `body`'s job, on
 * /about. Keep both in a speaking voice, first person, and keep `intro` to a
 * claim someone could disagree with; a virtue no one would argue against says
 * nothing.
 */

export const intro =
  'I believe in empowered product teams: give people a hard problem, a clear vision, and a strategy with no ambiguity in it, and they will build something worth using. Everything else is overhead.';

export const body: string[] = [
  'I work on products where the underlying problem is complicated — solar engineering, analytics platforms, healthcare recruitment — and the job is to make the complexity someone else’s problem rather than the user’s. That usually means spending longer than feels comfortable in the problem before touching a solution.',

  'At PVcase I lead Ground Mount, the flagship AutoCAD-based design product, and took a new data management and collaboration platform from nothing through alpha and beta. Before that I rebuilt Staffbase’s analytics platform as GDPR-compliant and API-first, which moved CSAT from 45% to 95%, and launched Smart Impact from zero. Earlier: healthcare recruitment tooling at Medwing, the mobile app at Helpling, and product operations at ResearchGate.',

  'I also build. Most of the prototypes I ship never become anything, and that is the point — writing the code is how I find out whether an idea survives contact with reality. It is a faster and more honest answer than another round of specs, and it means I can have a real conversation with the engineers I work with instead of a negotiation.',
];

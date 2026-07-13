export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="label mb-10">About</h2>
      <div className="grid max-w-3xl gap-6 text-[length:var(--text-h2)] leading-snug">
        <p>
          Eleven years shipping digital products in data-intensive B2B SaaS,
          healthtech and platform environments — turning complex technical
          systems into things that feel obvious to use.
        </p>
        <p className="text-muted">
          I lead from discovery through MVP to production. I also build:
          the prototypes on this site are mine, and writing the code is how
          I pressure-test whether an idea actually holds up.
        </p>
        <p className="text-muted">
          Now looking for leadership roles that combine AI/LLM product
          strategy with consumer-facing impact.
        </p>
      </div>
    </section>
  );
}

import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';

export default function Home() {
  return (
    <>
      <Hero />
      <section id="cv" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="label mb-10">Experience</h2>
        <Timeline />
      </section>
    </>
  );
}

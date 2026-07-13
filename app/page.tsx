import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import BookingEmbed from '@/components/BookingEmbed';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <section id="cv" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="label mb-10">Experience</h2>
        <Timeline />
      </section>
      <BookingEmbed />
      <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="label mb-10">Or send a message</h2>
        <ContactForm />
      </section>
    </>
  );
}

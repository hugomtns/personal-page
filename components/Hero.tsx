import { site } from '@/content/site';
import { intro } from '@/content/about';
import AsciiPortrait from './AsciiPortrait';

export default function Hero() {
  return (
    <section className="terminal-home">
      <p className="terminal-home__prompt" aria-hidden="true">
        hugo@berlin:~$ whoami
      </p>
      <div className="terminal-home__content">
        <h1 className="terminal-home__name">{site.name}</h1>
        <p className="terminal-home__role" style={{ opacity: 1 }}>{site.role}</p>
        <p className="terminal-home__intro" style={{ opacity: 1 }}>{intro}</p>
        <a
          href="https://shouldiworkwith.hugomartins.pm"
          className="terminal-home__action"
        >
          <span aria-hidden="true">&gt;</span>
          <span>Should you work with me? Take the test</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <AsciiPortrait className="terminal-home__portrait" />
    </section>
  );
}

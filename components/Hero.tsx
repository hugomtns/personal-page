import { site } from '@/content/site';
import { intro } from '@/content/about';
import AsciiPortrait from './AsciiPortrait';
import TerminalPrompt from './TerminalPrompt';

export default function Hero() {
  return (
    <section className="terminal-frame terminal-home">
      <p className="terminal-bar" aria-hidden="true">
        <TerminalPrompt command="home" />
      </p>
      <div className="terminal-home__content">
        <h1 className="terminal-home__name">{site.name}</h1>
        <p className="terminal-home__role" style={{ opacity: 1 }}>{site.role}</p>
        <p className="terminal-home__intro" style={{ opacity: 1 }}>{intro}</p>
        <a
          href="https://shouldiworkwith.hugomartins.pm"
          className="terminal-control terminal-home__action"
        >
          <span aria-hidden="true">&gt;</span>
          <span>I am open to work! Are we a match?</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <AsciiPortrait className="terminal-home__portrait" />
    </section>
  );
}

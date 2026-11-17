export type TerminalCommand = 'home' | 'whoami' | 'cv' | 'projects' | 'contact' | 'quiz';

export default function TerminalPrompt({ command }: { command: TerminalCommand }) {
  return (
    <span className="terminal-prompt" aria-hidden="true">
      <span>hugo@berlin:~$ {command}</span>
      <span className="terminal-prompt__cursor" />
    </span>
  );
}

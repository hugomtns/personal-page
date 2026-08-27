import { site } from '@/content/site';

export default function PMSimulatorLink({ className = '' }: { className?: string }) {
  return (
    <a href={site.links.pmSimulator} className={`pm-simulator-link ${className}`}>
      PM Simulator
    </a>
  );
}

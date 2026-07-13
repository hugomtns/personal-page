import { site } from '@/content/site';

export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Social links" className={`flex gap-6 ${className}`}>
      <a
        href={site.links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="label transition-colors hover:text-accent"
      >
        LinkedIn
      </a>
      <a
        href={site.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="label transition-colors hover:text-accent"
      >
        GitHub
      </a>
    </nav>
  );
}

import SocialLinks from './SocialLinks';
import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          {site.name} — {site.location}
        </p>
        {/* Repeated from the header on purpose: this is the bottom of the page,
            where someone who has read to the end goes looking for them. */}
        <SocialLinks className="-ml-3" />
      </div>
    </footer>
  );
}

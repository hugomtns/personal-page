import SocialLinks from './SocialLinks';
import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          {site.name} — {site.location}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}

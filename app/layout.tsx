import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import SkipLink from '@/components/SkipLink';
import Header from '@/components/Header';
import BerlinTime from '@/components/BerlinTime';
import { site } from '@/content/site';

// Display face. Variable font (300–700) so headings can carry a real bold
// weight in CSS — see globals.css. globals.css maps --font-display to this.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

// Metadata face. Same family DNA as the body text, so the mono layer reads as
// structure rather than decoration. globals.css maps --font-mono to this.
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must live on <html>, not <body>. `@theme inline` emits
    // --font-display: var(--font-space-grotesk) onto :root, and a custom
    // property is resolved in the scope where it is DECLARED — so if the font
    // variables sit on <body>, that reference is invalid at :root, --font-display
    // computes to nothing, and every hand-written rule using it (h1/h2/h3, body,
    // .label) silently loses its font-family. The site then renders in neither of
    // its own typefaces, and nothing errors to tell you.
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          {/* The site's only footer content is one ambient mono line. */}
          <footer className="mx-auto flex w-full max-w-5xl justify-end px-6 pb-10">
            <BerlinTime />
          </footer>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

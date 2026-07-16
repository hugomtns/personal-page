import type { Metadata } from 'next';
import { Instrument_Serif, Geist } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import SkipLink from '@/components/SkipLink';
import Header from '@/components/Header';
import { site } from '@/content/site';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const description =
  'Product manager in Berlin. Eleven years building software products, mostly in B2B SaaS.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description,
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
    // --font-display: var(--font-instrument-serif) onto :root, and a custom
    // property is resolved in the scope where it is DECLARED — so if the font
    // variables sit on <body>, that reference is invalid at :root, --font-display
    // computes to nothing, and every hand-written rule using it (h1/h2/h3, body,
    // .label) silently loses its font-family. The site then renders in neither of
    // its own typefaces, and nothing errors to tell you.
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Instrument_Serif, Geist } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import SkipLink from '@/components/SkipLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description:
    'Senior Product Manager, Berlin. 11+ years shipping data-intensive B2B SaaS. I build the prototypes, not just the specs.',
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${geist.variable}`}>
        <ThemeProvider>
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Instrument_Serif, Geist } from 'next/font/google';
import './globals.css';

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
  title: 'Hugo Martins — Senior Product Manager',
  description:
    'Senior Product Manager, Berlin. 11+ years shipping data-intensive B2B SaaS. I build the prototypes, not just the specs.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${geist.variable}`}>
        {children}
      </body>
    </html>
  );
}

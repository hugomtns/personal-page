'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // Dark by default for everyone, on purpose. enableSystem is deliberately
    // off: it would hand a visitor on a light-mode machine a different site
    // than the one this was designed as. The toggle is still there for anyone
    // who wants light.
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

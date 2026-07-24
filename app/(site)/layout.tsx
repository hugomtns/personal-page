import Header from '@/components/Header';

// Chrome is decided by the route, not the URL: the compatibility quiz lives
// outside this group, so it renders with no site header even when the proxy
// rewrites the shouldiworkwith. host to it (under a rewrite the client router
// never sees the rewritten path, so a pathname check cannot be trusted).
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
    </>
  );
}

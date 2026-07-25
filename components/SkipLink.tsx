export default function SkipLink() {
  return (
    // btn-primary, not focus:bg-accent + focus:text-bg: the unlayered
    // `a { color: inherit }` rule in globals.css beats layered color
    // utilities on anchors, so the text color would silently stay fg.
    <a
      href="#main"
      className="btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}

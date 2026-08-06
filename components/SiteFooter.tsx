import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-row">
          <div className="mark">Victory&nbsp;Velocity</div>
          <div className="foot-cols">
            <div className="foot-col">
              <span className="ttl">Site</span>
              <Link href="/blog">Blog</Link>
              <Link href="/#contact">Work With Us</Link>
            </div>
          </div>
        </div>
        <div className="foot-base">
          <span>AI visibility for brands that intend to be cited.</span>
          <span>© 2026 Victory Velocity</span>
        </div>
      </div>
    </footer>
  );
}

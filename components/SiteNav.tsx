"use client";

import { useState } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { MobileDrawer, type NavLink } from "./MobileDrawer";

const LINKS: NavLink[] = [
  { href: "/#method", label: "Method" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(!menuOpen && y > 80 && y > previous);
  });

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}${hidden ? " hide" : ""}`}>
        <Link href="/" className="mark">Victory&nbsp;Velocity</Link>

        <div className="links">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>

        <Link href="/#contact" className="cta nav-cta">Work With Us</Link>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} />
    </>
  );
}

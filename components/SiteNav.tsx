"use client";

import { useState } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function SiteNav() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 80);
  });

  return (
    <nav className={`nav${visible ? " visible" : ""}`}>
      <Link href="/" className="mark">Victory&nbsp;Velocity</Link>
      <a
        href="https://cal.com/kaden-yeung-bgczdf/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="cta solid nav-cta"
      >
        Book a call
      </a>
    </nav>
  );
}

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
      <Link href="/#contact" className="cta solid nav-cta">Work With Us</Link>
    </nav>
  );
}

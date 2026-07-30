"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export type NavLink = { href: string; label: string };

export function MobileDrawer({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div className={`drawer-root${open ? " open" : ""}`} aria-hidden={!open}>
      <button className="drawer-scrim" onClick={onClose} tabIndex={-1} aria-label="Close menu" />
      <div className="drawer-panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu">
        <nav className="drawer-links">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{ transitionDelay: open ? `${80 + index * 55}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="cta solid drawer-cta" onClick={onClose}>
          Work With Us
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useEffect, type RefObject } from "react";

const POLL_MS = 250;

/**
 * Lights one engine at a time on a scrolling marquee track. Engines are
 * spaced evenly along the track, so over one animation loop each occupies an
 * equal time slot in a fixed order — the lit engine is derived directly from
 * the animation clock rather than measured, since getBoundingClientRect does
 * not reflect a compositor-driven transform and IntersectionObserver never
 * fires for transform-moved elements (both report the track as stationary).
 */
export function useMarqueeHighlight(
  trackRef: RefObject<HTMLDivElement>,
  direction: "left" | "right",
  engineCount: number
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (engineCount <= 0) return;

    const items = Array.from(track.querySelectorAll<HTMLElement>(".eng"));
    if (items.length === 0) return;

    const copies: HTMLElement[][] = Array.from({ length: engineCount }, () => []);
    items.forEach((el, i) => copies[i % engineCount].push(el));

    const setLit = (engine: number, on: boolean) => {
      copies[engine]?.forEach((el) => el.classList.toggle("hot", on));
    };

    let lit = -1;

    const tick = () => {
      const anim = track.getAnimations()[0];
      if (!anim) return;

      const duration = Number(anim.effect?.getTiming().duration ?? 30000);
      if (!duration) return;
      const phase = (Number(anim.currentTime ?? 0) % duration) / duration;

      // Engines enter in DOM order, evenly spaced across one loop. A
      // left-moving track reveals them 0..N-1 in turn; a right-moving track
      // runs the same loop backwards, so it reveals them in reverse.
      const slot = Math.floor(phase * engineCount) % engineCount;
      const next = direction === "left" ? slot : engineCount - 1 - slot;

      if (next === lit) return;
      if (lit >= 0) setLit(lit, false);
      lit = next;
      setLit(lit, true);
    };

    tick();
    const id = setInterval(tick, POLL_MS);

    return () => {
      clearInterval(id);
      if (lit >= 0) setLit(lit, false);
    };
  }, [trackRef, direction, engineCount]);
}

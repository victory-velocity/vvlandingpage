"use client";

import { useEffect, type RefObject } from "react";

const POLL_MS = 250;

/**
 * Lights one engine at a time on a scrolling marquee track. The lit engine
 * stays lit for its whole visible traverse, and when it leaves, the engine
 * that most recently entered takes over.
 *
 * Position is computed from the animation clock rather than measured, because
 * neither measurement approach works on a marquee: getBoundingClientRect does
 * not reflect a compositor-driven transform, and IntersectionObserver never
 * fires for transform-moved elements. Both report the track as stationary.
 *
 * Positions are taken modulo the track's half width. The track holds two
 * identical halves, so when the animation loops back the visual is seamless,
 * but a specific DOM element jumps a full half width. Working modulo that
 * width keeps the highlight continuous across the loop.
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

    const items = Array.from(track.querySelectorAll<HTMLElement>(".eng"));
    if (items.length === 0) return;

    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    // Group every DOM copy of each engine. Only one copy is ever on screen,
    // since the half width exceeds the viewport, so lighting the whole group
    // lights exactly one visible word.
    const copies: HTMLElement[][] = Array.from({ length: engineCount }, () => []);
    items.forEach((el, i) => copies[i % engineCount].push(el));
    const baseX = copies.map((group) => group[0].offsetLeft);

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

      // Left-moving tracks run 0 to -50%; right-moving tracks run -50% to 0.
      const travel = direction === "left" ? -phase * halfWidth : (phase - 1) * halfWidth;

      const positions = baseX.map((x) => {
        const p = (x + travel) % halfWidth;
        return p < 0 ? p + halfWidth : p;
      });

      const onScreen = (p: number) => p < window.innerWidth;

      if (lit >= 0 && onScreen(positions[lit])) return;

      // The newest entrant is the furthest right on a left-moving track, and
      // the furthest left on a right-moving one.
      let next = -1;
      for (let k = 0; k < engineCount; k += 1) {
        if (!onScreen(positions[k])) continue;
        if (next < 0) {
          next = k;
          continue;
        }
        const better =
          direction === "left" ? positions[k] > positions[next] : positions[k] < positions[next];
        if (better) next = k;
      }

      if (next < 0 || next === lit) return;
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

"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger and Lenis
 * share one clock.
 *
 * Always rendered (never swapped for a fragment) so the React tree keeps the
 * same shape before and after hydration; swapping would remount every child,
 * including the preloader. Under prefers-reduced-motion Lenis itself drops to
 * 1:1 tracking (`respectReducedMotion`), which is effectively native scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        anchors: { offset: -24 },
        autoRaf: false,
        syncTouch: false,
        respectReducedMotion: true,
      }}
    >
      <LenisDriver />
      {children}
    </ReactLenis>
  );
}

/**
 * Lives inside the Lenis context so it re-runs once the instance exists
 * (ReactLenis creates it in an effect, after the first render).
 */
function LenisDriver() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Advance Lenis from GSAP's ticker and keep ScrollTrigger in sync.
  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  // Next's own scroll restoration gets confused by hijacked scroll.
  // On route change: jump to top, or to the hash target if there is one.
  useEffect(() => {
    const hash = window.location.hash;
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      // Lenis caches page dimensions; the new page can be taller than the last,
      // and a stale limit would clamp the jump. Re-measure first.
      lenis?.resize();
      if (target) {
        // Jump, don't glide: the preloader may hold Lenis stopped on first paint.
        if (lenis) lenis.scrollTo(target, { offset: -24, immediate: true, force: true });
        else target.scrollIntoView();
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return null;
}

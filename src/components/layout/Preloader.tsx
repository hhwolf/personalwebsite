"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SESSION_KEY = "preloader-seen";

function markDone() {
  document.documentElement.dataset.preloader = "done";
  window.dispatchEvent(new Event("preloader:done"));
  ScrollTrigger.refresh();
}

/**
 * Full-screen panel that draws the name as an outline, fills it, then slides away.
 * Plays once per tab session. Server-renders as a plain black panel so the hero
 * never flashes un-animated while hydrating.
 */
export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const panel = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Hold scrolling while the panel is up. Keyed on the instance because Lenis
  // is created after first render, and on `mounted` so it releases on exit.
  useEffect(() => {
    if (!lenis || !mounted) return;
    lenis.stop();
    return () => lenis.start();
  }, [lenis, mounted]);

  useGSAP(
    () => {
      const seen = sessionStorage.getItem(SESSION_KEY) === "1";
      if (seen || prefersReducedMotion()) {
        setMounted(false);
        markDone();
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          setMounted(false);
          markDone();
        },
      });

      tl.set("[data-pre-name]", { clipPath: "inset(0 100% 0 0)" })
        .to("[data-pre-name]", { clipPath: "inset(0 0% 0 0)", duration: 0.9 }, 0.1)
        .fromTo(
          "[data-pre-meta]",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
          0.35,
        )
        .to("[data-pre-name]", { color: "#f2a33a", duration: 0.4, ease: "power2.out" }, "-=0.25")
        .to("[data-pre-name], [data-pre-meta]", { opacity: 0, duration: 0.3, ease: "power2.in" }, "+=0.15")
        .to(panel.current, { yPercent: -100, duration: 0.8 }, "-=0.1");
    },
    { scope: panel },
  );

  if (!mounted) return null;

  return (
    <div
      ref={panel}
      aria-hidden
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-6 py-8 md:px-10"
    >
      <p className="label text-ash-400" data-pre-meta style={{ opacity: 0 }}>
        {site.location}
      </p>
      <p
        data-pre-name
        className="display text-outline text-[clamp(3rem,12vw,12rem)] leading-none italic"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        {site.name}
      </p>
      <p className="label flex justify-between text-ash-400" data-pre-meta style={{ opacity: 0 }}>
        <span>Portfolio</span>
        <span>{new Date().getFullYear()}</span>
      </p>
    </div>
  );
}

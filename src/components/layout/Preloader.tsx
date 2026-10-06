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
 * Full-screen intro that "signs" the name: a script-font signature is swept in
 * left to right behind a soft mask like a pen stroke, then the panel lifts.
 * Plays once per tab session. Server-renders as a plain black panel so the
 * hero never flashes un-animated while hydrating.
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
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          // Set the flag only once the intro has fully played. Setting it up
          // front made React Strict Mode's double effect run skip the intro in dev.
          sessionStorage.setItem(SESSION_KEY, "1");
          setMounted(false);
          markDone();
        },
      });

      tl.to("[data-pre-sign]", { "--reveal": "112%", duration: 1.6, ease: "power1.inOut" }, 0.15)
        .fromTo(
          "[data-pre-meta]",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
          0.5,
        )
        .fromTo(
          "[data-pre-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power2.out" },
          0.7,
        )
        .to("[data-pre-sign]", { color: "#f2a33a", duration: 0.45, ease: "power2.out" }, "-=0.5")
        .to(
          "[data-pre-sign], [data-pre-meta], [data-pre-rule]",
          { opacity: 0, duration: 0.3, ease: "power2.in" },
          "+=0.2",
        )
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
      <p className="label flex justify-between text-ash-400" data-pre-meta style={{ opacity: 0 }}>
        <span>{site.location}</span>
        <span>Portfolio</span>
      </p>
      <div className="relative mx-auto w-full max-w-5xl">
        <p
          data-pre-sign
          className="font-signature signature-reveal text-center text-[clamp(4rem,15vw,14rem)] leading-[1.1] text-bone"
        >
          {site.name}
        </p>
        <span
          data-pre-rule
          className="mx-auto mt-2 block h-px w-2/3 origin-left bg-ember/60"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <p className="label flex justify-between text-ash-400" data-pre-meta style={{ opacity: 0 }}>
        <span>{site.tagline}</span>
        <span>{new Date().getFullYear()}</span>
      </p>
    </div>
  );
}

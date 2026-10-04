"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const metas = gsap.utils.toArray<HTMLElement>("[data-hero]");
      gsap.set(metas, { opacity: 0, y: 12 });

      let split: SplitText | null = null;
      const play = () => {
        split = SplitText.create("[data-hero-title]", {
          type: "lines",
          mask: "lines",
          linesClass: "hero-line",
          autoSplit: true,
          onSplit: (self) => {
            // autoSplit can fire before fonts settle and yield zero lines.
            if (self.lines.length === 0) return;
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              stagger: 0.12,
              ease: "expo.out",
            });
          },
        });
        gsap.to(metas, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.5,
        });
      };

      if (document.documentElement.dataset.preloader === "done") {
        play();
      } else {
        window.addEventListener("preloader:done", play, { once: true });
      }

      return () => {
        window.removeEventListener("preloader:done", play);
        split?.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-28 pb-10 md:px-10 md:pt-36 lg:px-20"
      aria-label="Introduction"
    >
      <div className="flex items-start justify-between">
        <p className="label" data-hero>
          {site.location}
          <span className="mt-1 block text-ember">{site.availability}</span>
        </p>
        <p
          className="font-signature absolute top-6 left-1/2 hidden -translate-x-1/2 text-4xl text-ash-400 md:block"
          aria-hidden
          data-hero
        >
          {initials}
        </p>
        <p className="label hidden text-right md:block" data-hero>
          Portfolio
          <span className="mt-1 block text-ash-400">{year}</span>
        </p>
      </div>

      <div className="mt-12 md:mt-0">
        <h1 className="display text-display-xl" data-hero-title>
          <span className="block">{site.firstName}</span>
          <span className="block">
            <em>{site.name.replace(`${site.firstName} `, "")}</em>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ash-200 md:text-xl" data-hero>
          {site.tagline}
        </p>
      </div>

      <div className="mt-16 flex items-end justify-between md:mt-0">
        <p className="label" data-hero>
          Scroll
          <span aria-hidden className="ml-3 inline-block animate-bounce">
            ↓
          </span>
        </p>
        <p className="label hidden md:block" data-hero>
          Projects · Essays · Notes
        </p>
      </div>
    </section>
  );
}

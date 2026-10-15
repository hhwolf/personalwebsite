"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Fixed left rail (lg+): an ember progress bar on the page edge that fills as
 * you scroll, plus vertical labels. Decorative; hidden from assistive tech.
 */
export function LeftRail() {
  const fill = useRef<HTMLSpanElement>(null);
  const year = new Date().getFullYear();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.4 } },
      );
    });
  });

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-0 z-[70] hidden w-14 lg:block"
    >
      {/* edge progress bar */}
      <span className="absolute inset-y-0 left-0 w-[3px] bg-line">
        <span
          ref={fill}
          className="absolute inset-0 origin-top bg-[linear-gradient(to_bottom,var(--color-ember),var(--color-ember-deep))]"
        />
      </span>

      <div className="absolute inset-y-0 left-4 flex w-8 flex-col items-center justify-between py-8">
        <span className="vertical-text display text-outline text-3xl tracking-[0.08em] uppercase opacity-70">
          Portfolio
        </span>
        <span className="flex flex-col items-center gap-3 text-ash-400">
          <span className="font-mono text-[0.6rem]">+</span>
          <span className="vertical-text font-mono text-[0.65rem] tracking-[0.3em] text-ember">
            {year}
          </span>
          <span className="font-mono text-[0.6rem]">+</span>
        </span>
        <span className="vertical-text label mb-14 text-ash-400">
          {site.name.toUpperCase().replace(" ", " — ")}
        </span>
      </div>
    </aside>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SmoothLink } from "./SmoothLink";

/**
 * Fixed right-hand rail on the home page: a scrubbed progress line and one
 * dot per section. Hidden below lg and on other routes.
 */
export function ProgressRail() {
  const pathname = usePathname();
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const isHome = pathname === "/";

  useGSAP(
    () => {
      if (!isHome || !fill.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
          },
        );
      });
    },
    { dependencies: [isHome] },
  );

  useEffect(() => {
    if (!isHome) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (sections.length === 0) return;
    const triggers = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActive(el.dataset.section ?? null);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, [isHome]);

  if (!isHome) return null;

  const current = site.nav.find((n) => n.id === active);

  return (
    <aside
      aria-label="Section progress"
      className="fixed top-1/2 right-6 z-[70] hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end lg:gap-4"
    >
      <p className="label h-4 text-right text-ash-400" aria-live="polite">
        {current ? (
          <>
            <span className="text-ember">{current.number}</span> {current.label}
          </>
        ) : (
          <span className="text-ash-400">Top</span>
        )}
      </p>
      <div className="flex items-stretch gap-3">
        <ol className="flex flex-col justify-between py-1">
          {site.nav.map((n) => (
            <li key={n.id}>
              <SmoothLink
                href={`/#${n.id}`}
                aria-label={`${n.number} ${n.label}`}
                aria-current={active === n.id ? "true" : undefined}
                className="group flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`block size-1.5 rounded-full transition-all duration-300 group-hover:bg-ember ${
                    active === n.id ? "scale-150 bg-ember" : "bg-ash-600"
                  }`}
                />
              </SmoothLink>
            </li>
          ))}
        </ol>
        <span aria-hidden className="relative block w-px bg-line">
          <span ref={fill} className="absolute inset-0 origin-top bg-ember" />
        </span>
      </div>
    </aside>
  );
}

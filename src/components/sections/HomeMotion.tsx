"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Scroll-scrubbed effects that belong to the home page only:
 * the journey timeline fill and project image parallax.
 */
export function HomeMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const timelineFill = document.querySelector<HTMLElement>("[data-timeline-fill]");
      const timelineList = timelineFill?.parentElement?.querySelector("ol");
      if (timelineFill && timelineList) {
        gsap.fromTo(
          timelineFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineList,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        const media = card.querySelector<HTMLElement>("[data-parallax]");
        if (!media) return;
        gsap.fromTo(
          media,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });
  });

  return null;
}

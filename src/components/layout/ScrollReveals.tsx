"use client";

import { usePathname } from "next/navigation";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Animates every [data-reveal] element into view once, in batches.
 * The CSS gate (html.js [data-reveal] { opacity: 0 }) hides them before this runs.
 */
export function ScrollReveals() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        if (targets.length === 0) return;
        gsap.set(targets, { y: 28 });
        ScrollTrigger.batch(targets, {
          start: "top 94%",
          once: true,
          onEnter: (batch) => {
            // After a long jump (anchor link, fast scroll) a batch can contain
            // elements already above the viewport. Show those instantly and
            // only animate what the user can actually see.
            const above: Element[] = [];
            const visible: Element[] = [];
            for (const el of batch) {
              (el.getBoundingClientRect().bottom < 0 ? above : visible).push(el);
            }
            if (above.length) gsap.set(above, { opacity: 1, y: 0 });
            if (visible.length) {
              gsap.to(visible, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: Math.min(0.08, 0.6 / visible.length),
                ease: "power3.out",
                overwrite: true,
              });
            }
          },
        });
      });

      // Heights shift when web fonts land; recompute trigger positions.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}

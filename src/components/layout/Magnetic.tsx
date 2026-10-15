"use client";

import { usePathname } from "next/navigation";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Gives every [data-magnetic] element a soft pull toward the cursor. Desktop pointers only. */
export function Magnetic() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.28);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}

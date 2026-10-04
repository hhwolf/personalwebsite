"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

const QUERY = `${MOTION_OK} and (hover: hover) and (pointer: fine)`;

type State = "default" | "hover" | "drag" | "label";

/**
 * Custom cursor: an ember dot that tracks the pointer and a lagging ring that
 * grows over links and buttons and becomes a "DRAG" badge over the skills
 * stage. Only for fine pointers with motion allowed; the native cursor is
 * hidden via html.has-cursor while active.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Capture nodes now; refs are nulled before React runs this effect's cleanup.
    const dotEl = dot.current;
    const ringEl = ring.current;
    const labelEl = label.current;
    if (!dotEl || !ringEl || !labelEl) return;

    const mq = window.matchMedia(QUERY);
    let disable: (() => void) | null = null;

    const enable = () => {
      if (disable) return;
      const html = document.documentElement;
      html.classList.add("has-cursor");

      const dotX = gsap.quickTo(dotEl, "x", { duration: 0.08, ease: "power2.out" });
      const dotY = gsap.quickTo(dotEl, "y", { duration: 0.08, ease: "power2.out" });
      const ringX = gsap.quickTo(ringEl, "x", { duration: 0.32, ease: "power3.out" });
      const ringY = gsap.quickTo(ringEl, "y", { duration: 0.32, ease: "power3.out" });

      let visible = false;
      const move = (e: PointerEvent) => {
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
        if (!visible) {
          visible = true;
          gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.25 });
        }
      };

      const setState = (state: State, text = "") => {
        ringEl.dataset.state = state;
        labelEl.textContent = text;
        const scale = state === "drag" || state === "label" ? 2 : state === "hover" ? 1.6 : 1;
        gsap.to(ringEl, { scale, duration: 0.35, ease: "power3.out" });
        gsap.to(dotEl, { scale: state === "default" ? 1 : 0, duration: 0.25 });
      };

      const over = (e: PointerEvent) => {
        const el = (e.target as Element | null)?.closest<HTMLElement>(
          "[data-cursor], a, button, [role=button], input, textarea, select, label",
        );
        if (!el) return setState("default");
        const kind = el.dataset.cursor;
        if (kind === "drag") return setState("drag", "Drag");
        if (kind) return setState("label", kind);
        setState("hover");
      };

      const down = () => gsap.to(ringEl, { scale: 0.8, duration: 0.15 });
      const up = () => gsap.to(ringEl, { scale: 1, duration: 0.3, ease: "power3.out" });
      const leave = () => {
        visible = false;
        gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.25 });
      };

      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over, { passive: true });
      window.addEventListener("pointerdown", down, { passive: true });
      window.addEventListener("pointerup", up, { passive: true });
      html.addEventListener("pointerleave", leave);

      disable = () => {
        html.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        window.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
        html.removeEventListener("pointerleave", leave);
        gsap.killTweensOf([dotEl, ringEl]);
        gsap.set([dotEl, ringEl], { opacity: 0, scale: 1 });
        disable = null;
      };
    };

    const sync = () => (mq.matches ? enable() : disable?.());
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      disable?.();
    };
  }, []);

  return (
    <>
      <div ref={dot} aria-hidden className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ring} aria-hidden className="cursor-ring" data-state="default" style={{ opacity: 0 }}>
        <span ref={label} />
      </div>
    </>
  );
}

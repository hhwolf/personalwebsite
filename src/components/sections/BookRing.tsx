"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Book } from "@/data/reading";
import { prefersReducedMotion } from "@/lib/gsap";

const tones = [
  "from-ember/85 to-ember-deep text-ink",
  "from-ash-800 to-ink-raised text-bone",
  "from-bone to-ash-200 text-ink",
  "from-ink-raised to-ash-800 text-ember",
];

const IDLE_SPEED = 0.06; // degrees per frame at 60fps (~3.6°/s)

/**
 * Books standing on a 3D ring. The ring idles slowly, can be dragged (mouse or
 * touch) with momentum, and pauses while a book is hovered. Pure CSS transforms
 * so it also renders as a static ring without JavaScript.
 */
export function BookRing({ books }: { books: Book[] }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(360);
  const [hovered, setHovered] = useState<number | null>(null);
  const step = 360 / books.length;

  // Size the ring to its container so books never overlap on narrow screens.
  useEffect(() => {
    const el = ringRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setRadius(Math.max(190, Math.min(400, w * 0.33)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Rotation loop: idle spin + drag + inertia, all outside React state.
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const stage = ring.parentElement!;
    let angle = 0;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let paused = false;
    let raf = 0;
    const idle = prefersReducedMotion() ? 0 : IDLE_SPEED;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!dragging) {
        if (Math.abs(velocity) > 0.01) {
          angle += velocity;
          velocity *= 0.95;
        } else if (!paused) {
          angle += idle;
        }
      }
      ring.style.transform = `rotateY(${angle}deg)`;
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      dragging = true;
      velocity = 0;
      lastX = e.clientX;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("cursor-grabbing");
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      velocity = dx * 0.35;
      angle += velocity;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      stage.releasePointerCapture(e.pointerId);
      stage.classList.remove("cursor-grabbing");
    };
    const enter = () => {
      paused = true;
    };
    const leave = () => {
      paused = false;
    };

    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      className="relative mx-auto h-[420px] w-full max-w-5xl cursor-grab touch-pan-y select-none [perspective:1400px] md:h-[480px]"
      aria-label="Books I'm reading. Drag to spin."
      data-cursor="Spin"
    >
      {/* floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] bottom-6 h-24 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(242_163_58/0.18),transparent_70%)] blur-xl"
      />
      <div
        ref={ringRef}
        className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
      >
        {books.map((book, i) => {
          const isHover = hovered === i;
          return (
            <div
              key={book.title}
              className="absolute top-1/2 left-1/2 h-[260px] w-[172px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] md:h-[300px] md:w-[200px]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              <div
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                className={`book-card relative h-full w-full rounded-r-xl rounded-l-md border border-line shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] transition-transform duration-500 ease-out-expo ${
                  book.cover ? "bg-ink-raised" : `bg-gradient-to-br p-5 ${tones[i % tones.length]}`
                } ${isHover ? "scale-[1.18] -translate-y-4" : ""}`}
              >
                {book.cover ? (
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    width={200}
                    height={300}
                    sizes="200px"
                    loading="eager"
                    draggable={false}
                    className="book-cover h-full w-full rounded-r-xl rounded-l-md object-cover"
                  />
                ) : (
                  <>
                    <p className="display text-[1.35rem] leading-tight md:text-[1.5rem]">{book.title}</p>
                    {book.author && (
                      <p className="absolute right-5 bottom-5 left-5 font-mono text-[0.62rem] tracking-[0.14em] uppercase opacity-80">
                        {book.author}
                      </p>
                    )}
                  </>
                )}
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-3 rounded-l-md bg-gradient-to-r from-black/50 to-transparent" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-r-xl rounded-l-md bg-[linear-gradient(105deg,transparent_40%,rgb(255_255_255/0.10)_45%,transparent_55%)]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

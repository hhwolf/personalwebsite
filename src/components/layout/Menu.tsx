"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { SmoothLink } from "./SmoothLink";

const ease = [0.76, 0, 0.24, 1] as const;

export function Menu() {
  const pathname = usePathname();
  // Keyed by pathname so a route change closes the menu without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const lenis = useLenis();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpenOn(null), []);

  // Lock scroll, trap focus, handle Escape.
  useEffect(() => {
    if (!open) return;
    const button = buttonRef.current;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      button?.focus();
    };
  }, [open, close, lenis]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpenOn(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="site-menu"
        data-magnetic
        className="fixed top-5 right-5 z-[90] inline-flex h-11 items-center gap-3 rounded-full border border-line bg-ink/70 px-5 font-mono text-[0.7rem] tracking-[0.18em] text-bone uppercase backdrop-blur-md transition-colors hover:border-ember hover:text-ember md:top-6 md:right-8"
      >
        <span className="relative flex h-2 w-4 flex-col justify-between" aria-hidden>
          <span
            className={`block h-px w-full bg-current transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-full bg-current transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </span>
        {open ? "Close" : "Menu"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            data-lenis-prevent
            className="fixed inset-0 z-[85] flex flex-col overflow-y-auto bg-ink/95 px-6 pt-28 pb-10 backdrop-blur-xl md:px-10"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <nav className="mx-auto grid w-full max-w-6xl flex-1 gap-12 md:grid-cols-12">
              <ol className="flex flex-col md:col-span-8">
                {site.nav.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.05 }}
                  >
                    <SmoothLink
                      href={`/#${n.id}`}
                      onClick={close}
                      className="group flex items-baseline gap-5 border-b border-line py-4 md:py-5"
                    >
                      <span className="font-mono text-xs text-ash-400 transition-colors group-hover:text-ember">
                        {n.number}
                      </span>
                      <span className="display text-display-md text-bone transition-colors group-hover:text-ember">
                        {n.label}
                      </span>
                    </SmoothLink>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + site.nav.length * 0.05 }}
                >
                  <SmoothLink
                    href="/essays"
                    onClick={close}
                    className="group flex items-baseline gap-5 py-4 md:py-5"
                  >
                    <span className="font-mono text-xs text-ash-400">··</span>
                    <span className="display text-display-md text-ash-200 transition-colors group-hover:text-ember">
                      All essays
                    </span>
                  </SmoothLink>
                </motion.li>
              </ol>

              <motion.div
                className="flex flex-col justify-end gap-8 md:col-span-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <p className="label">Get in touch</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-3 inline-block text-lg text-bone transition-colors hover:text-ember"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="label">Elsewhere</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ash-200">
                    {site.socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-ember"
                        >
                          {s.label} <span aria-hidden>↗</span>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href={site.resumePath} className="transition-colors hover:text-ember">
                        Résumé <span aria-hidden>↗</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="label text-ash-400">
                  {site.location} · {new Date().getFullYear()}
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

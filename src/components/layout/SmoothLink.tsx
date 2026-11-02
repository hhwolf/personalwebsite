"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

type Props = ComponentPropsWithoutRef<typeof Link> & { href: string };

/**
 * Link that smooth-scrolls to in-page anchors ("/#about") when already on the
 * home page, and navigates normally otherwise.
 */
export function SmoothLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const lenis = useLenis();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const path = href.slice(0, hashIndex) || "/";
    const hash = href.slice(hashIndex);
    if (path !== pathname) return;

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;
    e.preventDefault();
    history.replaceState(null, "", hash);
    // Defer a frame so a closing menu overlay can release its scroll lock first;
    // `force` lets Lenis scroll even if it is still marked stopped.
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(target, { offset: -24, force: true });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}

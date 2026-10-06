import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-ember";

const variants: Record<Variant, string> = {
  solid: "bg-ember text-ink px-6 py-3.5 hover:bg-bone",
  outline: "border border-ash-600 text-bone px-6 py-3.5 hover:border-ember hover:text-ember",
  ghost: "text-ash-200 px-2 py-1 hover:text-ember",
};

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

export function Button({
  href,
  variant = "outline",
  external,
  children,
  className = "",
  ...rest
}: Props) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const classes = `${base} ${variants[variant]} ${className}`;
  if (isExternal) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Small arrow that nudges on hover; use inside Button. */
export function Arrow({ external = false }: { external?: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      {external ? "↗" : "→"}
    </span>
  );
}

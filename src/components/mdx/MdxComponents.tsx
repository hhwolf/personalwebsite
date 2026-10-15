import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

/** Components available inside every essay. Add custom embeds here. */
export const mdxComponents = {
  a: Anchor,
};

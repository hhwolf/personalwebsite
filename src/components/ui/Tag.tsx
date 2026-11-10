import type { ReactNode } from "react";

export function Tag({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wider ${
        active
          ? "border-ember bg-ember/10 text-ember"
          : "border-line bg-ink-raised text-ash-200"
      }`}
    >
      {children}
    </span>
  );
}

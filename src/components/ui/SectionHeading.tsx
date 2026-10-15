import type { ReactNode } from "react";

type Props = {
  number: string;
  label: string;
  /** Optional big display title. Use <em> for the ember italic word. */
  title?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ number, label, title, align = "left", className = "" }: Props) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <p
        className={`label flex items-center gap-4 ${centered ? "justify-center" : ""}`}
        data-reveal
      >
        <span className="text-ember">{number}</span>
        <span aria-hidden className="h-px w-10 bg-ember/60" />
        <span>{label}</span>
      </p>
      {title && (
        <h2 className="display text-display-lg mt-6" data-reveal>
          {title}
        </h2>
      )}
    </div>
  );
}

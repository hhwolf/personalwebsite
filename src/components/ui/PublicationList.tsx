import { publications, type Publication } from "@/data/publications";

const kindLabel: Record<Publication["kind"], string> = {
  paper: "Paper",
  poster: "Poster",
  talk: "Talk",
  preprint: "Preprint",
  pending: "In preparation",
};

export function PublicationList() {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {publications.map((p) => {
        const inner = (
          <>
            <span className="label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-ember">{kindLabel[p.kind]}</span>
              <span aria-hidden>·</span>
              <span>{p.year}</span>
              <span aria-hidden>·</span>
              <span className="normal-case tracking-normal">{p.venue}</span>
            </span>
            <span className="display mt-3 block text-2xl leading-tight text-bone transition-colors group-hover:text-ember md:text-3xl">
              {p.title}
              {p.href && (
                <span aria-hidden className="ml-2 inline-block text-base text-ash-400">
                  ↗
                </span>
              )}
            </span>
            <span className="mt-2 block text-sm text-ash-400">{p.authors}</span>
          </>
        );
        return (
          <li key={p.title} data-reveal>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-7"
              >
                {inner}
              </a>
            ) : (
              <div className="block py-7">{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

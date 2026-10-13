import { SectionHeading } from "@/components/ui/SectionHeading";
import { reading } from "@/data/reading";

const tones = [
  "from-ember/80 to-ember-deep text-ink",
  "from-ash-800 to-ink-raised text-bone",
  "from-bone to-ash-200 text-ink",
  "from-ink-raised to-ash-800 text-ember",
];

export function Reading() {
  return (
    <section
      id="reading"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
      data-section="reading"
    >
      <SectionHeading
        number="06"
        label="Reading"
        title={
          <>
            What I&apos;m <em>reading.</em>
          </>
        }
      />
      <p className="mt-8 max-w-xl text-ash-200" data-reveal>
        The current shelf, in no particular order.
      </p>

      <div className="relative mt-16">
        <ol className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-x-4">
          {reading.map((book, i) => (
            <li key={book.title} className="group" data-reveal>
              <div
                className={`relative aspect-[2/3] rounded-r-lg rounded-l-sm border border-line bg-gradient-to-br p-4 shadow-[inset_6px_0_10px_-8px_rgb(0_0_0/0.8)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 group-hover:rotate-[-1.5deg] ${tones[i % tones.length]}`}
              >
                <span aria-hidden className="absolute inset-y-0 left-1.5 w-px bg-ink/20" />
                <p className="display text-[clamp(1.05rem,1.3vw,1.3rem)] leading-tight">
                  {book.title}
                </p>
                {book.author && (
                  <p className="absolute bottom-4 left-4 right-4 font-mono text-[0.6rem] tracking-[0.14em] uppercase opacity-80">
                    {book.author}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
        {/* shelf */}
        <span aria-hidden className="mt-6 block h-px w-full bg-line" />
        <span aria-hidden className="mt-1 block h-px w-full bg-line/50" />
      </div>
    </section>
  );
}

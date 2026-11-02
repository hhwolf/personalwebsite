import { SectionHeading } from "@/components/ui/SectionHeading";
import { reading } from "@/data/reading";
import { BookRing } from "./BookRing";

export function Reading() {
  return (
    <section
      id="reading"
      className="mx-auto w-full max-w-6xl scroll-mt-24 overflow-hidden px-6 py-28 md:py-40"
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
        align="center"
      />
      <p className="mx-auto mt-6 max-w-md text-center text-ash-200" data-reveal>
        The current shelf. Drag to spin it, hover a book to take a closer look.
      </p>
      <div className="mt-12" data-reveal>
        <BookRing books={reading} />
      </div>
      <p className="label mt-2 flex justify-between text-ash-400">
        <span>sys://shelf</span>
        <span>{reading.length} books · drag to spin</span>
      </p>
    </section>
  );
}

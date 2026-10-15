import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { journey } from "@/data/journey";

export function Journey() {
  return (
    <section
      id="journey"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
      data-section="journey"
    >
      <SectionHeading
        number="02"
        label="Journey"
        title={
          <>
            Where I&apos;ve <em>been.</em>
          </>
        }
        align="center"
      />
      <div className="relative mt-20">
        {/* static track */}
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px bg-line md:left-1/2 md:-translate-x-1/2"
        />
        {/* animated fill, scaled by GSAP (scaleY from 0) */}
        <span
          aria-hidden
          data-timeline-fill
          className="absolute top-0 bottom-0 left-4 w-px origin-top bg-ember md:left-1/2 md:-translate-x-1/2"
        />
        <ol className="flex flex-col gap-20">
          {journey.map((entry, i) => (
            <TimelineItem
              key={`${entry.org}-${entry.start}`}
              entry={entry}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

import { Arrow, Button } from "@/components/ui/Button";
import { EssayCard } from "@/components/ui/EssayCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllEssays } from "@/lib/essays";

export async function EssaysPreview() {
  const essays = (await getAllEssays()).slice(0, 3);
  return (
    <section
      id="essays"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
      data-section="essays"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          number="04"
          label="Essays"
          title={
            <>
              Things I&apos;ve <em>written.</em>
            </>
          }
        />
        <div data-reveal>
          <Button href="/essays" variant="ghost">
            All essays <Arrow />
          </Button>
        </div>
      </div>
      <ul className="mt-16 divide-y divide-line border-y border-line">
        {essays.map((essay, i) => (
          <li key={essay.slug}>
            <EssayCard essay={essay} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}

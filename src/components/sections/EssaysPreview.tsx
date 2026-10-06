import { Arrow, Button } from "@/components/ui/Button";
import { EssayCard } from "@/components/ui/EssayCard";
import { PublicationList } from "@/components/ui/PublicationList";
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
          label="Writing"
          title={
            <>
              Papers &amp; <em>essays.</em>
            </>
          }
        />
        {essays.length > 0 && (
          <div data-reveal>
            <Button href="/essays" variant="ghost">
              All essays <Arrow />
            </Button>
          </div>
        )}
      </div>

      <p className="label mt-16" data-reveal>
        Publications &amp; presentations
      </p>
      <div className="mt-4">
        <PublicationList />
      </div>

      <p className="label mt-20" data-reveal>
        Essays
      </p>
      {essays.length > 0 ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {essays.map((essay, i) => (
            <li key={essay.slug}>
              <EssayCard essay={essay} index={i} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 max-w-md text-ash-200" data-reveal>
          Longer-form writing is on its way. Essays live in{" "}
          <code className="font-mono text-sm text-ember">content/essays</code>; the first
          published one will appear here.
        </p>
      )}
    </section>
  );
}

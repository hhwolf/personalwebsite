import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsPlayground } from "./SkillsPlayground";

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
      data-section="skills"
    >
      <SectionHeading
        number="05"
        label="Skills"
        title={
          <>
            What I <em>work with.</em>
          </>
        }
        align="center"
      />
      <p className="mx-auto mt-6 max-w-md text-center text-ash-200" data-reveal>
        The tools I reach for. On a desktop, drag them around.
      </p>
      <div className="mt-12">
        <SkillsPlayground />
      </div>
    </section>
  );
}

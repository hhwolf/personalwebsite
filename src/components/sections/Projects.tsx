import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
      data-section="projects"
    >
      <SectionHeading
        number="03"
        label="Projects"
        title={
          <>
            Things I&apos;ve <em>made.</em>
          </>
        }
      />
      <p className="mt-8 max-w-xl text-ash-200" data-reveal>
        Selected work, newest first. Each one links to the code and, where it exists, a
        live deployment.
      </p>
      <div className="mt-16">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}

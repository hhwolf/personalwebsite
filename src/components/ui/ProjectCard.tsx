import Image from "next/image";
import type { Project } from "@/data/projects";
import { pad2 } from "@/lib/format";
import { Arrow, Button } from "./Button";
import { Tag } from "./Tag";

export function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const flip = index % 2 === 1;
  return (
    <article
      className="grid items-center gap-10 border-t border-line py-16 lg:grid-cols-12 lg:gap-16 lg:py-24"
      data-project
    >
      <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
        <p className="label flex items-center gap-3" data-reveal>
          <span className="text-ember">{pad2(index + 1)}</span>
          <span className="text-ash-400">/ {pad2(total)}</span>
          <span aria-hidden className="h-px w-6 bg-line" />
          <span>{project.year}</span>
        </p>
        <p className="mt-6 inline-flex" data-reveal>
          <Tag>{project.category}</Tag>
        </p>
        <h3 className="display text-display-lg mt-5" data-reveal>
          {project.title}
        </h3>
        <p className="mt-6 max-w-lg text-ash-200" data-reveal>
          {project.description}
        </p>
        {project.challenge && (
          <p
            className="mt-6 max-w-lg border-l-2 border-ember/70 pl-4 text-sm leading-relaxed text-ash-400"
            data-reveal
          >
            <span className="font-mono text-[0.7rem] tracking-wider text-ember uppercase">
              Challenge ·{" "}
            </span>
            {project.challenge}
          </p>
        )}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies" data-reveal>
          {project.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3" data-reveal>
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="solid" data-magnetic>
              Live site <Arrow external />
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="outline" data-magnetic>
              GitHub <Arrow external />
            </Button>
          )}
        </div>
      </div>

      <div
        className={`relative lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-6"}`}
        data-reveal
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-ink-raised">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              placeholder="blur"
              className="scale-[1.15] object-cover"
              data-parallax
            />
          ) : (
            <div
              className="absolute -inset-[8%] flex items-end justify-between p-[14%] md:p-[12%]"
              data-parallax
              style={{
                backgroundImage:
                  "radial-gradient(120% 80% at 80% 0%, rgb(242 163 58 / 0.22), transparent 60%), linear-gradient(180deg, #121214 0%, #0a0a0b 100%)",
              }}
            >
              <span className="display text-outline text-[clamp(4rem,14vw,11rem)] leading-none select-none">
                {pad2(index + 1)}
              </span>
              <span className="label text-ash-400">Screenshot pending</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

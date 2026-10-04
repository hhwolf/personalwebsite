import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow, Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
      data-section="about"
    >
      <SectionHeading number="01" label="About" />
      <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <p className="display text-display-md" data-reveal>
            I&apos;m {site.firstName}. I build software, write about what I learn, and keep
            everything I make <em>in one place</em>, which is this site.
          </p>
          <p className="mt-8 max-w-prose text-ash-200" data-reveal>
            Replace this paragraph with two or three sentences about who you are, what you
            care about, and what you&apos;re looking for. Keep it specific: the project
            you&apos;re proudest of, the problem you can&apos;t stop thinking about, the kind
            of team you want to join.
          </p>
          <p className="mt-5 max-w-prose text-ash-200" data-reveal>
            Outside of work: a hobby, a sport, a thing you collect. People remember the
            human details.
          </p>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <Button href={site.resumePath} variant="solid" external data-magnetic>
              Download résumé <Arrow external />
            </Button>
            <Button href={`mailto:${site.email}`} variant="outline" data-magnetic>
              Say hello <Arrow />
            </Button>
          </div>
        </div>
        <dl className="grid content-start gap-6 border-t border-line pt-8 md:col-span-4 md:col-start-9 md:border-t-0 md:border-l md:pt-0 md:pl-10">
          <Fact term="Based in" detail={site.location} />
          <Fact term="Status" detail={site.availability} />
          <Fact term="Focus" detail="Full-stack web, tooling, writing" />
          <Fact
            term="Elsewhere"
            detail={
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bone underline decoration-ash-600 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            }
          />
        </dl>
      </div>
    </section>
  );
}

function Fact({ term, detail }: { term: string; detail: React.ReactNode }) {
  return (
    <div data-reveal>
      <dt className="label">{term}</dt>
      <dd className="mt-2 text-sm text-ash-200">{detail}</dd>
    </div>
  );
}

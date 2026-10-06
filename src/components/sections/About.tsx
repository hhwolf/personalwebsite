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
            I&apos;m {site.firstName}. I build software, do research where climate meets
            computing, and keep everything I make <em>in one place</em>, which is this site.
          </p>
          <p className="mt-8 max-w-prose text-ash-200" data-reveal>
            I study Computer Science and Philosophy at Brown. Before that I spent four years at
            Phillips Academy Andover as a Caroline D. Bradley Scholar, co-leading the climate
            lobby and tutoring AP math and physics.
          </p>
          <p className="mt-5 max-w-prose text-ash-200" data-reveal>
            Right now I&apos;m a founding engineer at Asteria Labs in San Francisco, building AI
            video avatars and leading go-to-market. My research has ranged from decarbonization
            pathways at the MIT Energy Initiative to neural networks for syllogistic reasoning at
            Cambridge, with four papers and presentations along the way.
          </p>
          <p className="mt-5 max-w-prose text-ash-200" data-reveal>
            Away from a keyboard: tournament chess as a USCF National Master, sprints and long
            jump, piano, and beatboxing.
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
          <Fact term="Studying" detail="Computer Science & Philosophy, Brown '30" />
          <Fact term="Focus" detail="Full-stack web, AI agents, climate and energy research" />
          <Fact term="Chess" detail="USCF National Master · 2230 USCF · 2050 FIDE" />
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

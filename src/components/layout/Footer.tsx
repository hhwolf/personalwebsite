import Link from "next/link";
import { SmoothLink } from "./SmoothLink";
import { Arrow, Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="relative mt-24 scroll-mt-24 border-t border-line"
      data-section="contact"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-10 md:pt-32">
        <p className="label flex items-center gap-3" data-reveal>
          <span className="text-ember">06</span>
          <span aria-hidden className="h-px w-10 bg-ember/60" />
          <span>Contact</span>
          <span aria-hidden className="ml-4 inline-block size-1.5 rounded-full bg-ember" />
          <span className="text-ash-400">{site.availability}</span>
        </p>
        <h2 className="display text-display-xl mt-10" data-reveal>
          <span className="block">Let&apos;s</span>
          <span className="text-outline block">connect.</span>
        </h2>
        <div className="mt-12 flex flex-wrap gap-3" data-reveal>
          <Button href={`mailto:${site.email}`} variant="solid" data-magnetic>
            {site.email} <Arrow />
          </Button>
          <Button href={site.resumePath} variant="outline" external data-magnetic>
            Résumé <Arrow external />
          </Button>
        </div>

        <div className="mt-24 grid gap-10 border-t border-line pt-8 md:grid-cols-3">
          <nav aria-label="Footer">
            <p className="label">Index</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ash-200">
              {site.nav.map((n) => (
                <li key={n.id}>
                  <SmoothLink href={`/#${n.id}`} className="transition-colors hover:text-ember">
                    <span className="mr-2 font-mono text-xs text-ash-400">{n.number}</span>
                    {n.label}
                  </SmoothLink>
                </li>
              ))}
              <li>
                <Link href="/essays" className="transition-colors hover:text-ember">
                  <span className="mr-2 font-mono text-xs text-ash-400">··</span>
                  All essays
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="label">Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-ash-200">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ember"
                  >
                    {s.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="label flex flex-col gap-2 md:items-end md:text-right">
            <span>Based in {site.location}</span>
            <span className="text-ash-400">
              © {year} {site.name}
            </span>
            <SmoothLink href="/#top" className="mt-4 text-ash-400 transition-colors hover:text-ember">
              Back to top ↑
            </SmoothLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

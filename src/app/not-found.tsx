import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-start justify-center px-6 py-24">
      <p className="label">404 — Not found</p>
      <h1 className="display text-display-lg mt-6">
        This page <em>wandered off.</em>
      </h1>
      <Link
        href="/"
        className="label mt-10 inline-flex items-center gap-2 rounded-full border border-ash-600 px-5 py-3 text-bone transition-colors hover:border-ember hover:text-ember"
      >
        Back home <span aria-hidden>→</span>
      </Link>
    </section>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-4 font-display text-6xl">This page doesn&apos;t exist.</h1>
        <p className="mt-4 text-muted">The link may be old, or the address may have a typo.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-fg px-6 text-[0.95rem] font-medium text-bg transition-transform hover:scale-[1.03]"
        >
          Go to the home page
        </Link>
      </div>
    </main>
  );
}

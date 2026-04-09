import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-mist/45">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-mist md:text-4xl">
        This page drifted away.
      </h1>
      <Link
        href="/"
        className="mt-10 rounded-full border border-mist/20 px-8 py-3 text-sm text-mist transition hover:border-accent/50 hover:text-accent"
      >
        Back home
      </Link>
    </div>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-mist/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 text-sm text-mist/45 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Portfolio made by Yaniss-Elie Sey.</p>
        <div className="flex gap-8">
          <Link href="/" className="transition hover:text-mist">
            Home
          </Link>
          <a
            href="https://github.com/neessey"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-mist"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

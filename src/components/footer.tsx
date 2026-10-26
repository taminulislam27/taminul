import Link from "next/link";
import { site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">{site.tagline}</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <Link href="/resume" className="text-muted-foreground transition-colors hover:text-accent">
              Resume
            </Link>
          </li>
          <li>
            <Link href="/activities" className="text-muted-foreground transition-colors hover:text-accent">
              Activities
            </Link>
          </li>
          <li>
            <Link href="/now" className="text-muted-foreground transition-colors hover:text-accent">
              Now
            </Link>
          </li>
          <li>
            <Link href="/uses" className="text-muted-foreground transition-colors hover:text-accent">
              Uses
            </Link>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}

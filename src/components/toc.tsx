import type { Heading } from "@/lib/posts";
import { cn } from "@/lib/utils";

/** Collapsible "On this page" list. Hidden for short posts with fewer than 3 headings. */
export function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <details className="my-8 rounded-xl border border-border bg-card p-4" open>
      <summary className="cursor-pointer font-mono text-xs uppercase tracking-wider text-accent">
        On this page
      </summary>
      <ul className="mt-3 space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "pl-4")}>
            <a href={`#${h.id}`} className="text-muted-foreground transition-colors hover:text-accent">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

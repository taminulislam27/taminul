import Link from "next/link";
import { cn } from "@/lib/utils";

type TagCount = { tag: string; count: number };

export function TagFilter({ tags, active }: { tags: TagCount[]; active?: string }) {
  if (tags.length === 0) return null;

  const base = "rounded-full border px-3 py-1 text-sm transition-colors";
  const on = "border-accent bg-accent text-accent-foreground";
  const off = "border-border text-muted-foreground hover:border-accent/60 hover:text-foreground";

  return (
    <nav aria-label="Filter posts by tag" className="mx-auto max-w-5xl px-4 pb-6 sm:px-6">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/blog" aria-current={!active ? "page" : undefined} className={cn(base, !active ? on : off)}>
            All
          </Link>
        </li>
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link
              href={`/blog/tags/${tag}`}
              aria-current={active === tag ? "page" : undefined}
              className={cn(base, active === tag ? on : off)}
            >
              #{tag} <span className="opacity-70">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

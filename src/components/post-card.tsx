import Link from "next/link";
import Image from "next/image";
import { formatDate, type PostMeta } from "@/lib/posts";
import { Tag } from "./section";

export function PostCard({ post }: { post: PostMeta }) {
  const date = formatDate(post.date);

  return (
    <article className="group relative rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60">
      <div className="flex gap-4">
        {post.cover && (
          <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border sm:block">
            <Image src={post.cover} alt="" fill sizes="96px" className="object-cover" />
          </div>
        )}
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
            {date && <time dateTime={post.date}>{date}</time>}
            {date && <span aria-hidden>·</span>}
            <span>{post.readingMinutes} min read</span>
            {post.lang === "bn" && (
              <>
                <span aria-hidden>·</span>
                <span>বাংলা</span>
              </>
            )}
          </p>
          <h3 className="mt-1 text-lg font-semibold leading-snug" lang={post.lang}>
            <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 hover:text-accent">
              {post.title}
            </Link>
          </h3>
          {post.summary && <p className="mt-2 text-sm text-muted-foreground">{post.summary}</p>}
          {post.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t}>
                  <Tag>#{t}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

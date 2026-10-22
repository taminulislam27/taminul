import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Tag } from "@/components/section";
import { Toc } from "@/components/toc";
import { mdxComponents } from "@/components/mdx";
import { mdxOptions } from "@/lib/mdx-options";
import { formatDate, getAllPosts, getHeadings, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
      images: post.cover ? [{ url: post.cover, alt: post.coverAlt ?? post.title }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = formatDate(post.date);
  const headings = getHeadings(post.content);
  const originalUrl = post.canonical ?? post.medium;

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} aria-hidden /> All writing
      </Link>

      <header className="mt-6" lang={post.lang}>
        <p className="font-mono text-xs text-muted-foreground" lang="en">
          {date && <time dateTime={post.date}>{date}</time>}
          {date && " · "}
          {post.readingMinutes} min read
          {post.lang === "bn" && " · বাংলা"}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        {post.summary && (
          <p className="mt-3 text-lg text-muted-foreground" lang="en">
            {post.summary}
          </p>
        )}
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags" lang="en">
            {post.tags.map((t) => (
              <li key={t}>
                <Link href={`/blog/tags/${t}`}>
                  <Tag>#{t}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      {post.cover && (
        <Image
          src={post.cover}
          alt={post.coverAlt ?? ""}
          width={0}
          height={0}
          sizes="(min-width: 768px) 576px, 100vw"
          priority
          className="mx-auto mt-8 h-auto w-full max-w-xl rounded-xl border border-border"
        />
      )}

      <Toc headings={headings} />

      <div lang={post.lang} className={post.lang === "bn" ? "text-lg" : undefined}>
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </div>

      {originalUrl && (
        <p className="mt-10 text-sm text-muted-foreground" lang="en">
          Originally published on{" "}
          <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
            Medium
          </a>
          .
        </p>
      )}

      <footer className="mt-16 rounded-xl border border-border bg-card p-6" lang="en">
        <p className="font-semibold">Enjoyed this?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Follow the RSS feed, or say hello if you want to talk about the idea.
        </p>
        <div className="mt-4 flex gap-5 text-sm">
          <a href="/feed.xml" className="text-accent underline-offset-4 hover:underline">
            RSS feed
          </a>
          <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
            Get in touch
          </Link>
        </div>
      </footer>
    </article>
  );
}

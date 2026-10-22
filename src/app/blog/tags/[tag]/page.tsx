import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";
import { getAllPosts, getAllTags } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllTags()).map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Posts tagged #${tag}`, description: `Writing about ${tag} by Taminul Islam.` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);
  const filtered = posts.filter((p) => p.tags.includes(tag));
  if (filtered.length === 0) notFound();

  return (
    <>
      <PageHeader title={`#${tag}`} subtitle={`${filtered.length} post${filtered.length === 1 ? "" : "s"} on this topic.`} />
      <TagFilter tags={tags} active={tag} />
      <div className="mx-auto max-w-5xl space-y-4 px-4 pb-20 sm:px-6">
        {filtered.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}

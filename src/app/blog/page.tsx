import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on programming, learning and teaching, in English and Bangla.",
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <>
      <PageHeader title="Writing" subtitle="Notes on programming, learning and teaching, in English and Bangla." />
      <TagFilter tags={tags} />
      <div className="mx-auto max-w-5xl space-y-4 px-4 pb-20 sm:px-6">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          posts.map((p) => <PostCard key={p.slug} post={p} />)
        )}
        <p className="pt-4 text-sm text-muted-foreground">
          <a href="/feed.xml" className="text-accent underline-offset-4 hover:underline">
            RSS feed
          </a>
        </p>
      </div>
    </>
  );
}

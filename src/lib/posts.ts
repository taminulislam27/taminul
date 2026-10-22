import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const postsDir = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD). Optional: undated posts sort last and show no date. */
  date?: string;
  tags: string[];
  lang: "en" | "bn";
  /** Path under /public, e.g. /blog/my-cover.png */
  cover?: string;
  coverAlt?: string;
  /** Set when the post was first published elsewhere (e.g. Medium), to avoid duplicate-content penalties. */
  canonical?: string;
  /** Link shown in the "Originally published on Medium" note. Use the exact post URL as `canonical` when you have it. */
  medium?: string;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

export type Heading = { id: string; text: string; level: 2 | 3 };

function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  // gray-matter turns an unquoted YAML date into a Date object.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function stripMarkdown(src: string): string {
  return src
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|-]/g, " ");
}

export function readingMinutes(content: string, lang: "en" | "bn"): number {
  const words = stripMarkdown(content).split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = lang === "bn" ? 180 : 220;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const lang = data.lang === "bn" ? "bn" : "en";
  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    date: toIsoDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    lang,
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    canonical: data.canonical ? String(data.canonical) : undefined,
    medium: data.medium ? String(data.medium) : undefined,
    draft: data.draft === true,
    readingMinutes: readingMinutes(content, lang),
    content,
  };
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const raw = await fs.readFile(path.join(postsDir, `${slug}.mdx`), "utf8");
    const post = parsePost(slug, raw);
    if (post.draft && process.env.NODE_ENV === "production") return null;
    return post;
  } catch {
    return null;
  }
}

/** All published posts, newest first. Undated posts come last. */
export async function getAllPosts(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(postsDir)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }

  const posts = (
    await Promise.all(files.map((f) => getPost(f.replace(/\.mdx$/, ""))))
  ).filter((p): p is Post => p !== null);

  return posts.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const post of await getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** h2/h3 headings, with ids matching what rehype-slug generates. */
export function getHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_]/g, "")
      .trim();
    headings.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
}

export function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

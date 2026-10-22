import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      const pubDate = p.date ? `<pubDate>${new Date(p.date).toUTCString()}</pubDate>` : "";
      const categories = p.tags.map((t) => `<category>${esc(t)}</category>`).join("");
      return `<item>
<title>${esc(p.title)}</title>
<link>${url}</link>
<guid isPermaLink="true">${url}</guid>
<description>${esc(p.summary)}</description>
${pubDate}
${categories}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${esc(site.name)}: Writing</title>
<link>${site.url}/blog</link>
<description>${esc("Notes on programming, learning and teaching.")}</description>
<language>en</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

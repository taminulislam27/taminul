import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getAllPosts, getAllTags } from "@/lib/posts";

const staticRoutes = [
  "",
  "/about",
  "/projects",
  "/blog",
  "/teaching",
  "/competitive-programming",
  "/resume",
  "/activities",
  "/now",
  "/uses",
  "/contact",
  ...projects.filter((p) => p.caseStudy).map((p) => `/projects/${p.slug}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  for (const p of posts) {
    entries.push({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  for (const { tag } of tags) {
    entries.push({ url: `${site.url}/blog/tags/${tag}`, lastModified: now, changeFrequency: "monthly", priority: 0.3 });
  }

  return entries;
}

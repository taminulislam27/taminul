import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content", "projects");

export type CaseStudyMeta = {
  title: string;
  summary: string;
};

export type CaseStudy = {
  meta: CaseStudyMeta;
  content: string;
};

/** Reads content/projects/<slug>.mdx. Returns null if it doesn't exist. */
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  // Slugs come from the URL, so only allow safe characters.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  try {
    const raw = await fs.readFile(path.join(projectsDir, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { meta: data as CaseStudyMeta, content };
  } catch {
    return null;
  }
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Tag } from "@/components/section";
import { mdxComponents } from "@/components/mdx";
import { getCaseStudy } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx-options";
import { projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const study = await getCaseStudy(slug);
  if (!project || !study) return {};
  return {
    title: study.meta.title ?? project.title,
    description: study.meta.summary ?? project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.caseStudy);
  const study = await getCaseStudy(slug);
  if (!project || !study) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} aria-hidden /> All projects
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{study.meta.summary ?? project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        {(project.live || project.repo) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Live site <ExternalLink size={14} aria-hidden />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                View code <ExternalLink size={14} aria-hidden />
              </a>
            )}
          </div>
        )}
      </header>

      <div className="mt-10 border-t border-border pt-2">
        <MDXRemote
          source={study.content}
          components={mdxComponents}
          options={mdxOptions}
        />
      </div>

      <footer className="mt-16 rounded-xl border border-border bg-card p-6">
        <p className="font-semibold">Want to talk about this project?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          I&apos;m happy to walk through the code, the decisions, or how I&apos;d approach something similar.
        </p>
        <Link href="/contact" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
          Get in touch
        </Link>
      </footer>
    </article>
  );
}

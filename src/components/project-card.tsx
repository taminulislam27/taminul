import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Card, Tag } from "./section";

function LinkOut({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
    >
      {children} <ExternalLink size={13} aria-hidden />
    </a>
  );
}

export function ProjectCard({ project, detailed = false }: { project: Project; detailed?: boolean }) {
  return (
    <Card className="flex h-full flex-col">
      {project.image && (
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>

      {detailed && <p className="mt-4 text-sm leading-relaxed">{project.description}</p>}

      {detailed && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
        {project.stack.map((s) => (
          <li key={s}>
            <Tag>{s}</Tag>
          </li>
        ))}
      </ul>

      {(project.caseStudy || project.live || project.repo) && (
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
          {project.caseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              Case study <ArrowRight size={13} aria-hidden />
            </Link>
          )}
          {project.live && <LinkOut href={project.live}>Live site</LinkOut>}
          {project.repo && <LinkOut href={project.repo}>Code</LinkOut>}
        </div>
      )}
    </Card>
  );
}

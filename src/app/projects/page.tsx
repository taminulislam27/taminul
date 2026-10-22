import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { GithubActivity } from "@/components/github-activity";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full-stack apps and systems projects by Taminul Islam.",
};

// The GitHub section below refreshes at most once an hour.
export const revalidate = 3600;

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" subtitle="Things I've built, and the tools I used to build them." />
      <div className="mx-auto grid max-w-5xl gap-4 px-4 pb-10 sm:px-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} detailed />
        ))}
      </div>
      <GithubActivity />
    </>
  );
}

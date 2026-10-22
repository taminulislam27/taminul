import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, socials, stats } from "@/lib/site";
import { featuredProjects } from "@/lib/projects";
import { Card, Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

const teaching = [
  {
    role: "Jr. Coding Instructor",
    org: "Kishor Coder",
    body: "Teaching programming, data structures and problem-solving, and mentoring students through assignments and debugging.",
  },
  {
    role: "ICT & Mathematics Teacher",
    org: "DS Academy",
    body: "Planning lessons and study materials, and running online workshops and doubt-solving sessions.",
  },
  {
    role: "Joint R&D Secretary",
    org: "Barishal University IT Society",
    body: "Designing hands-on workshops and organizing competitive programming contests and coding bootcamps.",
  },
];

const medium = socials.find((s) => s.label === "Medium")!;

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <p className="font-mono text-sm text-accent">Hello, world.</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Hi, I&apos;m {site.shortName}.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">{site.intro}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            See my projects <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Get in touch
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Open to {site.openTo.map((t) => t.toLowerCase()).join(" · ")}
        </p>
      </section>

      <section aria-label="Highlights" className="border-y border-border bg-muted/40">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</dd>
              <p className="mt-1 text-sm text-muted-foreground" aria-hidden>
                {s.label}
              </p>
            </div>
          ))}
        </dl>
      </section>

      <Section
        title="Featured projects"
        subtitle="Full-stack apps and a C++ systems project, built to solve real problems."
        href="/projects"
        hrefLabel="All projects"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section
        title="Teaching & community"
        subtitle="I learn best by explaining things to others."
        href="/teaching"
        hrefLabel="More about teaching"
        className="border-t border-border"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {teaching.map((t) => (
            <Card key={t.org}>
              <p className="font-mono text-xs text-accent">{t.org}</p>
              <h3 className="mt-2 font-semibold">{t.role}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Writing"
        subtitle="Notes on programming, learning and teaching."
        href="/blog"
        hrefLabel="Writing page"
        className="border-t border-border"
      >
        {latestPosts.length > 0 ? (
          <div className="space-y-4">
            {latestPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted-foreground">New posts are on the way. Meanwhile, find me on Medium.</p>
            <a
              href={medium.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline"
            >
              Read on Medium
            </a>
          </Card>
        )}
      </Section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Let&apos;s work together.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            I&apos;m looking for internships, and I&apos;m happy to mentor students or collaborate on projects.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Say hello <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, socials, stats } from "@/lib/site";
import { featuredProjects } from "@/lib/projects";
import { Card, Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts } from "@/lib/posts";
import { photos } from "@/lib/gallery";

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

const beyond = [
  { when: "2025–26", title: "Organizer, Hult Prize at University of Barishal" },
  { when: "26 Dec 2026", title: "Campus Ambassador, International AI Builders Congress" },
  { when: "2025", title: "Campus Ambassador, Phitron (Phitronista'25)" },
  { when: "Hackathon", title: "Batch Winner (11th Batch), Onebyzero Edu Problem-Solving Hackathon" },
];

const medium = socials.find((s) => s.label === "Medium")!;

// Structured data for search engines. Only profile links known to be correct are listed here.
const verifiedProfiles = ["GitHub", "Medium", "X"];
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Computer Science and Engineering student",
  description: site.description,
  affiliation: { "@type": "CollegeOrUniversity", name: "University of Barishal" },
  sameAs: socials.filter((s) => verifiedProfiles.includes(s.label)).map((s) => s.href),
};

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd} />
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 md:grid-cols-[1fr_auto]">
        <div>
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
        </div>

        <Image
          src={photos.portraitNew.src}
          alt={photos.portraitNew.alt}
          width={photos.portraitNew.width}
          height={photos.portraitNew.height}
          priority
          sizes="(min-width: 768px) 288px, 224px"
          className="h-56 w-56 object-contain md:h-72 md:w-72"
        />
      </section>

      <section aria-label="Highlights" className="border-y border-border bg-muted/40">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section
        title="Featured projects"
        subtitle="Full-stack web apps and a Java desktop system, built to solve real problems."
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
        title="Beyond the code"
        subtitle="Organizing, representing my university and showing up."
        href="/activities"
        hrefLabel="Activities and awards"
        className="border-t border-border"
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Image
            src={photos.runTeam.src}
            alt={photos.runTeam.alt}
            width={photos.runTeam.width}
            height={photos.runTeam.height}
            sizes="(min-width: 768px) 480px, 100vw"
            className="h-auto w-full rounded-xl border border-border"
          />
          <ul className="space-y-4 text-sm">
            {beyond.map((b) => (
              <li key={b.title}>
                <p className="font-mono text-xs text-accent">{b.when}</p>
                <p className="mt-1 font-semibold">{b.title}</p>
              </li>
            ))}
          </ul>
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

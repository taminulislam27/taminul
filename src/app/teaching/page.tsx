import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, Section } from "@/components/section";
import { resume } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Teaching & Community",
  description: "Coding instruction, student communities and free learning resources by Taminul Islam.",
};

const teachingOrgs = ["Kishor Coder", "DS Academy"];
const teaching = resume.experience.filter((x) => teachingOrgs.includes(x.org));
const community = resume.experience.filter((x) => !teachingOrgs.includes(x.org));

type Role = (typeof resume.experience)[number];

function RoleCard({ role }: { role: Role }) {
  return (
    <Card className="h-full">
      <p className="font-mono text-xs text-accent">{role.period}</p>
      <h3 className="mt-2 font-semibold">{role.title}</h3>
      <p className="text-sm text-muted-foreground">{role.org}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {role.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </Card>
  );
}

const recognition = [
  { title: "Best Performer, Phitronista'25", org: "Phitron", when: "2025" },
  { title: "Excellent Leader of June 2025", org: "Shohoj Coding (Campus Ambassador)", when: "June 2025" },
];

export default function TeachingPage() {
  return (
    <>
      <PageHeader
        title="Teaching & Community"
        subtitle="I learn best by explaining things to others. I teach programming and school subjects, and I help student communities at the University of Barishal."
      />

      <Section title="Teaching" className="pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {teaching.map((r) => (
            <RoleCard key={`${r.org}-${r.title}`} role={r} />
          ))}
        </div>
      </Section>

      <Section
        title="Community"
        subtitle="Leading, organizing and supporting other students."
        className="border-t border-border"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {community.map((r) => (
            <RoleCard key={`${r.org}-${r.title}`} role={r} />
          ))}
        </div>
      </Section>

      <Section title="Recognition" className="border-t border-border">
        <ul className="grid gap-4 md:grid-cols-2">
          {recognition.map((r) => (
            <li key={r.title}>
              <Card className="h-full">
                <p className="font-mono text-xs text-accent">{r.when}</p>
                <h3 className="mt-2 font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.org}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Free resources for students"
        subtitle="Things I wish I'd had when I started. Written in Bangla."
        href="/blog"
        hrefLabel="All writing"
        className="border-t border-border"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          <li>
            <Card className="h-full">
              <h3 className="font-semibold" lang="bn">
                <Link href="/blog/my-dsa-journey" className="hover:text-accent">
                  আমি কোড লিখি, কিন্তু প্রবলেম সল্ভ করতে পারি না…
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Why DSA matters, and a 7-step roadmap from arrays to dynamic programming.
              </p>
            </Card>
          </li>
          <li>
            <Card className="h-full">
              <h3 className="font-semibold" lang="bn">
                <Link href="/blog/contest-preparation-plan" className="hover:text-accent">
                  Programming কনটেস্টের আগে টপারদের প্রস্তুতি
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A 5-step plan: weaknesses, time management, mock contests, editorials and rest.
              </p>
            </Card>
          </li>
        </ul>
      </Section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">Want a mentor, or a speaker?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            I&apos;m happy to help beginners with coding, DSA and contest preparation, and to collaborate on student
            workshops and projects.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}

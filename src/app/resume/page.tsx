import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Tag } from "@/components/section";
import { photos } from "@/lib/gallery";
import { resume } from "@/lib/resume";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Education, experience, achievements and skills of Taminul Islam.",
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-border pb-2 font-mono text-xs uppercase tracking-wider text-accent">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <>
      <PageHeader title="Resume" subtitle={`${site.name} · CSE student, University of Barishal`} />

      <div className="mx-auto max-w-3xl space-y-12 px-4 pb-20 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-sm">
          {resume.pdf && (
            <a
              href={resume.pdf}
              download
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              <Download size={16} aria-hidden /> Download PDF
            </a>
          )}
          <a href={`mailto:${site.email}`} className="text-accent underline-offset-4 hover:underline">
            {site.email}
          </a>
          </div>
          <Image
            src={photos.portraitBw.src}
            alt={photos.portraitBw.alt}
            width={photos.portraitBw.width}
            height={photos.portraitBw.height}
            priority
            sizes="128px"
            className="h-32 w-32 rounded-2xl border border-border bg-muted object-cover object-top"
          />
        </div>

        <section>
          <Heading>Education</Heading>
          {resume.education.map((e) => (
            <div key={e.title}>
              <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-muted-foreground">{e.org}</p>
            </div>
          ))}
        </section>

        <section>
          <Heading>Experience</Heading>
          <div className="space-y-8">
            {resume.experience.map((x) => (
              <div key={`${x.org}-${x.title}`}>
                <p className="font-mono text-xs text-muted-foreground">{x.period}</p>
                <p className="font-medium">
                  {x.title} <span className="font-normal text-muted-foreground">· {x.org}</span>
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {x.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading>Achievements</Heading>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {resume.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section>
          <Heading>Certifications</Heading>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {resume.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section>
          <Heading>Skills</Heading>
          <div className="space-y-4">
            {resume.skills.map((g) => (
              <div key={g.group}>
                <p className="mb-2 text-sm font-medium">{g.group}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i}>
                      <Tag>{i}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

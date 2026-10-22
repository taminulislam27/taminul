import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Timeline } from "@/components/timeline";
import { aboutParagraphs, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "CSE student, competitive programmer and coding instructor at the University of Barishal.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About me" />
      <div className="mx-auto grid max-w-5xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed">
          {aboutParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "" : "text-muted-foreground"}>
              {p}
            </p>
          ))}
          <p className="font-medium">
            I&apos;m looking for internship opportunities, and I&apos;m always happy to mentor students or collaborate on
            projects.
          </p>
          <p className="text-base">
            <Link href="/resume" className="text-accent underline-offset-4 hover:underline">
              View my resume
            </Link>
            {" · "}
            <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
              Get in touch
            </Link>
          </p>
        </div>

        <aside aria-label="Timeline">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">Timeline</h2>
          <Timeline items={timeline} />
        </aside>
      </div>
    </>
  );
}

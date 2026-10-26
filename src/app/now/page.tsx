import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/section";
import { now } from "@/lib/now";

export const metadata: Metadata = {
  title: "Now",
  description: "What Taminul Islam is focused on right now: learning, teaching, building and looking for.",
};

const updatedLabel = new Date(`${now.updated}-01T00:00:00Z`).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function NowPage() {
  return (
    <>
      <PageHeader title="Now" subtitle={now.intro} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <p className="font-mono text-xs text-muted-foreground">Last updated {updatedLabel}</p>

        <div className="mt-6 space-y-4">
          {now.sections.map((s) => (
            <Card key={s.title}>
              <h2 className="font-mono text-xs uppercase tracking-wider text-accent">{s.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Want to talk about any of this?{" "}
          <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </>
  );
}

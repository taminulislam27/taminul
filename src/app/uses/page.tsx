import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/section";
import { uses } from "@/lib/uses";

export const metadata: Metadata = {
  title: "Uses",
  description: "The languages, tools and services Taminul Islam uses to learn, build and teach.",
};

export default function UsesPage() {
  return (
    <>
      <PageHeader title="Uses" subtitle="The languages, tools and services I use to learn, build and teach." />
      <div className="mx-auto grid max-w-5xl gap-4 px-4 pb-20 sm:px-6 md:grid-cols-2">
        {uses.map((group) => (
          <Card key={group.title}>
            <h2 className="font-mono text-xs uppercase tracking-wider text-accent">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li key={item.name} className="text-sm">
                  <span className="font-medium">{item.name}</span>
                  {"note" in item && item.note && <span className="text-muted-foreground"> · {item.note}</span>}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}

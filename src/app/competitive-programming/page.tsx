import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, Section } from "@/components/section";
import { GithubActivity } from "@/components/github-activity";
import { ZoomImage } from "@/components/zoom-image";
import { photos } from "@/lib/gallery";
import { codechef, getCodeforces, highlights } from "@/lib/cp";
import { socials } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Competitive Programming",
  description: "Codeforces stats, contest highlights and problem-solving notes by Taminul Islam.",
};

// Re-fetch live Codeforces data at most once an hour.
export const revalidate = 3600;

const link = (label: string) => socials.find((s) => s.label === label)?.href ?? "#";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-xl font-bold capitalize">{value}</dd>
    </div>
  );
}

function PlatformLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
    >
      {children} <ExternalLink size={13} aria-hidden />
    </a>
  );
}

export default async function CompetitiveProgrammingPage() {
  const cf = await getCodeforces();

  return (
    <>
      <PageHeader
        title="Competitive Programming"
        subtitle="Over 1,000 problems solved across Codeforces, CodeChef and LeetCode. Practice is what turned coding into problem solving for me."
      />

      <div className="mx-auto grid max-w-5xl gap-4 px-4 pb-10 sm:px-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <h2 className="font-semibold">Codeforces</h2>
          {cf ? (
            <>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat label="Rating" value={cf.rating ? String(cf.rating) : "Unrated"} />
                <Stat label="Max rating" value={cf.maxRating ? String(cf.maxRating) : "–"} />
                <Stat label="Rank" value={cf.rank ?? "–"} />
                <Stat label="Contests" value={String(cf.contests)} />
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                Live from the Codeforces API for <span className="font-mono">{cf.handle}</span>, refreshed hourly.
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Live stats are unavailable right now. You can see my current rating on the profile.
            </p>
          )}
          <PlatformLink href={link("Codeforces")}>Codeforces profile</PlatformLink>
        </Card>

        <div className="grid gap-4">
          <Card>
            <h2 className="font-semibold">CodeChef</h2>
            <p className="mt-3 text-xl font-bold">{codechef.rating}</p>
            <PlatformLink href={link("CodeChef")}>CodeChef profile</PlatformLink>
          </Card>
          <Card>
            <h2 className="font-semibold">LeetCode</h2>
            <p className="mt-3 text-sm text-muted-foreground">Practice and interview-style problems.</p>
            <PlatformLink href={link("LeetCode")}>LeetCode profile</PlatformLink>
          </Card>
        </div>
      </div>

      {cf && cf.recent.length > 0 && (
        <Section title="Recent Codeforces contests" className="pt-4">
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Contest</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Rank</th>
                  <th className="px-4 py-3 font-medium">Rating change</th>
                </tr>
              </thead>
              <tbody>
                {cf.recent.map((c) => {
                  const delta = c.newRating - c.oldRating;
                  return (
                    <tr key={`${c.name}-${c.date}`} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">{c.name}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {new Date(c.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.rank}</td>
                      <td
                        className={cn(
                          "whitespace-nowrap px-4 py-3 font-mono",
                          delta > 0 && "text-green-600 dark:text-green-400",
                          delta < 0 && "text-red-600 dark:text-red-400",
                        )}
                      >
                        {delta > 0 ? "+" : ""}
                        {delta} → {c.newRating}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <Section title="Contest highlights" className="border-t border-border">
        <ul className="grid gap-4 md:grid-cols-3">
          {highlights.map((h) => (
            <li key={h.title}>
              <Card className="h-full">
                <p className="font-mono text-xs text-accent">{h.when}</p>
                <h3 className="mt-2 font-semibold">{h.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{h.note}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="On the contest floor"
        subtitle="Photos from on-site programming contests. Click a photo to enlarge it."
        className="border-t border-border"
      >
        <div className="grid items-start gap-4 sm:grid-cols-3">
          <ZoomImage photo={photos.lab2} ratio="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          <ZoomImage photo={photos.lab3} ratio="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          <ZoomImage photo={photos.lab4} ratio="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
        </div>
      </Section>

      <Section
        title="Recognition"
        subtitle="Certificates and awards for problem solving."
        href="/activities"
        hrefLabel="More activities and awards"
        className="border-t border-border"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <ZoomImage photo={photos.phitronDsa} ratio="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          <ZoomImage photo={photos.onebyzero} ratio="aspect-[4/3]" position="object-[50%_45%]" sizes="(min-width: 640px) 33vw, 100vw" />
          <ZoomImage photo={photos.phitronKit} ratio="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
        </div>
      </Section>

      <Section
        title="What I've written about it"
        subtitle="Two posts, in Bangla, for students who want to start or prepare."
        href="/blog/tags/competitive-programming"
        hrefLabel="All posts on this topic"
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
              <p className="mt-2 text-sm text-muted-foreground">My DSA journey and the 7-step roadmap I followed.</p>
            </Card>
          </li>
          <li>
            <Card className="h-full">
              <h3 className="font-semibold" lang="bn">
                <Link href="/blog/contest-preparation-plan" className="hover:text-accent">
                  Programming কনটেস্টের আগে টপারদের প্রস্তুতি
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">A 5-step plan for the night before a contest.</p>
            </Card>
          </li>
        </ul>
      </Section>

      <GithubActivity />
    </>
  );
}

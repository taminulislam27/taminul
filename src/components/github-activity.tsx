import { ExternalLink, Star } from "lucide-react";
import { getGithub } from "@/lib/github";
import { Card, Section } from "./section";

function monthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Server component: recent public repos from the GitHub API, refreshed hourly. Hides itself if GitHub can't be reached. */
export async function GithubActivity() {
  const gh = await getGithub();
  if (!gh || gh.repos.length === 0) return null;

  return (
    <Section
      title="Recent on GitHub"
      subtitle={`${gh.publicRepos} public repositories and ${gh.followers} followers. These are the ones I touched most recently.`}
      className="border-t border-border"
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {gh.repos.map((r) => (
          <li key={r.name}>
            <Card className="h-full">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-accent underline-offset-4 hover:underline"
              >
                {r.name} <ExternalLink size={13} aria-hidden />
              </a>
              {r.description && <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>}
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                {r.language && <span>{r.language}</span>}
                {r.stars > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <Star size={12} aria-hidden /> {r.stars}
                  </span>
                )}
                <span>Updated {monthYear(r.pushedAt)}</span>
              </p>
            </Card>
          </li>
        ))}
      </ul>
      <a
        href={gh.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
      >
        See everything on GitHub <ExternalLink size={13} aria-hidden />
      </a>
    </Section>
  );
}

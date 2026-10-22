export const githubUser = "taminulislam27";

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type GithubSummary = {
  profileUrl: string;
  publicRepos: number;
  followers: number;
  repos: GithubRepo[];
};

type ApiUser = { html_url: string; public_repos: number; followers: number };
type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

async function gh<T>(path: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    // Optional: a token lifts the 60 requests/hour limit. Public data only, so no scopes are needed.
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const res = await fetch(`https://api.github.com/${path}`, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Returns null when GitHub is unreachable or rate-limited, so the section can hide itself. */
export async function getGithub(): Promise<GithubSummary | null> {
  const [user, repos] = await Promise.all([
    gh<ApiUser>(`users/${githubUser}`),
    gh<ApiRepo[]>(`users/${githubUser}/repos?sort=pushed&per_page=30&type=owner`),
  ]);
  if (!user || !repos) return null;

  return {
    profileUrl: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    repos: repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
  };
}

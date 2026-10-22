// Competitive programming data. Live Codeforces stats come from the public API;
// everything else here is static and edited by hand.

export const codeforcesHandle = "BitClouda";

export type CfContest = {
  name: string;
  rank: number;
  oldRating: number;
  newRating: number;
  date: string; // ISO
};

export type CfProfile = {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  contests: number;
  recent: CfContest[];
};

type CfInfo = { handle: string; rating?: number; maxRating?: number; rank?: string; maxRank?: string };
type CfRatingChange = {
  contestName: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
};
type CfResponse<T> = { status: string; result?: T };

async function cf<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://codeforces.com/api/${path}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as CfResponse<T>;
    return json.status === "OK" && json.result ? json.result : null;
  } catch {
    return null;
  }
}

/** Returns null when the API is unreachable, so the page can show a fallback instead of failing. */
export async function getCodeforces(): Promise<CfProfile | null> {
  const [info, changes] = await Promise.all([
    cf<CfInfo[]>(`user.info?handles=${encodeURIComponent(codeforcesHandle)}`),
    cf<CfRatingChange[]>(`user.rating?handle=${encodeURIComponent(codeforcesHandle)}`),
  ]);

  const user = info?.[0];
  if (!user) return null;

  const history = changes ?? [];
  return {
    handle: user.handle,
    rating: user.rating,
    maxRating: user.maxRating,
    rank: user.rank,
    maxRank: user.maxRank,
    contests: history.length,
    recent: history
      .slice(-5)
      .reverse()
      .map((c) => ({
        name: c.contestName,
        rank: c.rank,
        oldRating: c.oldRating,
        newRating: c.newRating,
        date: new Date(c.ratingUpdateTimeSeconds * 1000).toISOString(),
      })),
  };
}

// CodeChef has no public API, so this is updated by hand.
export const codechef = { rating: "2★" };

export const highlights = [
  {
    when: "Apr 2026",
    title: "Batch Winner, Academic Problem-Solving Hackathon 1.0",
    note: "OneByZero Edu",
  },
  {
    when: "Feb 2026",
    title: "13th place, BU IUPC'26",
    note: "University programming contest",
  },
  {
    when: "Nov 2025",
    title: "ICPC Preliminary",
    note: "Competed with team BU_Titans",
  },
] as const;

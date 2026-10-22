# taminul-site

Personal website for Taminul Islam. Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands: `npm run lint`, `npm run build`, `npm start`.

## Where things live

- `src/lib/site.ts` — site content (name, links, stats, timeline, About text). Edit here first.
- `src/lib/projects.ts` — project list. Add `live` and `repo` URLs here; missing links are hidden. Set `caseStudy: true` once `content/projects/<slug>.mdx` exists.
- `content/projects/*.mdx` — case studies (frontmatter: `title`, `summary`). Edit the "Why I built it" and "What I learned" sections so they match your own experience.
- `content/blog/*.mdx` — blog posts. Frontmatter: `title`, `summary`, `date` ("YYYY-MM-DD"), `tags`, `lang` (`en` or `bn`), optional `cover`, `coverAlt`, `canonical` (original URL if first published elsewhere) and `draft: true` (hidden in production). Reading time, table of contents, tag pages, sitemap and RSS (`/feed.xml`) are generated automatically.
- `public/blog/`, `public/projects/` — images used by posts and case studies.
- `src/lib/cp.ts` — Codeforces handle, CodeChef rating and contest highlights. `src/lib/github.ts` — GitHub username.
- `src/lib/resume.ts` — web resume. The PDF lives in `public/`; set `pdf` to `null` to hide the download button.
- `src/app/globals.css` — color tokens for light and dark mode.
- `src/components/` — navbar, footer, theme toggle, page header.
- `src/app/<route>/page.tsx` — one folder per page.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com/new (framework is detected automatically).
3. Add the environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL`: your final domain, e.g. `https://yourdomain.dev`.
   - `NEXT_PUBLIC_FORMSPREE_ID`: from formspree.io. Create a free form, open its **Integration** tab and copy the form ID shown under "Your form's endpoint is". Until it is set, the contact form opens the visitor's email app instead. Environment variables only apply to new deployments, so **redeploy** after adding or changing it.
   - `GITHUB_TOKEN` (optional): a token with no scopes, to avoid GitHub API rate limits.

Live data (Codeforces, GitHub) refreshes hourly. If an API is unreachable, the page shows a fallback instead of breaking.

## Roadmap

- [x] Week 1: setup, theme, layout shell
- [x] Week 2: Home sections, Projects index, About, Resume, sitemap and robots
- [x] Week 3: Projects with MDX case studies
- [x] Week 4: Blog (list, tags, post pages, code highlighting, RSS)
- [x] Week 5: CP page with live Codeforces stats, GitHub activity, Teaching page, contact form
- [ ] Week 6: polish, accessibility, performance, SEO, launch

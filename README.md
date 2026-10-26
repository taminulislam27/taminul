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
- `src/lib/gallery.ts` — every photo and certificate (path, size, alt text, caption) and the text of the Activities page. Files live in `public/images/`; keep them under about 1600 px wide (WebP). Photos open larger on click via `src/components/zoom-image.tsx`.
- `src/lib/now.ts` — the `/now` page. Edit about once a month and change `updated`. `src/lib/uses.ts` — the `/uses` page.
- Analytics: `@vercel/analytics` is in `src/app/layout.tsx`. Turn it on once in the Vercel dashboard (see `LAUNCH.md`).
- `src/lib/cp.ts` — Codeforces handle, CodeChef rating and contest highlights. `src/lib/github.ts` — GitHub username.
- `src/lib/resume.ts` — web resume. The PDF lives in `public/`; set `pdf` to `null` to hide the download button.
- `src/app/globals.css` — color tokens for light and dark mode.
- `src/components/` — navbar, footer, theme toggle, page header.
- `src/app/<route>/page.tsx` — one folder per page.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com/new (framework is detected automatically).
3. Add the environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL`: your final domain, e.g. `https://yourdomain.dev`. If you skip it on Vercel, the project's own `.vercel.app` address is used.
   - `NEXT_PUBLIC_FORMSPREE_ID` (optional): the contact form already uses your Formspree form ID, set in `src/app/contact/page.tsx`. Set this variable only to switch to a different form (from formspree.io, open its **Integration** tab and copy the ID under "Your form's endpoint is"). On Vercel set its Type to **Config**, not Secret (Vercel refuses a Secret named `NEXT_PUBLIC_...`). Environment variables only apply to new deployments, so **redeploy** after changing it. If the ID is empty, the form opens the visitor's email app instead.
   - `GITHUB_TOKEN` (optional): a token with no scopes, to avoid GitHub API rate limits.
   - `NEXT_PUBLIC_GOOGLE_VERIFICATION` (optional): for Google Search Console, see `LAUNCH.md`.

Live data (Codeforces, GitHub) refreshes hourly. If an API is unreachable, the page shows a fallback instead of breaking.

## Roadmap

- [x] Week 1: setup, theme, layout shell
- [x] Week 2: Home sections, Projects index, About, Resume, sitemap and robots
- [x] Week 3: Projects with MDX case studies
- [x] Week 4: Blog (list, tags, post pages, code highlighting, RSS)
- [x] Week 5: CP page with live Codeforces stats, GitHub activity, Teaching page, contact form
- [x] Week 6: accessibility, performance, SEO (icons, social preview image, structured data), launch kit

See `LAUNCH.md` for the go-live checklist (domain, Google Search Console, profile updates, announcement drafts).

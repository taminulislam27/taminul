# Launch checklist

Work through this top to bottom. Each section says why it matters.

## 1. Before you announce (30 minutes)

- [ ] Open the live site on your phone and on a laptop. Click every nav link, every project link and every social link.
- [ ] **Check your social links** in `src/lib/site.ts`. LinkedIn, CodeChef and LeetCode URLs were never confirmed, so open each one and fix any that land on the wrong profile.
- [ ] Read the About page and both case studies out loud. Change any sentence that does not sound like you or is not true.
- [ ] Send a test message through the contact form and confirm it reaches your inbox (check spam too).
- [ ] Open `/competitive-programming`. If it says live stats are unavailable, the Codeforces handle in `src/lib/cp.ts` is probably wrong.
- [ ] Make your resume PDF match the site: it lacks DS Academy, BazarDor and FitLog, and it contains your phone number, which is now publicly downloadable. Remove the number or set `pdf: null` in `src/lib/resume.ts`.
- [ ] Switch between light and dark mode on every page.

## 2. Domain (optional, but worth it)

A domain like `taminul.dev` looks more professional than `something.vercel.app` and stays with you when you change hosts.

1. Check availability at a registrar (Namecheap, Cloudflare, Porkbun). The GitHub Student Developer Pack sometimes includes a free domain, so check it first.
2. In Vercel: your project, Settings, Domains, Add. Vercel shows the exact DNS records to create at your registrar. Copy those values; do not guess them.
3. Wait for Vercel to show the domain as valid (minutes to a few hours).
4. Add the environment variable `NEXT_PUBLIC_SITE_URL` with your domain, e.g. `https://taminul.dev` (no trailing slash), then redeploy. This fixes the sitemap, RSS feed and social previews.

Until you buy a domain, the site automatically uses your `.vercel.app` address.

## 3. Get found on Google

1. Go to Google Search Console and add your site as a URL-prefix property.
2. Choose the **HTML tag** verification method. Copy only the `content` value, add it on Vercel as `NEXT_PUBLIC_GOOGLE_VERIFICATION`, redeploy, then click Verify.
3. In Search Console open Sitemaps and submit `sitemap.xml`.
4. Use URL Inspection on your home page and click Request Indexing.
5. Be patient. Appearing for a search like your own name usually takes a few days to a few weeks.

## 4. Check the social previews

After you deploy, paste your site and one blog post URL into:

- LinkedIn Post Inspector (linkedin.com/post-inspector)
- Facebook Sharing Debugger (developers.facebook.com/tools/debug)
- A private WhatsApp or Telegram chat to yourself

You should see a dark card with your name and tagline for the home page, and the cover image for blog posts and case studies. If a preview looks stale, use the "Scrape again" or "Inspect" button on those tools.

## 5. Run Lighthouse

In Chrome: open your live site, DevTools, Lighthouse tab, mobile, Analyze. Aim for 90+ on Performance, Accessibility, Best Practices and SEO. If something scores lower, paste the report's top issues into a new message and I will fix them.

## Turn on analytics (one time, 5 minutes)

The site already includes Vercel Web Analytics, but it stays off until you switch it on.

1. Deploy this version (push to GitHub so Vercel builds it).
2. In the Vercel dashboard, open **Analytics** in the sidebar, choose your project and click **Enable**. Then redeploy once more so the new routes are added.
3. Visit your site, open the browser's Network tab and look for a request ending in `/view`. That confirms it works.
4. Wait a few days of real visitors before reading the charts. The free Hobby plan includes 50,000 events a month and shows one month of data. If you go over, collection pauses without any charge.

Check it once a week for the first month: which pages get views, and which posts people open after your announcement.

## 6. Update your profiles to point at the site

- [ ] **LinkedIn:** add the website under Contact info, and put the link in your About section or Featured section.
- [ ] **GitHub:** set the Website field on your profile, and add the link to your profile README.
- [ ] **X (@Md_taminul):** put the link in your bio and pin the announcement post.
- [ ] **Medium:** add the link to your bio.
- [ ] **Codeforces, CodeChef, LeetCode:** add it where there is a website or bio field.
- [ ] **Resume PDF:** add the site link under your name.
- [ ] Update ended roles (BUSC, Campus Ambassador) on every profile so they match the site's timeline.

## 7. Announcement drafts

Replace the bracketed parts and edit freely. These only claim things that are on your site.

**LinkedIn**

> I just launched my personal website: [your link]
>
> I'm a CSE student at the University of Barishal who solves problems, builds web apps and teaches others to code. The site has:
> • Case studies of BazarDor and FitLog, two full-stack Next.js projects
> • My competitive programming profile, with live Codeforces stats
> • My teaching and community work
> • Bangla posts on DSA and contest preparation for students
>
> I'm looking for internship opportunities, and I'm always happy to mentor students or collaborate on projects. Feedback is very welcome.

**X**

> I built my personal site with Next.js, TypeScript and Tailwind. Projects, competitive programming stats, and Bangla posts for students learning DSA. [your link]
> Open to internships, mentoring and collaboration.

Tip: post on a weekday morning, reply to every comment in the first day, and share it in your university groups.

## 8. After launch: a small routine

- **Each time you finish something:** a project, a contest, a workshop or a post gets added within a week.
- **Monthly:** write or update one post, check that every link still works, and look at Search Console for errors.
- **Every few months:** update dependencies (`npm outdated`, then `npm update`), watch for security notices from Vercel, and re-run Lighthouse.
- **When a role ends:** update `src/lib/site.ts`, `src/lib/resume.ts`, LinkedIn and your resume PDF in one sitting.

## Notes for later

- Posts are MDX, but JavaScript expressions such as `{variable}` or `{/* comment */}` are removed by the security defaults of `next-mdx-remote` 6. Plain Markdown, images, tables and code blocks all work.
- To add the exact Medium post URL to a post, add `canonical: "https://medium.com/..."` to its frontmatter. This tells Google Medium is the original.

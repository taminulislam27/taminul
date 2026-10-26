// Content for the /uses page. Add groups or items freely, for example hardware, apps or learning resources.

export const uses = [
  {
    title: "This website",
    items: [
      { name: "Next.js 15 and React 19", note: "App Router, server components" },
      { name: "TypeScript", note: "across the whole codebase" },
      { name: "Tailwind CSS v4", note: "styling, with light and dark themes" },
      { name: "MDX", note: "blog posts and case studies are files in the repo" },
      { name: "Vercel", note: "hosting and deploys from GitHub" },
      { name: "Formspree", note: "contact form" },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "C and C++" },
      { name: "Java" },
      { name: "Python" },
      { name: "JavaScript and TypeScript" },
      { name: "SQL (MySQL)" },
      { name: "HTML and CSS" },
    ],
  },
  {
    title: "Frameworks and services",
    items: [
      { name: "Next.js and React", note: "BazarDor, FitLog and this site" },
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "WordPress" },
      { name: "MongoDB Atlas", note: "BazarDor" },
      { name: "BetterAuth", note: "BazarDor sign-in" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "Git and GitHub" },
      { name: "Google Cloud Platform" },
    ],
  },
  {
    title: "Practice",
    items: [{ name: "Codeforces" }, { name: "CodeChef" }, { name: "LeetCode" }],
  },
] as const;

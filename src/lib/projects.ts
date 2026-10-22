export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  // Leave a link undefined until you have the real URL. The UI hides missing links.
  live?: string;
  repo?: string;
  featured: boolean;
  // true when content/projects/<slug>.mdx exists
  caseStudy: boolean;
};

export const projects: Project[] = [
  {
    slug: "bazardor",
    title: "BazarDor (বাজার দর)",
    tagline: "Daily grocery prices across Bangladesh's markets, in one place.",
    description:
      "Shows today's prices for rice, pulses, oil, vegetables, fish, meat, dairy and spices, with changes since yesterday and a market-by-market min, max and average breakdown for every product. Prices appear in Bengali digits and the site works on mobile, tablet and desktop.",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "DaisyUI", "BetterAuth", "MongoDB"],
    features: [
      "Infinite price ticker with percentage change, paused on hover",
      "Top 6 risers and fallers, with skeleton loaders",
      "Category pages with numeric sorting that works for Bengali numerals",
      "Protected product pages with market-wise price tables",
      "Email, Google and GitHub sign-in with BetterAuth",
    ],
    live: "https://bazar-dor-eight-eta.vercel.app/",
    repo: "https://github.com/taminulislam27/BazarDor",
    featured: true,
    caseStudy: true,
  },
  {
    slug: "fitlog",
    title: "FitLog",
    tagline: "A dark, no-nonsense workout library and daily planner.",
    description:
      "Browse a twelve-lift library, open a lift for equipment, difficulty, sets, reps and step-by-step instructions, then add it to today's plan (capped at five) or save it for later. The My Plan page totals exercises, minutes and calories live.",
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Context API", "localStorage"],
    features: [
      "Workout grid fetched from an API, sortable by duration, calories or rating",
      "Detail pages with a specs panel and numbered instructions",
      "Live Plan and Saved counters in the navbar",
      "Mark as done, remove, tabs, toasts, loading, error and 404 states",
      "Plan state persisted across reloads",
    ],
    live: "https://fit-log-theta-bice.vercel.app/",
    repo: "https://github.com/taminulislam27/Fit-Log",
    featured: true,
    caseStudy: true,
  },
  {
    slug: "smart-student-manager",
    title: "Smart Student Manager",
    tagline: "A C++ command-line system for managing large student datasets.",
    description:
      "Built with data structures and algorithms to store, search and process large sets of student records, using optimized searching and sorting for fast retrieval and updates, with clean OOP and careful memory management.",
    stack: ["C++", "Data Structures", "Algorithms", "OOP"],
    features: [
      "Fast search and sort over large record sets",
      "Record updates without re-processing everything",
      "Object-oriented design with explicit memory management",
    ],
    featured: true,
    caseStudy: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

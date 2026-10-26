// Content for the /now page. Edit this file about once a month and change `updated`.
// Keep it short and current: what you are focused on right now, not a full history.

export const now = {
  /** Month of the last update, "YYYY-MM". */
  updated: "2026-10",
  intro: "A snapshot of what I'm focused on right now. I update it about once a month.",
  sections: [
    {
      title: "Learning",
      items: [
        "Computer Science and Engineering at the University of Barishal.",
        "Data structures, algorithms and competitive programming, practising on Codeforces, CodeChef and LeetCode.",
        "Japanese.",
      ],
    },
    {
      title: "Teaching and leading",
      items: [
        "Teaching programming, DSA and problem-solving as a Jr. Coding Instructor at Kishor Coder.",
        "Teaching ICT and Mathematics at DS Academy.",
        "Serving as Joint R&D Secretary at the Barishal University IT Society.",
        "Representing the University of Barishal as Campus Ambassador for the International AI Builders Congress (26 December 2026).",
      ],
    },
    {
      title: "Building and writing",
      items: [
        "This website, with Next.js, TypeScript and Tailwind CSS.",
        "Full-stack projects such as BazarDor and FitLog.",
        "Posts on programming and learning, on Medium and here.",
      ],
    },
    {
      title: "Looking for",
      items: ["Internship opportunities.", "Students to mentor, and projects to collaborate on."],
    },
  ],
} as const;

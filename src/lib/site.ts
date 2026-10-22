// Single source of truth for site content. Edit here, not in components.

export const site = {
  name: "Taminul Islam",
  shortName: "Taminul",
  title: "Taminul Islam | CSE Student, Problem Solver & Coding Instructor",
  description:
    "Taminul Islam is a Computer Science and Engineering student at the University of Barishal, a competitive programmer and a coding instructor, open to internships, mentoring and collaboration.",
  // Replace with your real domain once you buy it.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "taminulislam27@gmail.com",
  tagline: "CSE student who solves problems, builds web apps and teaches others to code.",
  intro:
    "I'm a CSE student at the University of Barishal. I solve problems, build web apps, and teach others to code.",
  openTo: ["Internships", "Mentoring", "Collaboration"],
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "Teaching", href: "/teaching" },
  { label: "CP", href: "/competitive-programming" },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/taminulislam27" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-taminul-islam-bu" },
  { label: "Medium", href: "https://medium.com/@taminulislam27" },
  { label: "X", href: "https://x.com/Md_taminul" },
  { label: "Codeforces", href: "https://codeforces.com/profile/BitClouda" },
  { label: "CodeChef", href: "https://www.codechef.com/users/taminul" },
  { label: "LeetCode", href: "https://leetcode.com/u/taminul" },
] as const;

export const stats = [
  { value: "1,000+", label: "problems solved" },
  { value: "120 days", label: "longest GitHub streak" },
  { value: "3 roles", label: "teaching or leading now" },
  { value: "2025", label: "Best Performer, Phitronista'25" },
] as const;

export const timeline = [
  { period: "Aug 2024 – Aug 2028", role: "BSc in CSE", org: "University of Barishal", status: "Ongoing" },
  { period: "Jan 2024 – Present", role: "ICT & Mathematics Teacher", org: "DS Academy", status: "Ongoing" },
  { period: "Jul 2026 – Present", role: "Jr. Coding Instructor", org: "Kishor Coder", status: "Ongoing" },
  { period: "Nov 2025 – Present", role: "Joint R&D Secretary", org: "Barishal University IT Society (BUITS)", status: "Ongoing" },
  { period: "Jan 2026 – Aug 2026", role: "Associate IT Executive", org: "Barishal University Science Club (BUSC)", status: "Ended" },
  { period: "Jul 2025 – Dec 2025", role: "Campus Ambassador", org: "Phitron", status: "Ended" },
  { period: "Jul 2025 – Dec 2025", role: "Campus Ambassador", org: "Shohoj Coding", status: "Ended" },
] as const;

export const aboutParagraphs = [
  "I'm Taminul Islam, a Computer Science and Engineering student at the University of Barishal in Bangladesh.",
  "I got into programming because I was curious about how technology works, and that curiosity never wore off. I started with C and C++, and competitive programming turned learning into a daily habit. I've solved over 1,000 problems across Codeforces, CodeChef and LeetCode, and I take part in university and national contests, including ICPC.",
  "Along the way I found that I enjoy explaining things almost as much as solving them. I teach ICT and Mathematics at DS Academy, and today I'm a Junior Coding Instructor at Kishor Coder, where I teach programming, data structures and problem-solving, and help students debug their own code.",
  "I also like working with communities. I serve as Joint R&D Secretary at the Barishal University IT Society, where I plan workshops, contests and bootcamps, and I've previously been a Campus Ambassador for Phitron and Shohoj Coding and part of the IT team at the University Science Club. In 2025 I was named Best Performer at Phitronista'25.",
  "These days I'm building full-stack projects with Next.js and TypeScript, such as BazarDor, a grocery price tracker for Bangladesh's markets, and FitLog, a workout library and daily planner. I also write about what I learn on Medium.",
  "Outside code, I'm learning Japanese and enjoy travelling, music and movies.",
] as const;

export const contactCards = [
  {
    title: "Internships",
    body: "Frontend or full-stack roles, and also DSA-heavy roles.",
  },
  {
    title: "Mentoring",
    body: "Coding, DSA and contest prep for beginners.",
  },
  {
    title: "Collaboration",
    body: "Open-source, student projects and hackathons.",
  },
] as const;

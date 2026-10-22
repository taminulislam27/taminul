// Web version of the resume. Keep in sync with site.ts timeline.

export const resume = {
  // The PDF lives in /public. Set to null to hide the Download button.
  pdf: "/Taminul-Islam-Resume.pdf" as string | null,

  education: [
    {
      title: "BSc in Computer Science and Engineering",
      org: "University of Barishal, Barishal",
      period: "Aug 2024 – Aug 2028",
    },
  ],

  experience: [
    {
      title: "Jr. Coding Instructor",
      org: "Kishor Coder",
      period: "Jul 2026 – Present",
      points: [
        "Conduct coding classes on programming, data structures and problem-solving.",
        "Mentor students through coding assignments and debugging sessions.",
        "Prepare coding exercises, assessments and learning materials.",
      ],
    },
    {
      title: "ICT & Mathematics Teacher",
      org: "DS Academy",
      period: "Jan 2024 – Present",
      points: [
        "Teach ICT and Mathematics to students of various academic levels.",
        "Develop structured lesson plans and study materials.",
        "Run online workshops and doubt-solving sessions.",
      ],
    },
    {
      title: "Joint R&D Secretary",
      org: "Barishal University IT Society (BUITS)",
      period: "Nov 2025 – Present",
      points: [
        "Lead tech research and design hands-on workshops on modern software tools.",
        "Organize competitive programming contests and coding bootcamps for students.",
      ],
    },
    {
      title: "Associate IT Executive",
      org: "Barishal University Science Club (BUSC)",
      period: "Jan 2026 – Aug 2026",
      points: [
        "Managed IT support, event technology and digital assets for club programs.",
        "Handled technical logistics and media promotion to boost event participation.",
      ],
    },
    {
      title: "Campus Ambassador",
      org: "Phitron",
      period: "Jul 2025 – Dec 2025",
      points: ["Supported CS students, community response, event management and article writing."],
    },
    {
      title: "Campus Ambassador",
      org: "Shohoj Coding",
      period: "Jul 2025 – Dec 2025",
      points: ["Supported CS students, community response and event management."],
    },
  ],

  achievements: [
    "Best Performer, Phitronista'25 (Phitron, 2025)",
    "Excellent Leader of June 2025 (Shohoj Coding)",
    "Batch Winner, Academic Problem-Solving Hackathon 1.0 (OneByZero Edu, April 2026)",
    "13th place, BU IUPC'26 (Feb 2026)",
    "Participated in ICPC Preliminary with team BU_Titans (Nov 2025)",
    "Solved 1,000+ problems on Codeforces, CodeChef and LeetCode",
  ],

  certifications: [
    "CS Fundamentals, Phitron (Aug 2024 – Aug 2025)",
    "Communication & Client Handling, CodemanBD (Aug 2024 – Dec 2024)",
  ],

  skills: [
    { group: "Languages", items: ["C/C++", "Java", "Python", "JavaScript", "TypeScript", "SQL (MySQL)", "HTML/CSS"] },
    { group: "Frameworks", items: ["Next.js", "React", "Node.js", "Tailwind CSS", "FastAPI", "WordPress"] },
    { group: "Tools", items: ["Git", "GitHub", "MongoDB", "Google Cloud Platform", "VS Code"] },
    { group: "Strengths", items: ["Problem solving", "Teaching", "Leadership", "Teamwork"] },
  ],
};

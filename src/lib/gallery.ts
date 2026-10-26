// Photos and certificates. Files live in public/images/<folder>/. Width and height are the real pixel size of each file.
// To add one: drop the (web-sized) file into public/images, add an entry here, then use <ZoomImage photo={photos.yourKey} />.
// Captions and alt text are plain descriptions. Edit them freely.

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export const photos = {
  // About
  portrait: {
    src: "/images/about/portrait-shapes.webp",
    width: 800,
    height: 800,
    alt: "Portrait of Taminul Islam in a navy suit and striped tie, on a dark blue background",
  },
  portraitNew: {
    src: "/images/about/portrait-new.webp",
    width: 500,
    height: 500,
    alt: "Portrait of Taminul Islam in a navy suit and striped tie, on a white background",
  },
  portraitWhite: {
    src: "/images/about/portrait-white.webp",
    width: 1000,
    height: 1000,
    alt: "Portrait of Taminul Islam in a navy suit and striped tie, on a white background",
  },
  portraitBw: {
    src: "/images/about/portrait-bw.webp",
    width: 800,
    height: 800,
    alt: "Black and white portrait of Taminul Islam in a suit",
  },
  friends: {
    src: "/images/about/friends-campus.webp",
    width: 1400,
    height: 1050,
    alt: "Taminul Islam taking a selfie with four friends on a tree-lined path",
    caption: "With friends",
  },
  casual: {
    src: "/images/about/casual.webp",
    width: 480,
    height: 600,
    alt: "Taminul Islam in a checked shirt, arms crossed, with red buses behind him",
    caption: "Off the screen",
  },

  // Contests
  lab2: {
    src: "/images/contests/lab-2.webp",
    width: 800,
    height: 600,
    alt: "Contestants working at computers in a lab during an on-site programming contest",
    caption: "On-site contest lab",
  },
  lab3: {
    src: "/images/contests/lab-3.webp",
    width: 800,
    height: 600,
    alt: "Rows of contestants at computers and desks in a programming contest lab",
    caption: "Teams at work",
  },
  lab4: {
    src: "/images/contests/lab-4.webp",
    width: 1600,
    height: 1200,
    alt: "Taminul Islam typing at a computer in a contest lab, with other contestants beside and behind him",
    caption: "In the middle of a contest",
  },

  // Certificates and awards
  phitronDsa: {
    src: "/images/certificates/phitron-dsa-2026.webp",
    width: 744,
    height: 526,
    alt: "Phitron Certificate of Recognition to Md Taminul Islam for an outstanding result on data structures and algorithms, 2026",
    caption: "Phitron, Certificate of Recognition: outstanding result on data structures and algorithms (2026)",
  },
  phitronAmbassador: {
    src: "/images/certificates/phitron-ambassador-2025.webp",
    width: 800,
    height: 565,
    alt: "Phitron Certificate of Recognition to Md Taminul Islam as Campus Ambassador (Phitronista'25) for 2025",
    caption: "Phitron, Certificate of Recognition: Campus Ambassador, Phitronista'25 (2025)",
  },
  onebyzero: {
    src: "/images/certificates/onebyzero-trophy.webp",
    width: 480,
    height: 640,
    alt: "Gold trophy reading Academic Problem-Solving Hackathon 1.0, Md Taminul Islam, Batch Winner (11th), Onebyzero Edu",
    caption: "Onebyzero Edu, Academic Problem-Solving Hackathon 1.0: Batch Winner (11th Batch)",
  },
  phitronKit: {
    src: "/images/certificates/phitron-prizes.webp",
    width: 800,
    height: 600,
    alt: "A Phitron jersey, a Bangla programming book and a boxed mechanical keyboard laid out on a table",
    caption: "A Phitron jersey, a Bangla programming book and a keyboard",
  },
  hultCertificate: {
    src: "/images/certificates/hult-prize-certificate.webp",
    width: 800,
    height: 600,
    alt: "Framed Hult Prize certificate recognizing Md Taminul Islam as a member of the organizing committee, University of Barishal 2025-26, with an organizer badge and pink lanyard",
    caption: "Hult Prize at University of Barishal, organizing committee certificate (2025-26)",
  },

  // Activities
  hultBadge: {
    src: "/images/activities/hult-prize-badge.webp",
    width: 750,
    height: 1000,
    alt: "Organizer badge for Md Taminul Islam, Hult Prize at University of Barishal 25-26, held in a hand with a pink Hult Prize lanyard",
    caption: "Organizer badge",
  },
  aibc: {
    src: "/images/activities/aibc-campus-ambassador.webp",
    width: 512,
    height: 640,
    alt: "AI Builders Congress Campus Ambassador poster showing Taminul Islam from the University of Barishal, Saturday 26 December 2026",
    caption: "Campus Ambassador, International AI Builders Congress 2026",
  },
  buits: {
    src: "/images/activities/buits-executive.webp",
    width: 1000,
    height: 1000,
    alt: "Barishal University IT Society 8th Executive Committee poster announcing Md Taminul Islam as Joint Research and Development Secretary",
    caption: "Joint R&D Secretary, BUITS 8th Executive Committee",
  },
  runTeam: {
    src: "/images/activities/run-for-future-team.webp",
    width: 1600,
    height: 901,
    alt: "Eleven participants in blue Run for Future Bangladesh shirts with race bibs, posing in two rows outdoors",
    caption: "Run for Future Bangladesh, with fellow participants",
  },
  runSolo: {
    src: "/images/activities/run-for-future-solo.webp",
    width: 788,
    height: 1400,
    alt: "Taminul Islam in a blue Run for Future Bangladesh shirt with bib 3902, holding the event bag",
    caption: "Race day, bib 3902",
  },
} as const satisfies Record<string, Photo>;

export type Activity = {
  id: string;
  title: string;
  period: string;
  body: readonly string[];
  link?: { label: string; href: string };
};

// Written in the first person, from your own posts. Edit freely.
export const activities: readonly Activity[] = [
  {
    id: "hult-prize",
    title: "Organizer, Hult Prize at University of Barishal",
    period: "2025–26",
    body: [
      "Hult Prize empowers students to build innovative, SDG-driven solutions for global impact, and I was part of the team that organized it at our university.",
      "I worked with aspiring entrepreneurs and supported their ideas, coordinated activities, helped with media and promotions, and handled challenges behind the scenes. It strengthened my leadership, communication, teamwork, problem-solving and adaptability. The best part was the people: a passionate, talented team building something meaningful for our university community.",
    ],
  },
  {
    id: "aibc",
    title: "Campus Ambassador, International AI Builders Congress 2026",
    period: "26 Dec 2026",
    body: [
      "I represent the University of Barishal at the International AI Builders Congress, which brings together students, innovators and future AI builders from across Bangladesh. It has 11 AI domains and 55 real-world challenges, and registration is free.",
      "The event takes place at Daffodil International University, Ashulia Campus, Dhaka.",
    ],
    link: { label: "Event page", href: "https://cloudcampbd.com/ai-builders-congress" },
  },
  {
    id: "buits",
    title: "Joint R&D Secretary, Barishal University IT Society",
    period: "Nov 2025 – present",
    body: [
      "I plan workshops, contests and bootcamps with BUITS, the IT society of our university, as part of its 8th Executive Committee.",
    ],
  },
  {
    id: "run",
    title: "Run for Future Bangladesh",
    period: "",
    body: ["Taking part in the Run for Future Bangladesh. Not everything has to happen at a desk."],
  },
];

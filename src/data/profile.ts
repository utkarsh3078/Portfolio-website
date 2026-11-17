// Everything about you that the page shows lives in this file and projects.ts.
// Edit the text here; the components pick it up.

export const profile = {
  name: "Utkarsh Yadav",
  initials: "UY",
  role: "Full-stack developer",
  location: "Gurugram, India",
  availability: "Open to internships and freelance work",
  email: "utkarshyadav3078@gmail.com",
  // The account whose contribution heatmap is shown in the About section
  githubUsername: "utkarsh3078",
  // Shown in the footer. Update it each year.
  copyrightYear: 2026,

  intro:
    "I'm an Information Technology student at USICT, GGSIPU. I work mostly in TypeScript, React, Next.js and Node. Lately I've been building retrieval and LLM features where the answer has to be right, not just fluent.",

  socials: [
    { label: "GitHub", href: "https://github.com/utkarsh3078", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/utkarsh-yadav3078", icon: "linkedin" },
    { label: "X", href: "https://x.com/utkydv3078", icon: "x" },
  ],

  stats: [
    { value: 37, suffix: "", label: "public repositories" },
    { value: 9, suffix: "", label: "projects live on the web" },
    { value: 3, suffix: "", label: "hackathon builds" },
  ],

  about: [
    "I started with HTML and CSS in 2024 and kept going: JavaScript, then React and the MERN stack, then TypeScript, Next.js and typed APIs. Most of what I know came from building something, getting it deployed, and fixing what broke.",
    "I like projects that are complete. That means sign-in works, errors are handled, the server doesn't trust the client, and there's a link someone else can open. This year I've been working on generative AI features and learning React Native.",
  ],

  education: {
    course: "Information Technology",
    school: "USICT, GGSIPU",
    place: "Delhi",
  },

  community: {
    title: "Web development coordinator",
    org: "DevSource, ACM USICT",
    text: "We teach juniors web, app, game and AI/ML development.",
  },

  swimming: {
    value: "20+",
    text: "medals at regional and inter-school swimming meets.",
  },

  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "SQL"] },
    { group: "Front end", items: ["React", "Next.js", "Tailwind CSS", "Redux Toolkit", "Motion"] },
    { group: "Back end", items: ["Node.js", "Express", "tRPC", "Socket.IO", "JWT auth", "Zod"] },
    { group: "Data", items: ["MongoDB", "PostgreSQL", "Prisma", "Drizzle"] },
    { group: "AI", items: ["Gemini API", "Retrieval pipelines", "Hybrid search", "Re-ranking"] },
  ],

  journey: [
    {
      year: "2024",
      title: "First web pages",
      text: "Learned HTML, CSS and JavaScript, and joined DevSource at ACM USICT as a web development coordinator.",
    },
    {
      year: "2025",
      title: "Went full-stack",
      text: "Built with Express, MongoDB and React. Took Rain2Recharge to Smart India Hackathon and worked on the ICPC Portal with a team.",
    },
    {
      year: "2026",
      title: "Typed APIs and AI",
      text: "Shipped ChaiForms, Market Mayhem and FraudAlert in TypeScript. Now building Anchor and VocalStep.",
    },
  ],

  // Scrolling strip under the hero
  marquee: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "tRPC",
    "Socket.IO",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Drizzle",
    "Tailwind CSS",
    "Gemini API",
    "Typesense",
    "Zod",
  ],
} as const;

export type SocialIcon = (typeof profile.socials)[number]["icon"];

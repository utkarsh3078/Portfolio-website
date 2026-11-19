import type { StaticImageData } from "next/image";

import anchor from "@/assets/projects/anchor.jpg";
import chaiforms from "@/assets/projects/chaiforms.jpg";
import fraudalert from "@/assets/projects/fraudalert.jpg";
import marketmayhem from "@/assets/projects/marketmayhem.jpg";
import rain2recharge from "@/assets/projects/rain2recharge.jpg";

export type ProjectStatus = "live" | "wip" | "done";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  period: string;
  context: string;
  tags: string[];
  links: { label: string; href: string }[];
  /** A screenshot. Leave it out and set `visual` to use a drawn illustration. */
  image?: StaticImageData;
  visual?: "teleprompter" | "leaderboard" | "newsfeed";
  /** Shown as a "Right now" line on in-progress projects. */
  now?: string;
};

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  wip: "In progress",
  done: "Complete",
};

/** Projects with commits this month. */
export const currentProjects: Project[] = [
  {
    slug: "anchor",
    title: "Anchor",
    tagline: "Ask questions about your own documents and get answers that show the page they came from.",
    description:
      "A self-correcting retrieval pipeline. Anchor searches each document two ways (exact words and meaning), merges the results, re-ranks them with a second model, then checks whether the evidence is strong enough. If it is weak, it rewords the question and tries again. If the files don't cover the question, it says so instead of guessing.",
    now: "Showing the exact source lines behind each answer, and a hand-graded comparison against other systems.",
    status: "live",
    period: "2026 · ongoing",
    context: "Solo · term paper",
    tags: ["Next.js", "Express", "Gemini API", "Typesense", "Cohere Rerank", "MongoDB"],
    links: [
      { label: "Live site", href: "https://anchor-gamma-ten.vercel.app" },
      { label: "Code", href: "https://github.com/utkarsh3078/anchor" },
    ],
    image: anchor,
  },
  {
    slug: "vocalstep",
    title: "VocalStep",
    tagline: "Daily speaking practice: pick a script, open the teleprompter, read it aloud at your own pace.",
    description:
      "Built for people who want to get comfortable speaking. Sessions run 5, 10 or 15 minutes, in English or Hindi, at three difficulty levels. The sample speeches and the word-timing logic are in place and tested.",
    now: "Generating a speech on any topic you type in.",
    status: "wip",
    period: "Started Nov 2026",
    context: "Solo",
    tags: ["Next.js", "TypeScript", "React", "Vitest"],
    links: [
      { label: "Live site", href: "https://vocalstep.in" },
      { label: "Code", href: "https://github.com/utkarsh3078/vocalstep" },
    ],
    visual: "teleprompter",
  },
];

/** Finished work, in display order. The first and last are shown full width. */
export const projects: Project[] = [
  {
    slug: "market-mayhem",
    title: "Market Mayhem",
    tagline: "A multiplayer market game where every player holds a private clue that might be wrong.",
    description:
      "Players join a room with a five-letter code, trade five fictional companies with virtual credits, and react to headlines before the bell. Then a hidden event resolves and the results screen explains what really happened. The server owns all the state: the browser only sends intent, and prices, cash and scores are never trusted from the client.",
    status: "live",
    period: "2026",
    context: "Solo · hackathon",
    tags: ["Next.js", "TypeScript", "Socket.IO", "Express", "Zod", "Prisma", "PostgreSQL"],
    links: [
      { label: "Live site", href: "https://market-mayhem-mu.vercel.app" },
      { label: "Code", href: "https://github.com/utkarsh3078/Market_Mayhem" },
    ],
    image: marketmayhem,
  },
  {
    slug: "chaiforms",
    title: "ChaiForms",
    tagline: "Build a form, publish a link, review the responses.",
    description:
      "A form builder with sign-up and login, a dashboard for creating and managing forms, public form pages with expiry dates, and screens for responses and analytics. It is a monorepo with a separate web app and API, typed end to end, with published API docs.",
    status: "live",
    period: "2026",
    context: "Solo · hackathon",
    tags: ["Next.js", "tRPC", "Drizzle", "Zod", "Turborepo", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "https://chai-forms-web.vercel.app/" },
      { label: "API docs", href: "https://chai-forms-api.vercel.app/docs" },
      { label: "Code", href: "https://github.com/utkarsh3078/ChaiForms" },
    ],
    image: chaiforms,
  },
  {
    slug: "fraudalert",
    title: "FraudAlert",
    tagline: "Paste a suspicious message and get a fraud risk score.",
    description:
      "A full-stack fraud detection platform. Users sign in, run detection on text, and file reports. Admins review those reports and see overview metrics and daily detection trends. Links are checked against a URL reputation service, with results cached.",
    status: "live",
    period: "2026",
    context: "Solo · term paper",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "https://fraud-alert-delta.vercel.app" },
      { label: "Code", href: "https://github.com/utkarsh3078/FraudAlert" },
    ],
    image: fraudalert,
  },
  {
    slug: "icpc-portal",
    title: "ICPC Portal",
    tagline: "The competitive programming platform for the ACM ICPC student chapter at USICT.",
    description:
      "Students take contests with code that runs in the browser, pick up practice tasks, and earn points on all-time, monthly and semester leaderboards. Admins schedule sessions, post announcements and approve blog posts. I was one of four contributors.",
    status: "done",
    period: "2025 – 2026",
    context: "Team of four",
    tags: ["Next.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Judge0"],
    links: [{ label: "Code", href: "https://github.com/utkarsh3078/ICPC-website" }],
    visual: "leaderboard",
  },
  {
    slug: "newssphere",
    title: "NewsSphere",
    tagline: "A news reader with no ads and no clickbait feed.",
    description:
      "Pulls real-time headlines from NewsAPI and shows them in a plain, fast interface. Readers choose the topics they care about and bookmark articles to read later.",
    status: "live",
    period: "2025 – 2026",
    context: "Solo · term paper",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "https://news-sphere-dr9d.vercel.app/" },
      { label: "Code", href: "https://github.com/utkarsh3078/NewsSphere" },
    ],
    visual: "newsfeed",
  },
  {
    slug: "rain2recharge",
    title: "Rain2Recharge",
    tagline: "A smart water platform built for Smart India Hackathon 2025.",
    description:
      "The front end for a rainwater harvesting assessment tool: a location-based assessment dashboard, a detailed report with recommendations, a directory of solution vendors, progress tracking, and an AI assistant called Water Buddy.",
    status: "live",
    period: "2025",
    context: "Team · Smart India Hackathon",
    tags: ["React", "Vite", "Redux Toolkit", "Tailwind CSS", "Recharts", "Gemini API"],
    links: [
      { label: "Live site", href: "https://rain2-reachrge.vercel.app" },
      { label: "Code", href: "https://github.com/utkarsh3078/Rain2Recharge" },
    ],
    image: rain2recharge,
  },
];

export const earlierBuilds = [
  {
    title: "Music Academy",
    text: "A site for students learning music.",
    stack: "Next.js · Aceternity UI",
    href: "https://music-academy-ten-orpin.vercel.app",
  },
  {
    title: "Stay listings",
    text: "My first full-stack app: browse, add, edit and remove listings.",
    stack: "Express · MongoDB",
    href: "https://github.com/utkarsh3078/AirBnb-Project",
  },
  {
    title: "Weather page",
    text: "Look up the current weather for a city.",
    stack: "JavaScript",
    href: "https://weather-webpage-ashy.vercel.app",
  },
  {
    title: "Simon game",
    text: "The memory game, in the browser.",
    stack: "JavaScript",
    href: "https://simon-game-flax-three.vercel.app",
  },
];

/** Screenshots that float beside the hero headline. */
export const heroShots = [
  { image: marketmayhem, alt: "Market Mayhem trading dashboard" },
  { image: anchor, alt: "Anchor landing page" },
  { image: fraudalert, alt: "FraudAlert detection screen" },
];

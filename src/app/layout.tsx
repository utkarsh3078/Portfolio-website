import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { profile } from "@/data/profile";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Utkarsh Yadav is a full-stack developer and Information Technology student at USICT, GGSIPU. Projects in TypeScript, React, Next.js, Node and applied AI.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description:
      "Full-stack web apps and AI tools, built end to end and deployed.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0b" },
  ],
};

// Runs before first paint. The visitor's system setting picks the theme on every
// visit, and the page follows live when the system switches (e.g. auto dark at
// sunset). The header toggle only overrides it for the current tab.
const themeScript = `(function(){var r=document.documentElement,m=matchMedia("(prefers-color-scheme: dark)");function o(){try{return sessionStorage.getItem("theme")}catch(e){return null}}function a(){var t=o();r.setAttribute("data-theme",t==="light"||t==="dark"?t:m.matches?"dark":"light")}try{localStorage.removeItem("theme")}catch(e){}a();m.addEventListener("change",function(){try{sessionStorage.removeItem("theme")}catch(e){}a()})})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

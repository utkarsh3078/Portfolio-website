import type { SocialIcon } from "@/data/profile";

type IconProps = { className?: string };

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.560 9.560 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.060 2.060 0 1 1 0-4.120 2.060 2.060 0 0 1 0 4.120ZM7.12 20.45H3.560V9h3.560v11.450ZM22.220 0H1.770C.79 0 0 .77 0 1.730v20.540C0 23.230.79 24 1.770 24h20.450c.98 0 1.780-.77 1.780-1.730V1.730C24 .77 23.200 0 22.220 0Z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.240 2.250h3.310l-7.230 8.260 8.500 11.240h-6.660l-5.210-6.820-5.970 6.820H1.680l7.730-8.840L1.250 2.250h6.830l4.710 6.230 5.450-6.230Zm-1.160 17.520h1.830L7.080 4.130H5.120l11.960 15.640Z" />
    </svg>
  );
}

const icons: Record<SocialIcon, (props: IconProps) => React.JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};

export function SocialGlyph({ name, className }: { name: SocialIcon; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} />;
}

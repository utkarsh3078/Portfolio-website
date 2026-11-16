// How much of the accent colour each GitHub contribution level gets
const SHADE = [0, 30, 52, 76, 100];

/** The square colour for a contribution level from 0 (none) to 4 (most). */
export function levelColor(level: number) {
  if (level <= 0) return "var(--surface-2)";
  return `color-mix(in srgb, var(--accent) ${SHADE[Math.min(level, 4)]}%, var(--surface-2))`;
}

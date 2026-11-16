"use client";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * A card with a soft glow that follows the cursor. The glow itself is the
 * `.spotlight::before` rule in globals.css; this only reports where the cursor is.
 */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={`spotlight group/card relative overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-fg/20 hover:shadow-card ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

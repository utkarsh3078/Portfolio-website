type BrowserFrameProps = {
  children: React.ReactNode;
  /** Text for the address pill, for example a project's domain. */
  label?: string;
  className?: string;
};

/** A minimal browser window used to present screenshots and illustrations. */
export function BrowserFrame({ children, label, className = "" }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface shadow-card ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-surface-2/70 px-3">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        {label && (
          <span className="mx-auto max-w-[70%] truncate rounded-full bg-bg/70 px-3 py-0.5 font-mono text-[0.62rem] text-muted">
            {label}
          </span>
        )}
        {/* Balances the three dots so the label sits in the centre */}
        {label && <span className="w-9" />}
      </div>
      {children}
    </div>
  );
}

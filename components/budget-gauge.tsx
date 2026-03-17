export function BudgetGauge() {
  return (
    <div className="border border-border bg-cream p-6 rounded-sm">
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted">
          DAILY BUDGET
        </span>
        <span className="font-[family-name:var(--font-mono)] text-sm text-primary">
          $47.20 / $100.00
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-2 bg-cream-dark rounded-full overflow-hidden relative">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: "47.2%" }}
        />
        {/* 80% threshold marker */}
        <div
          className="absolute top-0 h-full w-px bg-accent"
          style={{ left: "80%" }}
        />
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-[family-name:var(--font-mono)] text-muted">
        <span>$0</span>
        <span className="text-accent">80% alert</span>
        <span>$100</span>
      </div>
      {/* Alert badge */}
      <div className="mt-4 flex items-center gap-2 text-xs text-accent">
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        Budget alert sent at 80%
      </div>
    </div>
  );
}

export function CircuitBreakerDiagram() {
  return (
    <div className="border border-border bg-cream p-6 rounded-sm">
      <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-4">
        CIRCUIT BREAKER STATE
      </div>
      {/* States */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="font-[family-name:var(--font-mono)] text-xs">
            Closed
          </span>
        </div>
        <span className="text-muted text-xs">&rarr;</span>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-accent rounded-sm bg-accent/5">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-[family-name:var(--font-mono)] text-xs">
            Open
          </span>
        </div>
        <span className="text-muted text-xs">&rarr;</span>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="font-[family-name:var(--font-mono)] text-xs">
            Half-Open
          </span>
        </div>
        <span className="text-muted text-xs">&rarr;</span>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="font-[family-name:var(--font-mono)] text-xs">
            Closed
          </span>
        </div>
      </div>
      {/* Timeline */}
      <div className="mt-5 space-y-2 text-xs font-[family-name:var(--font-mono)] text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-accent" />
          OpenAI 500 errors detected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-accent" />
          Circuit opens &mdash; traffic routes to Anthropic
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-green-600" />
          OpenAI recovers &mdash; circuit closes
        </div>
      </div>
    </div>
  );
}

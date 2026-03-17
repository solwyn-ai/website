export function ArchitectureDiagram() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Your App box */}
      <div className="border border-border bg-cream p-5 rounded-sm">
        <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-3">
          YOUR APPLICATION
        </div>
        <div className="space-y-2 text-sm font-[family-name:var(--font-mono)]">
          <div className="text-secondary">your_agent.py</div>
          <div className="flex items-center gap-2">
            <span className="text-muted">&darr;</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent font-medium">Solwyn(</span>
            <span className="text-primary">OpenAI()</span>
            <span className="text-accent font-medium">)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted">&darr;</span>
          </div>
        </div>
      </div>

      {/* Direct call arrow */}
      <div className="flex items-center gap-3 my-3 ml-6">
        <div className="h-px flex-1 bg-primary" />
        <span className="text-xs font-[family-name:var(--font-mono)] text-primary font-medium whitespace-nowrap">
          direct call &rarr;
        </span>
        <div className="border border-primary bg-cream px-4 py-2.5 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs font-medium">
            LLM Provider
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-muted">
            OpenAI / Anthropic
          </div>
        </div>
      </div>

      {/* Metadata arrow */}
      <div className="flex items-center gap-3 ml-6">
        <div className="h-px flex-1 border-t border-dashed border-muted" />
        <span className="text-xs font-[family-name:var(--font-mono)] text-muted whitespace-nowrap animate-pulse">
          metadata only &rarr;
        </span>
        <div className="border border-dashed border-muted bg-cream px-4 py-2.5 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs text-muted">
            Solwyn Cloud
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-muted/60">
            budget &middot; costs &middot; alerts
          </div>
        </div>
      </div>
    </div>
  );
}

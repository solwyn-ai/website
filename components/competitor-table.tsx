export function CompetitorTable() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight mb-4">
        Other tools watch. Solwyn prevents.
      </h2>
      <p className="text-secondary text-sm leading-relaxed max-w-2xl">
        Helicone, Portkey, and LiteLLM route every LLM call through their
        servers — they see your prompts, add latency, and become a single
        point of failure. LangSmith and Langfuse log everything after the
        fact but can&apos;t stop a runaway agent mid-loop. Solwyn is a local
        SDK. It enforces limits before the request is sent, fails over without
        a server in the loop, and never sees your data.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-border bg-cream p-6 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-3">
            PROXY-BASED PLATFORMS
          </div>
          <p className="text-xs text-muted mb-2">Helicone, Portkey, LiteLLM</p>
          <p className="text-sm text-secondary leading-relaxed">
            Route every LLM call through their infrastructure. They see your
            prompts, responses, and function calls. They add latency. They
            become the thing that goes down.
          </p>
        </div>

        <div className="border border-border bg-cream p-6 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-3">
            OBSERVABILITY TOOLS
          </div>
          <p className="text-xs text-muted mb-2">LangSmith, Langfuse</p>
          <p className="text-sm text-secondary leading-relaxed">
            Log everything after the fact. Great dashboards. But when a
            recursive agent burns $47,000 overnight, the dashboard just shows
            you the fire — it doesn&apos;t put it out.
          </p>
        </div>

        <div className="border border-accent/30 bg-cream p-6 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent mb-3">
            SOLWYN
          </div>
          <p className="text-sm text-primary leading-relaxed font-medium">
            A local SDK that wraps your existing client. Budgets enforced before
            the request leaves your app. Failover handled client-side. Only
            metadata reaches us. Works with every provider. Your prompts never
            leave.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-secondary italic">
        Observability tools are the dashcam. Solwyn is the brakes.
      </p>
    </div>
  );
}

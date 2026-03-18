const RECEIVES = [
  "Token count (input/output)",
  "Model name",
  "Calculated cost",
  "Latency (ms)",
  "Success/failure status",
  "Project ID",
];

const NEVER_SEES = [
  "Prompts",
  "Responses",
  "System messages",
  "Function calls",
  "Conversation history",
  "Any content whatsoever",
];

export function PrivacyComparison() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight">
        Architecture, not policy.
      </h2>
      <p className="mt-3 text-secondary text-sm leading-relaxed max-w-2xl">
        Any company can write a privacy policy. Solwyn is a local SDK — your
        LLM calls go directly from your app to the provider. We are never in the
        request path. This isn&apos;t a promise. It&apos;s how the code works.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border bg-cream p-6 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-4">
            METADATA WE RECEIVE
          </div>
          <ul className="space-y-2">
            {RECEIVES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-secondary"
              >
                <span className="text-green-600">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-accent/30 bg-cream p-6 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent mb-4">
            WHAT NEVER LEAVES YOUR ENVIRONMENT
          </div>
          <ul className="space-y-2">
            {NEVER_SEES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-primary font-medium"
              >
                <span className="text-accent">&#10005;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

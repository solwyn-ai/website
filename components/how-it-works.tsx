const STEPS = [
  {
    number: "1",
    title: "Install",
    code: "pip install solwyn",
  },
  {
    number: "2",
    title: "Wrap your client",
    code: "client = Solwyn(your_llm_client)",
  },
  {
    number: "3",
    title: "Set a budget",
    code: "$100/day limit on the dashboard",
  },
];

export function HowItWorks() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight mb-3">
        Five minutes between you and a $47,000 mistake.
      </h2>
      <p className="text-sm text-secondary mb-8">
        No infrastructure changes. No proxy. No new dependencies. Just a wrapper
        around the client you already use.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="border border-border bg-cream p-6 rounded-sm"
          >
            <div className="font-[family-name:var(--font-serif)] text-4xl text-muted/40 mb-3">
              {step.number}
            </div>
            <div className="font-medium text-primary mb-2">{step.title}</div>
            <div className="font-[family-name:var(--font-mono)] text-xs text-secondary bg-cream-dark p-3 rounded-sm">
              {step.code}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="border border-border bg-cream p-4 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-2">
            BEFORE SOLWYN
          </div>
          <p className="text-secondary">
            Deploy an agent, cross your fingers, check the bill next month.
          </p>
        </div>
        <div className="border border-accent/30 bg-cream p-4 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent mb-2">
            AFTER SOLWYN
          </div>
          <p className="text-primary font-medium">
            Deploy an agent that can&apos;t spend more than you allow, fails
            over automatically, and reports every dollar.
          </p>
        </div>
      </div>
    </div>
  );
}

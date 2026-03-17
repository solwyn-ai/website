const STEPS = [
  {
    number: "1",
    title: "Install",
    code: "pip install solwyn",
  },
  {
    number: "2",
    title: "Wrap",
    code: "client = Solwyn(openai.OpenAI())",
  },
  {
    number: "3",
    title: "Configure",
    code: "Set a $100/day budget on the dashboard",
  },
];

export function HowItWorks() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight mb-8">
        Three lines. Five minutes.
      </h2>
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
      <p className="mt-6 text-sm text-secondary">
        Under 5 minutes. No infrastructure changes. No proxy. No new
        dependencies.
      </p>
    </div>
  );
}

const FEATURES = [
  {
    name: "Hard cost caps",
    solwyn: "Yes",
    portkey: "No",
    litellm: "Basic",
    braintrust: "No",
    cloudflare: "No",
  },
  {
    name: "Circuit breaker",
    solwyn: "Yes",
    portkey: "Yes",
    litellm: "No",
    braintrust: "No",
    cloudflare: "No",
  },
  {
    name: "Cost attribution",
    solwyn: "Yes",
    portkey: "Basic",
    litellm: "No",
    braintrust: "Yes",
    cloudflare: "No",
  },
  {
    name: "Automatic failover",
    solwyn: "Yes",
    portkey: "Yes",
    litellm: "Basic",
    braintrust: "No",
    cloudflare: "No",
  },
  {
    name: "Sees your prompts?",
    solwyn: "NEVER",
    portkey: "Yes",
    litellm: "Yes",
    braintrust: "Yes",
    cloudflare: "Yes",
  },
] as const;

export function CompetitorTable() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight mb-8">
        How Solwyn compares.
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-primary">
              <th className="text-left p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                FEATURE
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-primary font-bold">
                SOLWYN
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                PORTKEY
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                LITELLM
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                BRAINTRUST
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                CLOUDFLARE AI GW
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((f) => (
              <tr key={f.name} className="border-b border-border">
                <td className="p-3 text-secondary">{f.name}</td>
                <td
                  className={`p-3 text-center font-medium ${f.solwyn === "NEVER" ? "text-accent font-bold" : "text-primary"}`}
                >
                  {f.solwyn}
                </td>
                <td className="p-3 text-center text-muted">{f.portkey}</td>
                <td className="p-3 text-center text-muted">{f.litellm}</td>
                <td className="p-3 text-center text-muted">{f.braintrust}</td>
                <td className="p-3 text-center text-muted">{f.cloudflare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

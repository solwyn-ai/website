const MOCK_DATA = [
  {
    project: "search-agent",
    model: "gpt-4.1",
    cost: "$142.30",
    trend: "↑ 23%",
    trendColor: "text-accent",
  },
  {
    project: "chat-bot",
    model: "claude-4-sonnet",
    cost: "$87.50",
    trend: "↓ 12%",
    trendColor: "text-green-600",
  },
  {
    project: "summarizer",
    model: "gemini-2.5-flash",
    cost: "$12.80",
    trend: "→ flat",
    trendColor: "text-muted",
  },
];

export function CostTable() {
  return (
    <div className="border border-border bg-cream rounded-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              PROJECT
            </th>
            <th className="text-left p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              MODEL
            </th>
            <th className="text-right p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              7D COST
            </th>
            <th className="text-right p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              TREND
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.map((row) => (
            <tr
              key={row.project}
              className="border-b border-border last:border-0"
            >
              <td className="p-4 font-[family-name:var(--font-mono)] text-primary">
                {row.project}
              </td>
              <td className="p-4 font-[family-name:var(--font-mono)] text-secondary">
                {row.model}
              </td>
              <td className="p-4 font-[family-name:var(--font-mono)] text-primary text-right">
                {row.cost}
              </td>
              <td
                className={`p-4 font-[family-name:var(--font-mono)] text-right ${row.trendColor}`}
              >
                {row.trend}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

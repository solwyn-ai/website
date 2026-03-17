export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted,
  badge,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`border p-6 rounded-sm relative flex flex-col ${
        highlighted ? "border-accent border-2" : "border-border"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-4 bg-accent text-cream text-[10px] font-[family-name:var(--font-mono)] tracking-wider px-2 py-0.5">
          {badge}
        </div>
      )}
      <div className="mb-4">
        <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-2">
          {name}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-serif)] text-3xl text-primary">
            {price}
          </span>
          {period && <span className="text-sm text-muted">{period}</span>}
        </div>
        <p className="mt-2 text-sm text-secondary">{description}</p>
      </div>
      <ul className="space-y-2 flex-1">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-secondary"
          >
            <span className="text-muted mt-0.5">&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#waitlist-pricing"
        className={`mt-6 block text-center text-sm py-2.5 transition-colors ${
          highlighted
            ? "bg-primary text-cream hover:bg-primary/90"
            : "border border-border text-primary hover:bg-cream-dark"
        }`}
      >
        Join waitlist
      </a>
    </div>
  );
}

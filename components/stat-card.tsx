export function StatCard({
  stat,
  description,
}: {
  stat: string;
  description: string;
}) {
  return (
    <div className="border border-border bg-cream p-6 flex-1 min-w-[200px] card-hover">
      <div className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl text-primary tracking-tight">
        {stat}
      </div>
      <p className="mt-3 text-sm text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}

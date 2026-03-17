export function StatCard({
  stat,
  description,
}: {
  stat: string;
  description: string;
}) {
  return (
    <div className="border border-border bg-cream p-6 flex-1 min-w-[200px]">
      <div className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl text-primary tracking-tight">
        {stat}
      </div>
      <p className="mt-2 text-sm text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}

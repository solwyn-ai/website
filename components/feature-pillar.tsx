export function FeaturePillar({
  headline,
  body,
  visual,
  reverse,
}: {
  headline: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
    >
      <div className="flex-1 max-w-md">
        <h3 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight">
          {headline}
        </h3>
        <p className="mt-4 text-secondary leading-relaxed">{body}</p>
      </div>
      <div className="flex-1 w-full">{visual}</div>
    </div>
  );
}

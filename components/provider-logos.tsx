import { Reveal } from "@/components/reveal";

const PROVIDERS = [
  { name: "OpenAI", width: "w-20" },
  { name: "Anthropic", width: "w-24" },
  { name: "Google", width: "w-16" },
  { name: "Mistral", width: "w-20" },
  { name: "Cohere", width: "w-18" },
  { name: "Meta", width: "w-14" },
];

export function ProviderLogos() {
  return (
    <Reveal>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted whitespace-nowrap">
          WORKS WITH
        </span>
        <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center">
          {PROVIDERS.map((p) => (
            <span
              key={p.name}
              className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted/60 hover:text-muted transition-colors"
            >
              {p.name}
            </span>
          ))}
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted/40">
            + any OpenAI-compatible API
          </span>
        </div>
      </div>
    </Reveal>
  );
}

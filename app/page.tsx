import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { WaitlistForm } from "@/components/waitlist-form";
import { StatCard } from "@/components/stat-card";
import { FeaturePillar } from "@/components/feature-pillar";
import { BudgetGauge } from "@/components/budget-gauge";
import { CircuitBreakerDiagram } from "@/components/circuit-breaker-diagram";
import { CostTable } from "@/components/cost-table";
import { PrivacyComparison } from "@/components/privacy-comparison";
import { CompetitorTable } from "@/components/competitor-table";
import { HowItWorks } from "@/components/how-it-works";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: copy */}
          <div className="flex-1 max-w-xl">
            <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl leading-[1.1] tracking-tight text-primary">
              The control plane that never sees your prompts.
            </h1>
            <p className="mt-6 text-lg text-secondary leading-relaxed">
              Hard spending caps. Automatic failover. Per-agent cost
              attribution. And we never see your data.
            </p>

            <div className="mt-8">
              <WaitlistForm id="waitlist" />
            </div>

            <div className="mt-4">
              <Link
                href="/pricing"
                className="text-sm text-secondary hover:text-primary transition-colors"
              >
                View pricing &rarr;
              </Link>
            </div>

            {/* Code snippet */}
            <div className="mt-10 bg-cream-dark rounded-sm p-5 font-[family-name:var(--font-mono)] text-sm leading-relaxed">
              <div>
                <span className="text-muted">from</span>{" "}
                <span className="text-primary">solwyn</span>{" "}
                <span className="text-muted">import</span>{" "}
                <span className="text-primary">Solwyn</span>
              </div>
              <div>
                <span className="text-primary">client</span>{" "}
                <span className="text-muted">=</span>{" "}
                <span className="text-primary">Solwyn</span>
                <span className="text-muted">(</span>
                <span className="text-primary">openai.OpenAI</span>
                <span className="text-muted">(),</span>{" "}
                <span className="text-primary">api_key</span>
                <span className="text-muted">=</span>
                <span className="text-accent">
                  &quot;sk-solwyn-...&quot;
                </span>
                <span className="text-muted">)</span>
              </div>
              <div className="text-muted">
                # That&apos;s it. Your existing code works unchanged.
              </div>
            </div>
          </div>

          {/* Right: architecture diagram */}
          <div className="flex-1 w-full lg:pt-8">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Horror Stories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row gap-4">
          <StatCard
            stat="$47,000"
            description="Recursive LangChain agent ran 11 days unnoticed. No cost ceiling."
          />
          <StatCard
            stat="579 outages"
            description="Anthropic experienced 579 incidents in 12 months. Avg 29/month."
          />
          <StatCard
            stat="$82,314"
            description="Stolen Gemini API key exploited for 48 hours. No spending cap."
          />
        </div>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-primary italic">
          Observability tells you what went wrong. Solwyn prevents it.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Feature Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        <FeaturePillar
          headline="Stop the bleeding before it starts."
          body="Set daily, weekly, or monthly budgets per project. Alert-only by default — your agents keep running and you get notified. Opt into hard deny when you're ready. The SDK enforces caps locally, even if Solwyn's cloud is unreachable."
          visual={<BudgetGauge />}
        />
        <FeaturePillar
          headline="Your users notice nothing."
          body="When a provider fails, the SDK automatically routes to your configured fallback — all client-side, no server involved. The circuit breaker tracks health locally. No manual intervention. No downtime."
          visual={<CircuitBreakerDiagram />}
          reverse
        />
        <FeaturePillar
          headline="Know which agent is burning the budget."
          body="Per-project cost breakdown by model and time period. Real-time dashboard with current spend vs. budget. CSV export. API endpoint for custom dashboards. All powered by metadata — we never see your prompts."
          visual={<CostTable />}
        />
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Privacy Guarantee */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <PrivacyComparison />
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Comparison Strip */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <CompetitorTable />
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <HowItWorks />
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight">
          Built by a developer who got a $2,000 surprise bill.
        </h2>
        <p className="mt-4 text-secondary max-w-lg mx-auto">
          Solwyn exists because the tools that should have prevented it
          didn&apos;t exist yet.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}

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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: copy */}
          <div className="flex-1 max-w-xl">
            <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl leading-[1.1] tracking-tight text-primary">
              Your AI agents don&apos;t have a spending limit.
            </h1>
            <p className="mt-6 text-lg text-secondary leading-relaxed">
              A recursive agent cost someone $47,000. A stolen API key cost
              another $82,000. Three lines of Python would have stopped both.
            </p>

            <div className="mt-8">
              <WaitlistForm id="waitlist" />
            </div>

            <p className="mt-3 text-xs text-muted">
              Free tier. 5K requests/month. No credit card. Works with every
              major LLM provider.
            </p>

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
                <span className="text-primary">your_llm_client</span>
                <span className="text-muted">,</span>{" "}
                <span className="text-primary">api_key</span>
                <span className="text-muted">=</span>
                <span className="text-accent">
                  &quot;sk-solwyn-...&quot;
                </span>
                <span className="text-muted">)</span>
              </div>
              <div className="text-muted">
                # Any provider. Budget enforced. Failover enabled.
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
        <h2 className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-6">
          REAL INCIDENTS. REAL INVOICES.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <StatCard
            stat="$47,000"
            description="A recursive LangChain agent ran for 11 days. Nobody noticed until the invoice arrived. A $100/day cap would have stopped it at $100."
          />
          <StatCard
            stat="579 outages"
            description="Anthropic had 579 incidents in 12 months. If your agents only talk to one provider, they went down 579 times too."
          />
          <StatCard
            stat="$82,314"
            description="A stolen Gemini API key was exploited for 48 hours straight. No spending cap existed to stop it. One did after the bill."
          />
        </div>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-primary italic">
          Every one of these was preventable. That&apos;s the point.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* How It Works — moved up (answer "how hard?" immediately after "why?") */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <HowItWorks />
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Feature Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        <FeaturePillar
          headline="Set the limit before the damage starts."
          body="Daily, weekly, or monthly budgets per project. Alert-only mode keeps agents running while you get notified. Hard-deny mode kills the request before it reaches the provider. The SDK enforces caps locally — even if Solwyn's cloud is unreachable, your limits still hold."
          visual={<BudgetGauge />}
        />
        <FeaturePillar
          headline="When your provider goes down, your agents don&apos;t."
          body="The SDK routes to your configured fallback automatically — client-side, no server in the loop. A local circuit breaker tracks provider health and switches in milliseconds. Your users experience zero downtime. You don't get paged."
          visual={<CircuitBreakerDiagram />}
          reverse
        />
        <FeaturePillar
          headline="See exactly which agent is burning money."
          body="Per-project cost breakdown by model and time period. Real-time spend vs. budget. Trend indicators that show you where costs are accelerating before they become a problem. All powered by metadata — your prompts never leave your environment."
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

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight">
          The next surprise AI bill hasn&apos;t happened yet.
        </h2>
        <p className="mt-4 text-secondary max-w-lg mx-auto">
          Three lines of Python. Under five minutes. Your agents get budget
          limits, automatic failover, and cost visibility — and your prompts
          never leave your environment.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm />
        </div>
        <p className="mt-3 text-xs text-muted">
          Free tier. No credit card. No infrastructure changes.
        </p>
      </section>
    </>
  );
}

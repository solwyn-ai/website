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
import { ProviderLogos } from "@/components/provider-logos";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-28">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: copy */}
          <div className="flex-1 max-w-xl">
            <Reveal>
              <h1 className="font-[family-name:var(--font-serif)] text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight text-primary">
                Your AI agents don&apos;t have a spending limit.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-lg text-secondary leading-relaxed">
                A recursive agent cost someone $47,000. A stolen API key cost
                another $82,000. Three lines of Python would have stopped both.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8">
                <WaitlistForm id="waitlist" />
              </div>
              <p className="mt-3 text-xs text-muted">
                Free tier. 5K requests/month. No credit card. Works with every
                major LLM provider.
              </p>
            </Reveal>

            {/* Code snippet — dark terminal style */}
            <Reveal delay={300}>
              <div className="mt-10 code-block rounded-sm p-5 font-[family-name:var(--font-mono)] text-sm leading-relaxed">
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
            </Reveal>
          </div>

          {/* Right: architecture diagram */}
          <Reveal delay={200} className="flex-1 w-full lg:pt-8">
            <ArchitectureDiagram />
          </Reveal>
        </div>
      </section>

      {/* Provider logos */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-border">
        <ProviderLogos />
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Horror Stories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <h2 className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-6">
            REAL INCIDENTS. REAL INVOICES.
          </h2>
        </Reveal>
        <div className="flex flex-col sm:flex-row gap-4">
          <Reveal delay={0} className="flex-1">
            <StatCard
              stat="$47,000"
              description="A recursive LangChain agent ran for 11 days. Nobody noticed until the invoice arrived. A $100/day cap would have stopped it at $100."
            />
          </Reveal>
          <Reveal delay={100} className="flex-1">
            <StatCard
              stat="579 outages"
              description="Anthropic had 579 incidents in 12 months. If your agents only talk to one provider, they went down 579 times too."
            />
          </Reveal>
          <Reveal delay={200} className="flex-1">
            <StatCard
              stat="$82,314"
              description="A stolen Gemini API key was exploited for 48 hours straight. No spending cap existed to stop it. One did after the bill."
            />
          </Reveal>
        </div>
        <Reveal delay={300}>
          <p className="mt-8 font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-primary italic">
            Every one of these was preventable. That&apos;s the point.
          </p>
        </Reveal>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <HowItWorks />
        </Reveal>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Feature Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        <Reveal>
          <FeaturePillar
            headline="Set the limit before the damage starts."
            body="Daily, weekly, or monthly budgets per project. Alert-only mode keeps agents running while you get notified. Hard-deny mode kills the request before it reaches the provider. The SDK enforces caps locally — even if Solwyn's cloud is unreachable, your limits still hold."
            visual={<BudgetGauge />}
          />
        </Reveal>
        <Reveal>
          <FeaturePillar
            headline="When your provider goes down, your agents don&apos;t."
            body="The SDK routes to your configured fallback automatically — client-side, no server in the loop. A local circuit breaker tracks provider health and switches in milliseconds. Your users experience zero downtime. You don't get paged."
            visual={<CircuitBreakerDiagram />}
            reverse
          />
        </Reveal>
        <Reveal>
          <FeaturePillar
            headline="See exactly which agent is burning money."
            body="Per-project cost breakdown by model and time period. Real-time spend vs. budget. Trend indicators that show you where costs are accelerating before they become a problem. All powered by metadata — your prompts never leave your environment."
            visual={<CostTable />}
          />
        </Reveal>
      </section>

      {/* Dark section — privacy guarantee (visual rhythm break) */}
      <section className="bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <PrivacyComparison dark />
          </Reveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Comparison Strip */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <CompetitorTable />
        </Reveal>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Bottom CTA — dark for visual weight */}
      <section className="bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-dark-text tracking-tight">
              The next surprise AI bill hasn&apos;t happened yet.
            </h2>
            <p className="mt-4 text-dark-muted max-w-lg mx-auto">
              Three lines of Python. Under five minutes. Your agents get budget
              limits, automatic failover, and cost visibility — and your prompts
              never leave your environment.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm dark />
            </div>
            <p className="mt-3 text-xs text-dark-muted">
              Free tier. No credit card. No infrastructure changes.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PricingCard } from "@/components/pricing-card";
import { PricingComparison } from "@/components/pricing-comparison";
import { FAQ } from "@/components/faq";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Pricing — Solwyn",
  description:
    "Simple pricing for AI agent cost control. Free tier, no credit card required. Your prompts never leave your environment.",
};

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl leading-[1.1] tracking-tight text-primary">
          Simple pricing. No surprises.
        </h1>
        <p className="mt-4 text-lg text-secondary">
          Every tier includes the same privacy guarantee. Your prompts never
          leave your environment.
        </p>
      </section>

      {/* Tier Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PricingCard
            name="FREE"
            price="$0"
            period="/mo"
            description="Try Solwyn with zero friction."
            features={[
              "5K requests/month",
              "1 project",
              "Spending caps",
              "Circuit breaker + failover",
              "Cost attribution by project",
              "7-day cost history",
              "Email alerts",
              "No credit card required",
            ]}
          />
          <PricingCard
            name="SOLO"
            price="$49"
            period="/mo"
            description="For developers shipping AI agents."
            badge="MOST POPULAR"
            highlighted
            features={[
              "50K requests/month",
              "3 projects",
              "Cost attribution by project + model",
              "30-day cost history",
              "Email + webhook alerts",
              "14-day full trial",
            ]}
          />
          <PricingCard
            name="TEAM"
            price="$149"
            period="/mo"
            description="For engineering teams running multiple agents."
            features={[
              "500K requests/month",
              "10 projects",
              "Cost attribution + team breakdown",
              "90-day cost history",
              "Slack alerts",
              "30-day audit log",
              "Priority email support",
              "14-day full trial",
            ]}
          />
          <PricingCard
            name="BUSINESS"
            price="$399"
            period="/mo"
            description="For platform teams with compliance needs."
            features={[
              "5M requests/month",
              "Unlimited projects",
              "Full cost breakdown",
              "1-year cost history",
              "PagerDuty alerts",
              "1-year tamper-evident audit log",
              "Priority support + SLA",
              "14-day full trial",
            ]}
          />
        </div>

        {/* Enterprise strip */}
        <div className="mt-6 border border-border p-6 rounded-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-1">
              ENTERPRISE
            </div>
            <p className="text-sm text-secondary">
              Need SSO, VPC deployment, or custom retention?
            </p>
          </div>
          <a
            href="mailto:hello@solwyn.ai"
            className="text-sm border border-border px-4 py-2 text-primary hover:bg-cream-dark transition-colors whitespace-nowrap"
          >
            Contact us
          </a>
        </div>
      </section>

      {/* Overage */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-4">
          WHAT HAPPENS WHEN YOU EXCEED YOUR PLAN?
        </h3>
        <div className="text-sm text-secondary space-y-1">
          <p>Solo: $2.50 per additional 50K requests</p>
          <p>Team: $2.00 per additional 50K requests</p>
          <p>Business: $1.00 per additional 50K requests</p>
        </div>
        <p className="mt-3 text-sm text-secondary italic">
          Overage is soft — your agents never stop because of billing. Charges
          accrue and appear on your next invoice.
        </p>
      </section>

      {/* Feature Comparison */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <PricingComparison />
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <FAQ />
      </section>

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
          <WaitlistForm id="waitlist-pricing" />
        </div>
      </section>
    </>
  );
}

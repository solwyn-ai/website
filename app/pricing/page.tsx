import type { Metadata } from "next";
import { PricingCard } from "@/components/pricing-card";
import { PricingComparison } from "@/components/pricing-comparison";
import { FAQ } from "@/components/faq";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Pricing — Solwyn | $49/mo vs $47K Risk",
  description:
    "The average uncontrolled agent incident costs $47,000. Solwyn starts free. Hard spending caps, automatic failover, and privacy by architecture.",
};

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl leading-[1.1] tracking-tight text-primary">
          The average uncontrolled agent incident costs $47,000.
        </h1>
        <p className="mt-4 text-lg text-secondary">
          Every plan includes hard spending caps, automatic failover, and the
          same privacy guarantee: your prompts never leave your environment.
        </p>
      </section>

      {/* Cost-of-inaction anchor */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-border bg-cream p-5 rounded-sm">
            <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-2">
              WITHOUT SOLWYN
            </div>
            <div className="font-[family-name:var(--font-serif)] text-2xl text-primary">
              $47,000
            </div>
            <p className="mt-1 text-xs text-secondary">
              What one recursive agent cost. No cap. No alert. 11 days.
            </p>
          </div>
          <div className="border border-accent/30 bg-cream p-5 rounded-sm">
            <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent mb-2">
              WITH SOLWYN SOLO
            </div>
            <div className="font-[family-name:var(--font-serif)] text-2xl text-primary">
              $588/yr
            </div>
            <p className="mt-1 text-xs text-secondary">
              Hard spending caps. Alerts in seconds. Automatic failover.
            </p>
          </div>
          <div className="border border-border bg-cream p-5 rounded-sm">
            <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-2">
              THE MATH
            </div>
            <div className="font-[family-name:var(--font-serif)] text-2xl text-primary">
              80x
            </div>
            <p className="mt-1 text-xs text-secondary">
              One prevented incident pays for 80 years of Solwyn.
            </p>
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PricingCard
            name="FREE"
            price="$0"
            period="/mo"
            description="Full protection. Zero friction. See if it fits."
            cta="Start free"
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
            description="$49/mo to protect against $47K mistakes. 959x return."
            cta="Join waitlist"
            features={[
              "50K requests/month",
              "3 projects",
              "Cost attribution by project + model",
              "30-day cost history",
              "Email + webhook alerts",
            ]}
          />
          <PricingCard
            name="TEAM"
            price="$149"
            period="/mo"
            description="$15/agent/month for teams running 10+ agents."
            badge="MOST POPULAR"
            highlighted
            cta="Join waitlist"
            features={[
              "500K requests/month",
              "10 projects",
              "Cost attribution + team breakdown",
              "90-day cost history",
              "Slack alerts",
              "30-day audit log",
              "Priority email support",
            ]}
          />
          <PricingCard
            name="BUSINESS"
            price="$399"
            period="/mo"
            description="One incident costs more than a year of this plan."
            cta="Join waitlist"
            features={[
              "5M requests/month",
              "Unlimited projects",
              "Full cost breakdown",
              "1-year cost history",
              "PagerDuty alerts",
              "1-year tamper-evident audit log",
              "Priority support + SLA",
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

      {/* Founder pricing strip */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="border border-accent/30 bg-cream p-6 rounded-sm text-center">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent mb-2">
            EARLY ACCESS PRICING
          </div>
          <p className="text-sm text-primary font-medium">
            Waitlist members lock in current pricing permanently &mdash; even
            after prices increase at general availability.
          </p>
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
          Every plan includes the brakes. Pick your speed.
        </h2>
        <p className="mt-4 text-secondary max-w-lg mx-auto">
          Start with the free tier. Upgrade when your agents do. Your prompts
          never leave your environment on any plan.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm id="waitlist-pricing" />
        </div>
        <p className="mt-3 text-xs text-muted">
          Free tier. No credit card. Cancel anytime.
        </p>
      </section>
    </>
  );
}

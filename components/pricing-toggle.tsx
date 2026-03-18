"use client";

import { useState } from "react";
import { PricingCard } from "@/components/pricing-card";

const PLANS = {
  solo: { monthly: 49, annual: 41 },
  team: { monthly: 149, annual: 124 },
  business: { monthly: 399, annual: 332 },
};

export function PricingTiers() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span
          className={`text-sm ${!annual ? "text-primary font-medium" : "text-muted"}`}
        >
          Monthly
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className="relative w-11 h-6 rounded-full border border-border bg-cream-dark transition-colors"
          aria-label="Toggle annual pricing"
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary transition-transform ${
              annual ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
        <span
          className={`text-sm ${annual ? "text-primary font-medium" : "text-muted"}`}
        >
          Annual
        </span>
        {annual && (
          <span className="text-xs font-[family-name:var(--font-mono)] tracking-wider text-accent">
            SAVE 2 MONTHS
          </span>
        )}
      </div>

      {/* Cards */}
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
          price={`$${annual ? PLANS.solo.annual : PLANS.solo.monthly}`}
          period={annual ? "/mo, billed annually" : "/mo"}
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
          price={`$${annual ? PLANS.team.annual : PLANS.team.monthly}`}
          period={annual ? "/mo, billed annually" : "/mo"}
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
          price={`$${annual ? PLANS.business.annual : PLANS.business.monthly}`}
          period={annual ? "/mo, billed annually" : "/mo"}
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
    </>
  );
}

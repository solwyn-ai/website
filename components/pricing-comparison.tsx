"use client";

import { Fragment, useState } from "react";

const TIERS = ["Free", "Solo", "Team", "Business"];

const SECTIONS = [
  {
    name: "Core",
    rows: [
      { feature: "Requests / month", values: ["5K", "50K", "500K", "5M"] },
      { feature: "Projects", values: ["1", "3", "10", "Unlimited"] },
      { feature: "Spending caps", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Circuit breaker", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Failover", values: ["✓", "✓", "✓", "✓"] },
      {
        feature: "Cost attribution",
        values: ["Project", "Project + model", "Project + model + team", "Full"],
      },
    ],
  },
  {
    name: "Alerts",
    rows: [
      { feature: "Email", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Webhook", values: ["—", "✓", "✓", "✓"] },
      { feature: "Slack", values: ["—", "—", "✓", "✓"] },
      { feature: "PagerDuty", values: ["—", "—", "—", "✓"] },
      { feature: "Custom thresholds", values: ["—", "—", "✓", "✓"] },
    ],
  },
  {
    name: "History & Audit",
    rows: [
      {
        feature: "Cost history",
        values: ["7 days", "30 days", "90 days", "1 year"],
      },
      { feature: "Audit log", values: ["—", "—", "30 days", "1 year"] },
      { feature: "Tamper-evident audit", values: ["—", "—", "—", "1 year"] },
    ],
  },
  {
    name: "Support",
    rows: [
      {
        feature: "Support",
        values: ["Community", "Email", "Priority email", "Priority + SLA"],
      },
    ],
  },
  {
    name: "Privacy",
    rows: [
      {
        feature: "Prompts never leave your environment",
        values: ["✓", "✓", "✓", "✓"],
      },
    ],
  },
];

export function PricingComparison() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1"
      >
        {expanded ? "Hide" : "Show"} full feature comparison
        <span
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          &#9660;
        </span>
      </button>
      {expanded && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left p-3 font-normal text-muted" />
                {TIERS.map((tier) => (
                  <th
                    key={tier}
                    className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-primary font-bold"
                  >
                    {tier.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTIONS.map((section) => (
                <Fragment key={section.name}>
                  <tr>
                    <td
                      colSpan={5}
                      className="pt-4 pb-1 px-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted"
                    >
                      {section.name.toUpperCase()}
                    </td>
                  </tr>
                  {section.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-border">
                      <td className="p-3 text-secondary">{row.feature}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className="p-3 text-center text-primary">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

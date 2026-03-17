"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What counts as a request?",
    a: "Each LLM call instrumented by the Solwyn SDK counts as one request. Streaming calls count as one request.",
  },
  {
    q: "What happens when I hit my request limit?",
    a: "Your agents keep running. Overage charges accrue automatically. No service interruption.",
  },
  {
    q: "Do you ever see my prompts or responses?",
    a: "Never. The SDK wraps your client locally. LLM calls go directly from your app to the provider. Only metadata reaches Solwyn.",
  },
  {
    q: "What if Solwyn's cloud goes down?",
    a: "Your agents keep running. The SDK enforces cached budget limits locally and continues allowing requests (fail-open by default).",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrades take effect immediately. Downgrades take effect at the start of the next billing cycle.",
  },
  {
    q: "Is there an annual discount?",
    a: "Yes. Annual billing offers a 2-month discount (e.g., Solo at $490/year = $40.83/mo effective).",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight mb-8">
        Questions &amp; answers.
      </h2>
      <div className="divide-y divide-border">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left py-4 flex justify-between items-center gap-4"
            >
              <span className="text-sm font-medium text-primary">{faq.q}</span>
              <span className="text-muted text-xs flex-shrink-0">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <p className="pb-4 text-sm text-secondary leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

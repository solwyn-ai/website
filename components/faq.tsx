"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What counts as a request?",
    a: "Each LLM call instrumented by the Solwyn SDK counts as one request. Streaming calls count as one request.",
  },
  {
    q: "Which providers and models do you support?",
    a: "Solwyn wraps any LLM client that follows standard API patterns. OpenAI, Anthropic, Google, Mistral, Cohere, and any OpenAI-compatible provider work out of the box. If you can call it from Python, Solwyn can wrap it.",
  },
  {
    q: "What happens when I hit my request limit?",
    a: "Your agents keep running. Overage charges accrue automatically. No service interruption.",
  },
  {
    q: "Do you ever see my prompts or responses?",
    a: "Never. This is architecture, not a policy promise. The SDK wraps your client locally — LLM calls go directly from your app to the provider. Solwyn is never in the request path. Only metadata (token counts, costs, latency) reaches us.",
  },
  {
    q: "What if Solwyn's cloud goes down?",
    a: "Your agents keep running. The SDK enforces cached budget limits locally and continues allowing requests. We fail open by default — Solwyn going down should never take your agents down with it.",
  },
  {
    q: "What if Solwyn isn't worth it?",
    a: "Every paid plan starts with a 14-day trial. No credit card required. If you don't see value, you never pay. And because Solwyn is a thin SDK wrapper, removing it takes one line of code — no migration, no lock-in, no cleanup.",
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

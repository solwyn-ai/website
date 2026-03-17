# Solwyn Pricing Strategy v3

**Date:** 2026-03-14
**Status:** Draft
**Target:** $50K MRR before leaving day job
**Author:** Christian (Founder) + Claude (Strategy Input)

This document supersedes the v2 pricing strategy. It preserves v2's strongest element — the no-proxy positioning — while adjusting tier structure, reintroducing a free tier, and incorporating the Model Price Index (mpi.sh) as a top-of-funnel channel.

---

## 1. The Non-Negotiable: No-Proxy Positioning

This carries forward unchanged from v2. It is the single strongest competitive asset.

Every competitor — Portkey, LiteLLM, Cloudflare AI Gateway, Braintrust, Helicone — routes prompts and responses through their servers. Solwyn never does. The SDK wraps the customer's LLM client locally. LLM calls go direct to the provider. Only metadata (token counts, costs, latency) reaches Solwyn's dashboard. This is architecture, not policy.

Every pricing page, every comparison, every sales conversation starts here:

> "Every other tool in this category reads your prompts. Solwyn does not."

This positioning does not change at any tier. Free users get the same architectural guarantee as Business users.

---

## 2. Pricing Tiers

### The Funnel

```
mpi.sh (Model Price Index)     ← SEO / top-of-funnel: developers comparing LLM costs
        ↓
Free tier (10K requests)        ← try Solwyn with zero friction, no credit card
        ↓
Solo $49/mo (50K requests)     ← first paying conversion, indie/startup dev
        ↓
Team $149/mo (500K requests)   ← startup engineering lead, multiple projects
        ↓
Business $399/mo (5M requests) ← mid-market platform team, compliance needs
        ↓
Enterprise (Contact us)        ← aspirational, not actively sold in Year 1
```

### Tier Details

| | Free | Solo | Team | Business |
|---|---|---|---|---|
| **Price** | $0 | $49/mo | $149/mo | $399/mo |
| **Requests** | 5K/mo | 50K/mo | 500K/mo | 5M/mo |
| **Projects** | 1 | 3 | 10 | Unlimited |
| **Spending caps** | Yes | Yes | Yes | Yes |
| **Circuit breaker + failover** | Yes | Yes | Yes | Yes |
| **Cost attribution** | By project | By project + model | By project + model + team | Full breakdown |
| **Cost history** | 7 days | 30 days | 90 days | 1 year |
| **Alert channels** | Email only | Email + webhook | + Slack | + PagerDuty |
| **Audit log** | No | No | 30-day | 1-year (tamper-evident) |
| **Support** | Community | Email | Priority email | Priority + SLA |
| **Data privacy** | Prompts never leave your environment | Same | Same | Same |
| **Credit card required** | No | Yes | Yes | Yes |
| **Trial** | — | 14-day full trial | 14-day full trial | 14-day full trial |

### Enterprise (Aspirational — Year 2+)

Not actively built or sold in Year 1. Listed on the pricing page as "Contact us" to signal upmarket readiness. When inbound inquiries arrive, evaluate manually.

Features that would differentiate Enterprise: SSO/SAML, VPC deployment, 99.9% SLA, custom retention policies, SOC 2 report, dedicated support. None of these are built until a paying customer asks for them.

---

## 3. Why Introduce the Free Tier

**Every competitor has one.** Portkey (free, 10K req/mo), Cloudflare (free, 100K logs), Helicone (free, 10K req/mo), Braintrust (free, 1M spans), LiteLLM (open source). Solwyn would be the only product in the category requiring a credit card before evaluation. For a brand-new product with zero recognition, that's a high bar.

**The target persona won't enter a card for an unknown tool.** The PRD's primary persona "Googles 'openai spending limit', finds Solwyn, signs up." That developer will click "Free — no card" before entering payment details for a product they've never heard of. Every click of friction between landing page and first protected LLM call reduces conversion.

**Free tier + trial are not mutually exclusive.** The free tier gets them in (10K requests, 1 project, no card). They hit the ceiling quickly if they're real users. Then they see the 14-day trial offer for Solo/Team with full features. The trial converts them to paid. Two conversion mechanisms, not one.

**10K requests is enough to feel the product, not enough for production.** A developer running 2-3 agents will hit 10K in about a week of light testing. They'll see the budget dashboard, get an email alert when they cross a threshold, and experience a failover during an OpenAI hiccup. Then they'll hit the wall and upgrade. The ceiling IS the conversion mechanism.

**Support noise is manageable at 10K requests.** Free users running 10K requests/month are not heavy users — they're evaluators. They're unlikely to file support tickets. The ones who do are signaling buying intent.

---

## 4. Overage Pricing

Usage-based overages drive NRR above 110% and ensure revenue grows with agent adoption.

| Tier | Overage Rate | Per 1K Requests | Plain English |
|---|---|---|---|
| Solo | $2.50 / 50K block | ~$0.05 | ~$0.05 per 33 agent tasks |
| Team | $2.00 / 50K block | ~$0.04 | Volume discount |
| Business | $1.00 / 50K block | ~$0.02 | Volume discount |

**Why charge per request, not per token?** Requests are predictable and legible. A developer knows roughly how many LLM calls their agents make per day. They do not know how many tokens those calls consume without a tool like Solwyn. Charging per request keeps the pricing intuitive and avoids the irony of needing a cost-tracking tool to understand your cost-tracking bill.

**Overage is soft, not hard.** When a customer exceeds their included requests, overage charges accrue automatically. There is no service interruption. The spending caps feature protects their LLM spend — Solwyn's billing should not itself become a spending surprise. Overage is communicated via email at 80% and 100% of included volume.

---

## 5. The $50K MRR Math

Target: $50K MRR before leaving the day job.

**Assumptions:**
- Customer mix: 50% Solo ($49), 35% Team ($149), 15% Business ($399)
- Average overage: ~25% on top of base price
- Weighted average MRR per customer: (0.5 x 49) + (0.35 x 149) + (0.15 x 399) = $136.50
- With 25% overage: ~$170/customer/month

**Customers needed:**
- $50K MRR / $170 avg = **~295 paying customers**
- At 5% free-to-paid conversion: need ~5,900 free signups
- At 10% free-to-paid conversion: need ~2,950 free signups

**Is 295 paying customers realistic?** For reference:
- Portkey has 24,000 organizations (mostly free). If 2% pay, that's 480 paying.
- Helicone had 16,000 organizations at acquisition.
- The category is growing at 45% CAGR.

295 paying customers in a $10.9B market with a structurally differentiated product is achievable. The question is time, not addressable market.

**Revenue milestones:**

| Milestone | Paying Customers | MRR | What It Means |
|---|---|---|---|
| Validation | 25 | ~$4,250 | People will pay. Product works. |
| Traction | 75 | ~$12,750 | Consistent monthly growth. Overage kicking in. |
| Confidence | 150 | ~$25,500 | Halfway to quit threshold. NRR visible. |
| Quit threshold | 295 | ~$50,000 | Leave the day job. |
| Scale | 500+ | ~$85,000+ | Hire first employee or pursue acquisition. |

---

## 6. Top-of-Funnel: Model Price Index (mpi.sh)

The Model Price Index is a free, open-source LLM pricing comparison tool at mpi.sh. It lists 43+ models across 7 providers (Anthropic, OpenAI, Google, xAI, Mistral, Cohere, Meta) with categories for Text/Chat, Image, Audio, Embedding, and Video.

**Why this is the right top-of-funnel for Solwyn:**

1. **SEO magnet.** Developers Google "GPT-4o pricing", "Claude API cost", "LLM price comparison" constantly. mpi.sh captures this traffic with a genuinely useful tool — not a landing page pretending to be useful.

2. **Natural conversion path.** A developer checking LLM prices is already cost-conscious. The CTA at the bottom — "Know what you're spending — before it's too late. Solwyn enforces hard spending caps" — is the most natural upsell possible. They're already thinking about costs. Solwyn is the answer.

3. **Zero ongoing maintenance burden.** Pricing data updates quarterly. The site is static. No support tickets, no user accounts, no infrastructure cost.

4. **Builds domain authority for solwyn.ai.** Backlinks from developers sharing mpi.sh contribute to solwyn.ai's SEO. GitHub stars on the open-source repo (github.com/solwyn-ai/api-calculator) add credibility.

5. **Community distribution.** An open-source pricing index gets shared on HN, Reddit, dev Twitter. Each share puts the Solwyn brand in front of the exact audience.

**mpi.sh → Solwyn funnel:**
```
Developer Googles "Claude API pricing 2026"
    → lands on mpi.sh
    → sees all model prices at a glance
    → sees CTA: "Know what you're spending — before it's too late"
    → clicks "Learn more →" → solwyn.ai
    → signs up for free tier (no card)
    → wraps their client in 3 lines
    → hits 5K request ceiling in a week
    → upgrades to Solo ($49)
```

**Additional distribution channels (low-effort):**

- **OpenClaw community.** OpenClaw (open-source AI agent framework, viral in early 2026) has no built-in spending controls. A blog post "How to add spending caps to OpenClaw in 3 lines" targets their community directly. The integration is just `Solwyn(OpenAI())` — no special code needed.
- **HN launch post.** "How a $47,000 recursive loop could have been prevented with one line of code." Privacy angle as the hook.
- **SEO articles.** 1-2 per month: "LLM circuit breakers explained", "How to set spending limits on OpenAI", "OpenAI vs Anthropic failover." These are problems developers Google.

---

## 7. Pricing vs. Competition

| Product | Free Tier | Entry Paid | Team | Sees Prompts? | Hard Cap | Failover |
|---|---|---|---|---|---|---|
| **Solwyn** | **5K req** | **$49** | **$149** | **NEVER** | **Yes** | **Yes** |
| Portkey | 10K req | $49 | ~$249+ | YES | Partial | Yes |
| LiteLLM | Open source | $250/mo | $2,500/yr | YES | Partial | Basic |
| Braintrust | 1M spans | $249 | Custom | YES | No | No |
| Cloudflare AI GW | 100K logs | ~$5/mo | N/A | YES | No | No |
| Helicone | 10K req | $20/seat | Custom | YES | No | No |

**Reading this table:** Solwyn matches Portkey on entry price ($49), undercuts Braintrust on Team ($149 vs $249), and is the only product with a structural NEVER on prompt visibility. The free tier is smaller than Portkey's (5K vs 10K) — intentionally, because the ceiling-as-conversion-mechanism works better with a tighter cap.

---

## 8. Pricing Principles

1. **Lead with privacy, not price.** The conversation is never "we're cheaper." It's "we're the only product that never sees your prompts, and we match Portkey's price." Privacy is the differentiator. Price is parity.

2. **Charge for requests, not seats.** Agent usage scales with automation, not headcount. A 5-person team running 50 agents should pay more than a 50-person team running 2 agents.

3. **Overage is soft.** Never interrupt a customer's agents because of a billing ceiling. That would make Solwyn the cause of the exact problem it prevents. Overage accrues and appears on the next invoice.

4. **The ceiling is the conversion mechanism.** Free tier (5K) → Solo (50K) → Team (500K) → Business (5M). Each tier is 10x the previous. The ceiling is hit naturally, not artificially. Upgrade pressure comes from success, not from gates.

5. **Never discount the first paid tier.** $49 Solo is the anchor. Annual billing can offer a 2-month discount ($490/year = $40.83/mo effective) but the monthly price does not drop below $49. Discounting signals weakness in a category where trust is the product.

6. **Enterprise earns its way.** Don't build enterprise features speculatively. When a customer says "I need SSO to buy," that's when SSO gets built. Until then, Enterprise is a "Contact us" button and a conversation.

---

## 9. What Changes vs. v2

| Decision | v2 Strategy | v3 Strategy | Why |
|---|---|---|---|
| Free tier | Removed (14-day trial only) | Reinstated (5K req, no card) | Zero-friction entry critical for unknown brand. Trial remains for paid tiers. |
| Solo tier | $49, 50K req | $49, 50K req (unchanged) | Validated at Portkey parity. |
| Team tier | $149, 500K req | $149, 500K req (unchanged) | Below $200 approval threshold. Sound reasoning from v2. |
| Business tier | $399, 5M req | $399, 5M req (unchanged) | Compliance value justifies price. |
| Enterprise | $2,000+, active tier | "Contact us", aspirational | Focus on Solo/Team/Business until $50K MRR. No sales motion. |
| Top-of-funnel | HN post + SEO | mpi.sh + HN post + SEO + OpenClaw community | mpi.sh is a durable, compounding asset. |
| Revenue target | $50-150K Year 1 ARR | $50K MRR (quit threshold) | Milestone-driven, not year-driven. |
| Overage | $3.00/50K (Solo) | $2.50/50K (Solo) | Slight reduction to reduce sticker shock at first overage bill. |

---

## 10. Risks & Mitigations

### Risk 1: Free tier attracts noise, not signal (Medium)
**Mitigation:** 5K requests is very tight — eliminates hobbyists running production on free. Email-only alerts on free (no Slack/PagerDuty) reduce support surface. No credit card means no billing disputes. Monitor free-to-paid conversion weekly. If it drops below 3%, tighten the cap to 2K or add a 1-project limit.

### Risk 2: Portkey ships hard cost caps — Actually a Signal, Not a Risk
**Reframe:** If Portkey puts hard caps on their roadmap, it means their 24,000 organizations are asking for it. That validates the category and Solwyn's thesis. Multiple companies thrive in the same vertical — that's normal. Portkey customers who then discover they want budget enforcement *without* routing prompts through a third party become Solwyn's most qualified inbound leads. Competitors building in this space are qualifying demand for everyone.

### Risk 3: Price sensitivity at $149 Team (Medium)
**Mitigation:** The jump from $49 to $149 is 3x. The value gap must be immediately obvious: 10 projects (vs 3), team budgets, Slack alerts, 90-day history (vs 30). If conversion from Solo → Team is below 15%, test $99 as an intermediate "Team Starter" tier.

### Risk 4: Low mpi.sh → solwyn.ai conversion (Low-Medium)
**Mitigation:** mpi.sh conversion is a bonus, not a dependency. The site costs nothing to run and compounds SEO value over time. Even a 0.5% click-through rate on the CTA is free distribution. Track UTM parameters from mpi.sh → solwyn.ai signup to measure actual conversion.

### Risk 5: OpenClaw governance uncertainty (Low)
**Mitigation:** Steinberger is joining OpenAI, project moving to a foundation. Build for the OpenClaw community (blog posts, integration guides), not a partnership. If the project forks or fades, the content still targets developers running AI agents — which is the audience regardless of framework.

---

## 11. Immediate Actions

### Before Launch
- [ ] Deploy mpi.sh with Solwyn CTA (already built)
- [ ] Landing page on solwyn.ai: "Your prompts never leave your environment" as the first line
- [ ] Pricing page: Free / Solo / Team / Business + "Enterprise: Contact us"
- [ ] Architecture diagram on pricing page: your app → LLM (direct), metadata only → Solwyn
- [ ] Security & Privacy page: "We never see your prompts — here is the architecture proof"

### Launch Week
- [ ] HN post: "How a $47,000 recursive loop could have been prevented with one line of code"
- [ ] Submit mpi.sh to HN separately as "Show HN: LLM pricing comparison across 43 models"
- [ ] Post OpenClaw integration guide: "Add spending caps to OpenClaw in 3 lines"

### Within 90 Days
- [ ] SEO articles: "LLM circuit breakers explained", "How to set spending limits on OpenAI"
- [ ] A/B test Team tier at $149 vs $99 (if Solo → Team conversion is below 15%)
- [ ] Monitor free → paid conversion weekly (target: 5-8%)
- [ ] Monitor mpi.sh → solwyn.ai UTM conversion

# AgentVault Competitive Landscape Research
## Control Plane for AI Agents in Production
### Research Date: March 2026

---

## 1. COMPETITIVE LANDSCAPE

### TIER 1: DIRECT COMPETITORS (Gateway + Control)

#### Portkey AI -- The Closest Competitor
- **What they do:** AI gateway with routing, failover, circuit breakers, guardrails, rate limiting, caching, and observability. They explicitly call themselves a "control panel for production AI" and a "unified control plane." This is the most direct competitor to AgentVault.
- **Controls:** Automatic failover, circuit breakers (marks unhealthy targets, removes from routing, auto-recovers after cooldown), conditional routing (by user tier, region, model version), 40+ pre-built guardrails, PII redaction, jailbreak detection.
- **Funding:** $18M total. $3M seed (Aug 2023, Lightspeed). $15M Series A (Feb 2026, Elevation Capital + Lightspeed).
- **Traction:** 24,000+ organizations. 125M requests/day. 500B+ tokens processed. Manages $500K+ in AI spend daily ($180M+ annualized LLM spend). 180+ trillion tokens/year.
- **Pricing:** Free tier (10K requests/mo). Pro plan (up to 3M logs/mo, 30-day retention). Enterprise starts at $5,000-$10,000/mo. Core enterprise gateway is free (go-to-market shift to lower adoption barriers). Charges based on recorded logs.
- **Key Gap:** Positioned as infrastructure middleware, not as a proactive "damage prevention" layer. Does not frame itself around audit trails or compliance. Gateway-first, not agent-governance-first.

#### LiteLLM (BerriAI) -- Open-Source Proxy Standard
- **What they do:** Open-source Python SDK and proxy server. Unified OpenAI-format API to 100+ LLMs. Cost tracking, guardrails, load balancing, logging, budget management, rate limits per key/user.
- **Controls:** Budget routing (set spend limits per provider), rate limiting per API key, guardrails integration, JWT auth, SSO, audit logs (enterprise).
- **Funding:** $2.1M total (YC W23, FoundersX, Gravity Fund, Pioneer Fund).
- **Traction:** 18K+ GitHub stars. The de facto open-source LLM proxy. Widely used as infrastructure underneath other tools.
- **Pricing:** Open source: $0. Enterprise Basic: $250/mo. Enterprise Premium: $30,000/year (compliance, high-volume).
- **Key Gap:** Developer tool, not a control plane product. No UI-first experience. No circuit breaking. No automatic failover sophistication. Requires significant self-assembly. Enterprise features are an afterthought.

#### Cloudflare AI Gateway -- The Incumbent Threat
- **What they do:** Managed AI gateway on Cloudflare's edge network. Caching, rate limiting, logging, analytics, dynamic routing, unified billing across providers.
- **Controls:** Rate limiting, caching (reduces repeated calls), request routing, traffic management. New in 2026: pay for third-party model usage directly through Cloudflare invoice.
- **Funding:** N/A (Cloudflare is public, $38B+ market cap).
- **Traction:** Massive built-in distribution. Any Cloudflare customer can activate with one line of code.
- **Pricing:** Free tier (100K logs/mo). Workers Paid: $5/mo + $0.30 per additional million requests.
- **Key Gap:** Basic controls only. No circuit breaking. No LLM-specific failover. No guardrails. No agent-level controls. No audit trails. It is a lightweight proxy, not a control plane. Best for simple use cases.

---

### TIER 2: OBSERVABILITY PLATFORMS (Watch, Don't Control)

#### Braintrust -- The $800M Observability Giant
- **What they do:** AI observability + evaluation platform. Tracing, evals, prompt management, LLM-as-judge, datasets. Inspects every trace, tool call; tracks latency, cost, quality.
- **Controls:** Primarily observability. No gateway. No rate limiting. No circuit breaking. No failover. Watches, doesn't prevent.
- **Funding:** $80M Series B (Feb 2026, Iconiq). $800M post-money valuation. Backed by a16z, Greylock, Basecase, Elad Gil.
- **Traction:** Notion, Replit, Cloudflare, Ramp, Dropbox, Vercel, Navan, BILL.
- **Pricing:** Free (1M spans, 1GB data, 14-day retention). Pro: $249/mo (unlimited spans, 5GB, 30-day retention). Enterprise: custom.
- **Key Gap:** Pure observation. Tells you what happened after the fact. Does not prevent runaway costs, does not stop agents, does not enforce budgets or rate limits.

#### Langfuse -- Open-Source Observability (Acquired by ClickHouse)
- **What they do:** Open-source LLM engineering platform. Traces, evals, prompt management, cost tracking.
- **Controls:** None. Pure observability and analytics.
- **Funding:** $4.5M total ($4M seed from Lightspeed, La Famiglia, YC).
- **Traction:** 50K+ GitHub stars (estimated). 15 employees. Acquired by ClickHouse in January 2026.
- **Pricing:** Self-hosted: free, unlimited. Cloud Hobby: free (limited). Pro: ~$29/mo. Team: mid-hundreds/mo. Enterprise: custom.
- **Key Gap:** Acquired. In maintenance/integration mode with ClickHouse. No control features. Watch-only. Future uncertain as an independent product.

#### Helicone -- Acquired by Mintlify (March 2026)
- **What they do:** Open-source LLM observability + lightweight gateway. Request analysis, cost tracking, prompt improvement, rate limit management.
- **Controls:** Some rate limiting and caching. Basic gateway features. Not a control plane.
- **Funding:** ~$5M Seed ($25M valuation). YC W23, Village Global, FundersClub.
- **Traction:** 14.2 trillion tokens processed. 16,000 organizations. Acquired by Mintlify on March 3, 2026.
- **Pricing:** Free (10K requests/mo). Pro: $20/seat/mo. Team and Enterprise tiers available.
- **Key Gap:** Acquired. Now in maintenance mode. Will remain live but no major new development. Was observability-first, not control-first.

#### Galileo AI
- **What they do:** LLM evaluation platform. Sub-200ms eval latency. Automated failure mode analysis ("Galileo Signals") that scans production traces to find why agents drift.
- **Controls:** None. Evaluation and diagnostics only.
- **Funding:** $68M total.
- **Traction:** HP, Twilio, Reddit, Comcast.
- **Pricing:** Free tier for developers (launched 2025). Enterprise: custom.
- **Key Gap:** Evaluation-only. Tells you what went wrong. Does not prevent it.

#### Arize AI (Phoenix)
- **What they do:** OpenTelemetry-native AI observability. Open-source Phoenix platform (7,800+ GitHub stars). Production monitoring and evaluation.
- **Controls:** None. Observability only.
- **Funding:** $70M Series C (Feb 2025).
- **Traction:** Strong enterprise adoption. Phoenix Cloud for production.
- **Key Gap:** Same as all observability tools -- watches but doesn't control.

---

### TIER 3: ROUTING & AGGREGATION (Optimize, Don't Govern)

#### OpenRouter -- The Universal LLM API
- **What they do:** Unified API to 300+ models from 60+ providers. Aggregated billing. Automatic fallbacks for uptime.
- **Controls:** Automatic fallback between providers. No budget controls, no rate limiting, no circuit breaking, no guardrails.
- **Funding:** $40M total. $12.5M seed (Feb 2025, a16z). $28M Series A (Apr 2025, Menlo Ventures). $500M valuation.
- **Traction:** 100T+ tokens analyzed (State of AI report with a16z). Millions of developers. 50%+ usage outside US.
- **Pricing:** Pass-through pricing from providers. No gateway markup. Free tier available.
- **Key Gap:** Aggregator/marketplace, not a control plane. No cost controls. No agent-level governance. No audit trails. Developer convenience tool.

#### Martian -- ML-Based Model Router
- **What they do:** "Model Router" that uses ML to automatically route prompts to the best LLM based on model strengths/weaknesses. Claims up to 98% cost savings.
- **Controls:** Intelligent routing only. No rate limiting, no circuit breaking, no budget controls.
- **Funding:** $9M seed (NEA, Prosus, General Catalyst). Accenture investment (Sep 2024).
- **Traction:** Limited public adoption data. Opaque pricing.
- **Pricing:** Developer and enterprise plans. Pricing not publicly detailed.
- **Key Gap:** Routing-only. Narrow product. Limited adoption. Does not address agent control, audit, or damage prevention.

#### Unify AI -- LLM Routing Platform
- **What they do:** Unified API for LLM endpoints. Live runtime benchmarks. Provider-level routing. Basic caching.
- **Controls:** Provider routing, basic caching. No circuit breaking, no guardrails, no agent controls.
- **Funding:** ~$59M total. $6.6M seed (Jan 2024). $12M Series A (Oct 2024). $40M Series B (Jul 2025, Battery Ventures). $260M valuation.
- **Traction:** Limited public data.
- **Pricing:** Not publicly detailed.
- **Key Gap:** Routing/optimization focus. Well-funded but product is narrow. Does not address control plane needs.

---

### TIER 4: OTHER NOTABLE PLAYERS

#### Keywords AI / Respan
- **What they do:** LLM monitoring platform rebranded as Respan. Unified control plane for tracing, evaluating agent behavior, surfacing issues.
- **Controls:** Observability-focused. Auto-surfaces issues. Does not prevent them.
- **Funding:** YC-backed. Specific amount not public.
- **Traction:** 100+ AI startups. 1B+ logs/mo. 2T+ tokens/mo. 6.5M+ end users.
- **Key Gap:** Recently rebranded. Observability-first, not control-first.

#### AWS Bedrock Guardrails
- **What they do:** Content filters, denied topics, PII redaction, word filters, contextual grounding checks for Bedrock models.
- **Controls:** Content filtering, topic blocking, PII redaction. Charges per guardrail evaluation.
- **Pricing:** $0.15 per 1,000 text units (after 85% price reduction in Dec 2024). Vendor lock-in to AWS Bedrock.
- **Key Gap:** Only works within AWS Bedrock. Not a general-purpose control plane. No cost controls, no circuit breaking, no failover across providers. Guardrails only.

#### Kong AI Gateway
- **What they do:** Traditional API gateway extended with AI-specific rate limiting, request transformation, multi-LLM routing, prompt engineering middleware.
- **Controls:** Rate limiting, request transformation, AI-specific plugins.
- **Traction:** Established API gateway player. 228% faster than Portkey in benchmarks. 859% faster than LiteLLM.
- **Key Gap:** Enterprise API management tool that added AI features. Not purpose-built for AI agent control. Complex. Overkill for many use cases.

#### TrueFoundry
- **What they do:** Secure, scalable AI gateway for infrastructure teams. Recognized in 2025 Gartner Market Guide for AI Gateways.
- **Key Gap:** Infrastructure-focused. Not agent-governance-focused.

#### Maxim AI (Bifrost)
- **What they do:** LLM gateway with lowest latency (11 microsecond overhead at 5K RPS). Automatic failover, semantic caching, enterprise governance.
- **Key Gap:** Performance-optimized gateway. Not a control plane for agent behavior.

---

## 2. MARKET SIZE & GROWTH

### AI Infrastructure Market
| Metric | Value |
|--------|-------|
| 2025 size | $158.3B (ResearchAndMarkets) |
| 2026 size | $90-101B (narrower definitions) |
| 2030 forecast | $418.8B |
| CAGR | 14-25% depending on definition |

### MLOps Market (More Relevant to AgentVault)
| Metric | Value |
|--------|-------|
| 2025 size | $2.2-3.2B |
| 2026 size | $3.4-4.5B |
| 2033-2035 forecast | $25-74B |
| CAGR | 28-42% |

### AI Agents Market (Most Relevant)
| Metric | Value |
|--------|-------|
| 2024 size | $5.25B |
| 2025 size | $7.6-7.8B |
| 2026 size | $10.9B+ |
| 2030 forecast | $52.6B |
| CAGR | 45%+ |

### Enterprise LLM Market
| Metric | Value |
|--------|-------|
| 2025 size | $8.3B |
| 2026 size | $10.0B |
| 2031 forecast | $24.9B |

### Enterprise AI Market
| Metric | Value |
|--------|-------|
| 2026 projected | $114.9B |

---

## 3. ADOPTION & DEPLOYMENT STATISTICS

- **57% of companies** already have AI agents in production (G2 August 2025 survey)
- **22%** are in pilot, **21%** in pre-pilot
- **67%** of large enterprises (10K+ employees) have agents in production
- **40% of enterprise applications** will embed task-specific AI agents by 2026 (Gartner), up from <5% in 2025
- **90% of hospitals** expected to adopt AI agents by 2025
- **48% of telecom** companies adopted agentic AI (highest rate)
- Worker access to AI rose **50% in 2025**
- Companies with 40%+ projects in production **set to double** in six months
- **Agentic AI startups attracted $2.8B** in H1 2025 alone

---

## 4. DEVELOPER PAIN POINTS (What They Actually Complain About)

### From LangChain's State of Agent Engineering Survey (1,300+ professionals):

1. **Quality/Reliability (32%)** -- The #1 production killer. Hallucinations, inconsistent outputs, brand compliance failures, context engineering at scale.
2. **Latency (20%)** -- Agents too slow for customer-facing use cases.
3. **Cost (declining concern)** -- Falling model prices have eased this, BUT...

### The Real Cost Problem (From Production Deployments):

**Runaway token spirals are the #1 financial risk:**
- A company using GPT-4o at $0.60/M tokens with 1.2M messages/day saw invoices go from $15K -> $35K -> $60K in three months, projecting to **$700K/year**
- A single unguarded script can **burn a day's budget in minutes**
- A poorly optimized prompt can **multiply costs by 10x**
- Agentic workflows consume **100x more tokens** than simple completions
- Reasoning tokens (chain-of-thought) cause **10x cost jumps** for identical results (Claude $9.30 vs Grok-4 $95 for same query)

**Cox Automotive's solution:** Circuit breakers on cost AND conversation turns. Agent auto-stops at P95 cost threshold or ~20 turns.

**Duolingo's challenge:** Costs scale directly with user engagement. Verbose users or runaway scripts cause catastrophic bills.

### The Control Gap (What Developers Actually Need):

From real production deployments and community discussions:

1. **"Observability is not enough"** -- Industry consensus by 2026 is that observability must evolve from watching to controlling. "You don't need to read private reasoning to keep control -- you need observable behavior and hard gates."

2. **40%+ of agentic AI projects will fail** before production by 2027 due to escalating costs, unclear value, or **inadequate risk controls**

3. **95% of AI pilots fail** (MIT report) -- often due to poor integration and lack of operational readiness

4. **Circuit breakers are becoming standard** -- Companies implementing "hard limits that automatically stop agents when thresholds are exceeded"

5. **Inter-agent misalignment** is the single most common failure mode in multi-agent systems

6. **No visibility into token consumption** until billing arrives -- costs spiral silently

7. **Evaluation costs compound:** LLM-as-judge setups cost $0.01-$0.10/sample. 100+ eval iterations per dev cycle = thousands of dollars for mid-sized projects.

### From Hacker News Discussions:
- "A simple proxy with budgeting for keys should be straightforward but remains complex"
- Active interest in lightweight monitoring for rate limiting and controlling LLM usage
- Dozens of "Show HN" posts for LLM gateways -- market is fragmented, no clear winner on the control side
- Community recognizes the gap between "gateway" and "governance"

---

## 5. KEY MARKET INSIGHTS FOR AGENTVAULT

### The Gap AgentVault Can Own

| Capability | Portkey | LiteLLM | Braintrust | Helicone | Cloudflare | AgentVault? |
|------------|---------|---------|------------|----------|------------|-------------|
| LLM Routing | Yes | Yes | No | Basic | Yes | Yes |
| Failover | Yes | Basic | No | No | No | Yes |
| Circuit Breaking | Yes | No | No | No | No | Yes |
| Rate Limiting | Yes | Yes | No | Basic | Yes | Yes |
| Cost Controls/Budgets | Basic | Basic | No | No | No | **Primary** |
| Guardrails | Yes (40+) | Basic | No | No | No | Yes |
| Audit Trails | No | Basic | No | No | No | **Primary** |
| Agent-Level Controls | No | No | No | No | No | **Primary** |
| Observability | Yes | Basic | **Primary** | **Primary** | Basic | Yes |

### Positioning Opportunities

1. **"Control Plane" vs "Gateway"** -- Portkey uses "control panel" language but leads with gateway features. AgentVault can own the "control plane" narrative by leading with prevention, not proxying.

2. **Agent-level granularity** -- Nobody does per-agent cost controls, per-agent circuit breakers, per-agent audit trails. Everyone operates at the API-key or request level.

3. **Audit trails as a feature category** -- No competitor leads with compliance/audit. As AI regulation increases (EU AI Act, etc.), this becomes a moat.

4. **"Damage prevention" framing** -- Every competitor is either "observe what happened" or "route requests efficiently." Nobody says "we prevent your AI agents from causing damage."

5. **The consolidation wave** -- Helicone acquired (Mintlify), Langfuse acquired (ClickHouse). Small observability tools are being absorbed. The market is consolidating around larger platforms. AgentVault can be the consolidator on the control side.

### Risks

1. **Portkey is the most dangerous competitor.** $18M funded. 24K orgs. Already has circuit breakers, guardrails, failover. Recently raised Series A. Explicitly positioning as "control plane for production AI."

2. **Cloudflare could add control features** at any time. Their distribution advantage is massive.

3. **Market fatigue.** Hacker News comment: "there are several dozens of AI/LLM gateways now." Differentiation must be crystal clear.

4. **Observability tools could add control.** Braintrust at $800M valuation and $80M funding could easily bolt on gateway/control features.

5. **LiteLLM is the open-source default.** Hard to compete on the proxy layer when LiteLLM is free and ubiquitous.

### Timing Signal

The industry is converging on the exact thesis behind AgentVault:

> "By 2026, observability will evolve from a reactive troubleshooting function into the primary **control plane** for AI-driven applications and agentic systems." -- Industry consensus across IBM, LogicMonitor, CIO.com

> "The opportunity in agentic AI is not just to build more agents -- it's to build the **infrastructure around them**: orchestration layers, control planes, approval workflows, observability tools." -- Foundation Capital

> "Over 40% of agentic AI projects will be canceled by end of 2027 due to escalating costs, unclear business value, or **inadequate risk controls**." -- Gartner

---

## 6. FUNDING SUMMARY TABLE

| Company | Total Funding | Latest Round | Valuation | Stage |
|---------|--------------|--------------|-----------|-------|
| Braintrust | ~$100M+ | $80M Series B (Feb 2026) | $800M | Growth |
| Arize AI | $70M+ | $70M Series C (Feb 2025) | N/A | Growth |
| Galileo AI | $68M | N/A | N/A | Growth |
| Unify AI | ~$59M | $40M Series B (Jul 2025) | $260M | Growth |
| OpenRouter | $40M | $28M Series A (Apr 2025) | $500M | Early Growth |
| Portkey | $18M | $15M Series A (Feb 2026) | N/A | Early Growth |
| Martian | $9M+ | $9M Seed + Accenture | N/A | Seed |
| Helicone | ~$5M | Seed | $25M (acquired) | Acquired (Mintlify, Mar 2026) |
| Langfuse | $4.5M | $4M Seed | N/A | Acquired (ClickHouse, Jan 2026) |
| LiteLLM | $2.1M | Seed (YC W23) | N/A | Seed |
| Keywords AI / Respan | Undisclosed | YC-backed | N/A | Seed |

---

*Research compiled March 2026. Data sourced from Tracxn, Crunchbase, PitchBook, company blogs, G2, TechCrunch, Axios, SiliconANGLE, LangChain surveys, Gartner, and community discussions on Hacker News and Reddit.*

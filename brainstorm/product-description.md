# PRD: Solwyn — The Control Plane for AI Agents in Production

**Author:** Christian (Founder, Solwyn Inc.)
**Date:** 2026-03-14
**Status:** Draft
**Version:** 1.0

---

## 1. Product Vision & Positioning

**Product Name:** Solwyn
**Company:** Solwyn, Inc. (C Corp, established)
**Domain:** solwyn.ai

**One-liner:** Stop your AI agents from burning money, going rogue, or dying when OpenAI goes down.

**Positioning statement:** Solwyn is a control plane for AI agents in production. A lightweight SDK wraps your existing LLM client, enforcing spending caps, automatic failover, and cost attribution locally — without routing your prompts through a third party. Only metadata (token counts, costs, model, latency) is sent to the Solwyn dashboard. Observability tools tell you what went wrong after the damage is done. Solwyn prevents it.

**Category:** AI Agent Infrastructure — Control Plane

**Key differentiator:** Prevention, not observation — and your data never leaves your environment. Solwyn is the only product that combines hard spending enforcement + automatic provider failover + per-agent cost attribution without requiring you to proxy your LLM traffic through a third party. Competitors either observe (Braintrust, Langfuse/ClickHouse) or proxy (Portkey, LiteLLM) — both require your prompts and responses to flow through their servers. Solwyn never sees your content.

**Core thesis:** Every company shipping AI agents needs three things that no LLM provider will ever build for them: (1) hard spending caps that actually kill requests before budget is exceeded, (2) automatic failover across competing providers, and (3) visibility into which agent or team is spending what. LLM providers are incentivized to let you spend more, not less. The control plane must be a neutral third party. And critically — it must achieve all of this without ever seeing your prompts or responses.

**Architecture principle:** Solwyn uses an SDK-first architecture (the Datadog/Sentry model). A lightweight SDK wraps your LLM client and runs inside your application. LLM calls go directly from your app to the provider — Solwyn is never in the request path. The SDK enforces spending caps and circuit breakers locally, and reports only metadata (token count, cost, model, latency, success/failure) to the Solwyn cloud dashboard. If Solwyn's cloud goes down, the SDK continues enforcing rules locally. Your agents never break because of Solwyn.

---

## 2. Market Context

### Market Size
- Enterprise LLM API spending: $8.4B (mid-2025), projected $15B by 2026
- AI agent market: $10.9B (2026), projected $52.6B by 2030 (45% CAGR)
- 57% of companies already have AI agents in production
- 73% of teams lack real-time cost tracking for autonomous agents

### The Problem (Validated by Real Incidents)
- **$47,000** — Recursive LangChain agent loop ran 11 days unnoticed. No cost ceiling. No alerts.
- **$82,314** — Stolen Gemini API key exploited for 48 hours. No spending cap.
- **$23,000** — One failed agent triggered cascade across 12 connected agents.
- **1,700%** — Cost spike during provider outage as retry logic amplified costs instead of failing gracefully.
- **579 outages** — Anthropic experienced 579 incidents in 12 months (avg 29/month).
- **13-hour AWS outage** — Amazon's Kiro agent autonomously deleted production trying to fix a minor bug.

### Competitive Landscape

| Company | Type | Hard Cost Caps | Circuit Breaker | Cost Attribution | Status |
|---------|------|:-:|:-:|:-:|--------|
| **Portkey** | Gateway | No | Yes | Basic | $15M Series A, 24K orgs |
| **Helicone** | Observe | No | No | Yes | Acquired by Mintlify (Mar 2026) |
| **Langfuse** | Observe | No | No | Yes | Acquired by ClickHouse (Jan 2026) |
| **Braintrust** | Observe | No | No | Yes | $800M valuation |
| **LiteLLM** | Proxy | Basic | No | No | Open source, widely used |
| **Cloudflare AI GW** | Proxy | No | No | No | Massive distribution, basic |
| **Solwyn** | **SDK + Control** | **Yes** | **Yes** | **Yes** | **You — and we never see your prompts** |

**Window of opportunity:** The two open-source observability leaders (Helicone, Langfuse) were acquired in early 2026, signaling consolidation. Portkey just raised Series A. The "control plane" category is forming now. Gartner predicts 40%+ of agentic AI projects will fail due to inadequate risk controls.

---

## 3. Target Customers

### Primary Persona: The Startup Engineering Lead
- **Who:** Technical lead or CTO at a 10-50 person startup
- **Situation:** 3-10 AI agents in production, team of 2-5 engineers touching LLM code
- **Pain:** Got a surprise $2K bill last month. OpenAI went down for 4 hours and their AI features were broken. No idea which agent is costing what.
- **Budget:** $49-199/mo, decided with a credit card, no procurement process
- **Buying behavior:** Googles "openai spending limit," finds Solwyn, signs up, swaps one URL, sees value in 5 minutes
- **Success metric for Solwyn:** This persona converts to paid within 14 days of signup

### Secondary Persona: The Solo AI Builder
- **Who:** Individual developer or indie hacker shipping AI-powered products
- **Situation:** 1-3 agents, solo, cost-conscious
- **Pain:** Burned $500 on a recursive loop during development. Wants a safety net before it happens again.
- **Budget:** Free tier, possibly $19-49/mo
- **Role in strategy:** Top-of-funnel distribution. Free tier creates awareness, some convert to paid, most spread word-of-mouth.

### Expansion Persona: The Mid-Market Platform Team
- **Who:** Platform/DevOps engineer at a 50-500 person company
- **Situation:** Managing AI infrastructure across multiple teams, 10-50+ agents
- **Pain:** Needs cost attribution by team, compliance audit trails, policy controls for who can use which models
- **Budget:** $199-499/mo, may need brief internal approval
- **Role in strategy:** Revenue expansion. Upsell from Team to Business tier as agent count grows. Drives NRR above 110%.

---

## 4. Goals & Success Metrics

### Business Goals (12-Month)
- Reach $10K MRR with 100+ paying teams
- Achieve net revenue retention (NRR) above 110%
- Maintain gross margins above 85%
- Monthly logo churn below 5%

### Business Goals (3-5 Year Exit)
- Reach $5-10M ARR
- Rule of 40 compliance (growth rate + profit margin ≥ 40%)
- Recognizable company logos in customer base
- Clean, auditable financials under Solwyn Inc.
- At least one inbound acquisition conversation per year starting year 3

### Product Goals (V1 Launch)
- Time to value under 5 minutes (signup → `pip install solwyn` → first protected LLM call with spending cap active)
- Self-serve onboarding with zero human touch required
- 99.9% dashboard uptime — but critically, if the dashboard goes down, the SDK continues enforcing caps locally. Solwyn must never be the reason an agent fails.
- Zero latency overhead on LLM calls (SDK wraps the client locally, calls go direct to provider)

### Leading Indicators to Track
- Free-to-paid conversion rate (target: 5-8%)
- Time from signup to first SDK-instrumented LLM request (target: under 5 minutes)
- Activation rate: % of signups who instrument 100+ requests in first 7 days
- Expansion revenue: % of customers who increase spend month-over-month

---

## 5. Product Scope — V1 ("The Safety Net")

V1 ships the minimum product that is genuinely differentiated: spending caps + failover + cost attribution. This combination is what nobody else does well today.

### 5.1 Core Value: Python SDK (Drop-In Wrapper)
Users install the Solwyn Python SDK (`pip install solwyn`) and wrap their existing LLM client with a few lines of code. LLM calls continue to go directly from the user's application to the provider — Solwyn is never in the request path. The SDK intercepts calls locally to enforce spending caps and circuit breakers, and sends only metadata (token count, cost, model, latency, success/failure) to the Solwyn dashboard. Prompts and responses never leave the user's environment.

**User story:** *As a startup engineering lead, I want to add Solwyn to my agents with minimal code changes so that I get spending protection and failover without routing my prompts through a third party.*

**Acceptance criteria:**
- [ ] `pip install solwyn` — single package install
- [ ] Drop-in wrapper for the `openai` and `anthropic` Python packages (2-3 lines to integrate)
- [ ] LLM calls go direct to provider (no proxy hop, zero latency added to LLM requests)
- [ ] Only metadata sent to Solwyn cloud: token count, model, cost, latency, success/failure, project ID
- [ ] Prompts and responses are never captured, logged, or transmitted
- [ ] SDK functions in "offline mode" if Solwyn cloud is unreachable (enforces cached caps locally)
- [ ] Supports streaming responses
- [ ] API key authentication ties SDK to a project on the dashboard

### 5.2 Hard Spending Caps
Users set a daily, weekly, or monthly budget per project via the dashboard. The SDK enforces these caps locally — when the budget is hit, the SDK raises an exception before the LLM call is made. Not an alert after the fact. A hard stop at the client level.

The Solwyn cloud API is the single source of truth for budget state. Every SDK instance — whether running across 1 container or 100 — reports cost metadata to the same project via the customer's API key. Before each LLM call, the SDK makes a lightweight budget check against the cloud API. The cloud aggregates all usage across all instances. If the cloud is unreachable, the SDK continues allowing requests (fail-open by default).

When a spending cap is hit, the **default behavior is alert-only** — the request is allowed through, and the team is notified via email/webhook/Slack. Hard deny (blocking requests when budget is exceeded) is available but must be explicitly opted into per project. This prevents Solwyn from ever being the unexpected reason an agent stops working in production.

**User story:** *As an engineering lead, I want to set a $100/day spending cap on our production agents so that I get alerted if a recursive loop starts burning money — and optionally block further requests if I choose.*

**Acceptance criteria:**
- [ ] Configurable budget limits: daily, weekly, monthly (set via dashboard or API)
- [ ] Per-project budget enforcement
- [ ] **Default behavior when cap is hit: alert-only** (request proceeds, team is notified)
- [ ] **Opt-in hard deny mode:** when explicitly enabled, SDK raises `solwyn.BudgetExceededError` and blocks the request before it reaches the provider. Typical use case: enabled in dev/staging environments to catch runaway loops early, disabled in production where alerts let a human decide.
- [ ] Alert channels: email, webhook, Slack (configurable per project)
- [ ] Configurable alert thresholds (e.g., notify at 50%, 80%, 100% of budget)
- [ ] Lightweight pre-call budget check against Solwyn cloud API (works across any number of containers/instances sharing the same API key)
- [ ] Graceful degradation: if cloud is unreachable, requests are allowed through (fail-open)
- [ ] Budget remaining visible in dashboard, API, and CLI

### 5.3 Circuit Breaker & Automatic Failover
The SDK tracks provider health locally using a circuit breaker pattern. When a provider fails (timeouts, 5xx errors, rate limits), the SDK automatically routes the next call to the configured fallback provider — all client-side, no server involved. The circuit breaker state is reported to the dashboard for visibility.

**User story:** *As an engineering lead, I want my agents to automatically failover to Anthropic when OpenAI goes down so that our AI features never break due to a single provider outage.*

**Acceptance criteria:**
- [ ] Circuit breaker with three states: Closed (healthy) → Open (failing) → Half-Open (testing recovery)
- [ ] Configurable failure threshold, recovery timeout, success threshold
- [ ] SDK automatically routes to fallback provider when primary circuit is open (client-side, no server hop)
- [ ] Circuit state reported to dashboard for visibility
- [ ] No manual intervention required for failover or recovery
- [ ] Works even when Solwyn cloud is unreachable (circuit breaker is fully local)

### 5.4 Cost Attribution
The SDK calculates cost per request locally (input tokens × rate + output tokens × rate) and reports metadata events to the Solwyn cloud API. The dashboard aggregates these events into cost breakdowns by project, model, and time period. Only metadata flows to Solwyn — token counts, model name, cost, latency, and success/failure. Never prompts or responses.

**User story:** *As an engineering lead, I want to see which of our 5 agents is spending the most so I can optimize the expensive one instead of guessing.*

**Acceptance criteria:**
- [ ] SDK calculates per-request cost locally from token usage in the LLM response
- [ ] Metadata events sent to Solwyn cloud: project ID, model, token counts, calculated cost, latency, status
- [ ] Dashboard shows cost breakdown by project, model, and time period (day/week/month)
- [ ] Real-time dashboard with current spend vs. budget
- [ ] CSV export of cost data
- [ ] API endpoint for cost data (for custom dashboards/alerts)
- [ ] Metadata events are batched and sent asynchronously (never blocks the LLM call)

### 5.5 Self-Serve Onboarding & Billing
Users sign up on solwyn.ai, create a project, get an API key, and start proxying. Billing via Stripe. Free tier available with no credit card required.

**User story:** *As a developer, I want to sign up and start using Solwyn in under 5 minutes without talking to anyone so I can evaluate it during my lunch break.*

**Acceptance criteria:**
- [ ] Email/GitHub signup (no sales call, no demo request)
- [ ] Project creation with API key generation in onboarding flow
- [ ] Code snippet shown during onboarding: `pip install solwyn` + 3 lines to wrap your client
- [ ] Free tier functional without credit card
- [ ] Stripe integration for paid tiers
- [ ] Usage metering tied to billing

### 5.6 Customer-Facing REST API
A public REST API that lets customers programmatically access their cost data, budget status, provider health, and project configuration. This is the same API that powers the dashboard — customers get full access to build their own integrations, dashboards, or alerting on top of Solwyn data.

**User story:** *As an engineering lead, I want to pull our Solwyn cost data into our internal dashboards and alerting so I can monitor AI spend alongside the rest of our infrastructure metrics.*

**Acceptance criteria:**
- [ ] RESTful API authenticated via the same project API key used by the SDK
- [ ] Endpoints for: cost data (by project, model, time range), budget status (remaining, limit, % used), provider health (circuit breaker state), project configuration (CRUD)
- [ ] JSON responses, paginated where appropriate
- [ ] Rate limited to prevent abuse (generous limits for paying tiers)
- [ ] OpenAPI/Swagger spec published for self-service integration
- [ ] Webhook support for key events: budget threshold hit (80%, 100%), circuit breaker state change, provider outage detected

### 5.7 CLI Tool (Optional)
A lightweight command-line tool (`solwyn` CLI) for developers who prefer the terminal over the dashboard. Useful for quick checks, scripting, and CI/CD integration.

**User story:** *As a developer, I want to check my remaining budget and provider status from the terminal without opening a browser.*

**Acceptance criteria:**
- [ ] `pip install solwyn` includes the CLI (same package as the SDK)
- [ ] `solwyn status` — current spend, budget remaining, provider health
- [ ] `solwyn costs --range 7d` — cost breakdown for the last N days
- [ ] `solwyn budget set --daily 100` — configure budget from the terminal
- [ ] `solwyn projects list` — list projects and their API keys
- [ ] Authenticates via API key (set via `solwyn login` or `SOLWYN_API_KEY` env var)
- [ ] Output formats: human-readable (default) and JSON (`--json` flag) for scripting

### 5.8 Minimal Dashboard
A web dashboard for configuring budgets, viewing costs, and checking provider health. Not a full analytics platform — just enough to configure and monitor.

**User story:** *As an engineering lead, I want a simple dashboard where I can set budgets, see what we're spending, and check if our providers are healthy.*

**Acceptance criteria:**
- [ ] Overview page: current spend, budget remaining, provider health status
- [ ] Cost breakdown page: by project, by model, by day
- [ ] Settings page: budget configuration, provider credentials, API keys
- [ ] Responsive web app (works on mobile for checking during incidents)

---

## 6. Pricing

| Tier | Price | Included | Target |
|------|-------|----------|--------|
| **Free** | $0 | 10K requests/mo, 1 project, spending caps, 7-day cost history | Solo builders, evaluation |
| **Team** | $49/mo + overage | 100K requests, unlimited projects, failover, cost attribution, 90-day history, Slack alerts | Startup engineering leads |
| **Business** | $199/mo + overage | 500K requests, SSO, 1-year history, priority support, SLA | Mid-market platform teams |
| **Scale** | $499+/mo | Unlimited, dedicated infra, custom retention, on-prem option | Large teams, pre-acquisition signal |

**Overage pricing:** $0.50 per 1,000 requests beyond included amount.

**Why this works:**
- Free tier is generous enough to build a real project (10K requests = a few agents running for a month)
- Team tier at $49/mo is below the "expense report" threshold — no procurement needed
- Usage-based overage ensures revenue grows as customers scale (drives NRR)
- Business tier adds compliance features that mid-market teams require (SSO, SLA, retention)

**Path to $10K MRR:** 100 teams at $49/mo + overage, or 50 teams at $49 + 25 businesses at $199.

---

## 7. Non-Goals (V1)

These are explicitly out of scope for V1. They may become V2/V3 features based on customer demand.

- **Rate limiting** — Valuable but not core to the V1 thesis. Spending caps achieve the same protective outcome.
- **Policy engine** — Blackout windows, approval workflows, model access controls. Powerful but complex. Wait for mid-market customers to ask for it.
- **Tamper-evident audit logs** — Strong compliance feature but premature before we have compliance-driven customers. The cost attribution data serves as a basic audit trail for V1.
- **Prompt logging / observability** — We are not an observability tool. Prompts and responses never leave the customer's environment. This is not just a positioning choice — it is a structural guarantee of the SDK-first architecture. We physically cannot see customer prompts.
- **Server-side proxy** — Solwyn does NOT proxy LLM traffic through our servers. All LLM calls go directly from the customer's application to the provider. This eliminates latency overhead, data exposure, and single-point-of-failure risk.
- **More than 2 providers** — V1 supports OpenAI and Anthropic. Google, Mistral, Bedrock come when customers ask.
- **JavaScript/TypeScript SDK** — Python first. JS/TS in V2.
- **Open sourcing** — Evaluate at $1M+ ARR, not before.
- **Enterprise sales motion** — No outbound sales, no sales team, no custom contracts. Self-serve only.
- **Mobile app** — The dashboard is a responsive web app. No native mobile.

---

## 8. User Journeys

### Journey 1: First-Time Setup (Target: under 5 minutes)
1. Developer lands on solwyn.ai, reads "Stop your AI agents from burning money"
2. Signs up with GitHub (no credit card for free tier)
3. Creates first project, receives a Solwyn API key
4. Runs `pip install solwyn`, wraps their OpenAI client in 3 lines of code
5. Makes first LLM call — it goes directly to OpenAI as usual, but the SDK reports metadata to Solwyn
6. Sets a $50/day spending cap on the project via the dashboard
7. Sees the first request appear in the cost dashboard
8. **Outcome:** Developer feels protected. They have a safety net. And their prompts never left their machine.

### Journey 2: The 3am Recursive Loop (The Moment That Sells Itself)
1. Developer's agent enters a recursive loop at 3am
2. After 47 requests, the SDK detects the daily budget ($50) is hit
3. The SDK raises `solwyn.BudgetExceededError` on request #48 — the call never reaches OpenAI
4. Developer wakes up, sees $50 spent instead of $5,000
5. Sees exactly which agent caused it in the cost dashboard
6. **Outcome:** Developer tells their team lead. Team lead signs up for the Team tier.

### Journey 3: OpenAI Goes Down (The Reliability Moment)
1. OpenAI returns 500 errors for 2 hours
2. The SDK's circuit breaker detects 3 consecutive failures, opens the circuit
3. The SDK automatically routes the next call to Anthropic (pre-configured fallback) — all local, no server involved
4. Developer's AI features continue working. Their users notice nothing.
5. OpenAI recovers. Circuit breaker enters half-open state, tests with a few requests, closes.
6. **Outcome:** Developer realizes they can't live without this. Upgrades to Team.

### Journey 4: Team Expansion (The NRR Driver)
1. Engineering lead has 3 projects on the Team tier
2. Company hires 2 more engineers who start building agents
3. They create 3 more projects, each with their own budgets
4. Monthly request count grows from 50K to 200K (overage kicks in)
5. Engineering lead sees cost attribution showing which projects are expensive
6. **Outcome:** Monthly bill grows from $49 to $120 organically. NRR > 110%.

---

## 9. Risk & Mitigation

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Portkey ships hard cost caps** | High | Move fast. Portkey leads with "gateway" not "safety." Own the prevention narrative. Their 24K orgs are mostly free tier — differentiate on depth, not distribution. Solwyn's SDK-first approach is a structural advantage: Portkey requires you to proxy through them. |
| **LLM providers add native spending limits** | Medium | Providers will never build cross-provider failover. They will never build cost attribution across competitors. And they are incentivized to let you spend more, not less. Native limits validate the category. |
| **Low conversion from free to paid** | Medium | Free tier must be genuinely useful but create natural upgrade pressure. 10K requests/mo is enough to evaluate but not enough for production. The ceiling is the conversion mechanism. |
| **Solo founder bandwidth** | High | Nights/weekends only. V1 must be ruthlessly scoped. No feature creep. Ship the safety net, validate willingness to pay, then decide what's next. Use solwyn-core extraction to accelerate — don't rebuild what exists. |
| **Budget check latency** | Low | Each LLM call includes a lightweight pre-call budget check against the Solwyn API. This adds a small network round-trip. Mitigation: the check is a simple allow/deny against an in-memory aggregation — sub-10ms response. Can be cached for a few seconds if needed. |
| **SDK adoption friction vs URL swap** | Low | Installing a pip package and wrapping a client is slightly more work than swapping a URL. But the trust/security advantage far outweighs the friction. And the onboarding flow shows exactly the 3 lines needed. |

---

## 10. Go-to-Market Strategy

### Constraints
- Founder has a full-time $300K/yr job and will not leave until Solwyn revenue is comparable
- No build-in-public, no community management, no daily social media
- GTM must be high-leverage, low-time-investment
- Product must sell itself (PLG, self-serve, no hand-holding)

### Launch Strategy
- **Pre-launch:** Landing page on solwyn.ai with email capture. "Coming soon" with the horror story stats ($47K recursive loop, 579 Anthropic outages).
- **Launch:** Single Hacker News post — a technical blog post framed as "How a $47,000 recursive loop could have been prevented with one line of code." Link to Solwyn at the bottom. One evening of work.
- **Post-launch:** 1-2 SEO-optimized technical articles per month (written with AI assistance). Topics: "LLM circuit breakers explained," "how to set spending limits on OpenAI," "OpenAI vs Anthropic failover." Target developers who Google these problems.
- **Ongoing:** Product Hunt launch at a later date (when dashboard is polished). Reddit posts in r/MachineLearning, r/ChatGPT when relevant threads appear.

### Distribution Flywheel
The product is the distribution. Every developer who avoids a $5,000 bill because of Solwyn tells their team. Every team that stays up during an OpenAI outage tells their network. The horror story that *didn't happen* is the marketing.

---

## 11. Revenue Model & Exit Path

### Revenue Projections (Bootstrapped, Conservative)

| Year | ARR Target | Paying Teams | Milestone |
|------|-----------|-------------|-----------|
| Year 1 | $100-300K | 50-150 | Product-market fit validated, NRR > 110% |
| Year 2 | $500K-1.5M | 200-500 | Sustainable growth, first enterprise logos |
| Year 3 | $1.5-3M | 500-1,000 | PE firms start calling, SOC2 complete |
| Year 4 | $3-6M | 1,000-2,000 | Strategic buyers take notice |
| Year 5 | $5-10M | 2,000+ | Exit zone: $50M at 5-10x ARR |

### Exit Profile
- **Target sale price:** $50M
- **Required ARR:** $5-10M (at 5-10x revenue multiple)
- **Most likely acquirers:** Datadog, Cloudflare, ClickHouse, Sentry, or PE firms (Thoma Bravo, Five Elms Capital)
- **Comparable exit:** Papertrail — bootstrapped developer infrastructure (cloud logging), zero outside funding, sold for $41M cash to SolarWinds after 4 years
- **Key metrics for acquisition premium:** NRR > 110%, gross margins > 80%, Rule of 40 compliance, recognizable logos, low churn

### What Makes Solwyn Acquirable
1. **Capital efficiency** — Bootstrapped to $5M+ ARR signals strong PMF and unit economics
2. **Strategic gap-fill** — Datadog/Cloudflare want to own the AI observability + control stack. Solwyn fills the "control" gap.
3. **Multi-provider neutrality** — Can't be replicated by any single LLM provider. Must be a third party.
4. **Configuration lock-in** — Once 1,000 teams have budgets, policies, and historical cost data in Solwyn, switching is painful.
5. **Clean financials** — C Corp, no cap table complexity, no VC preferences to negotiate around.

---

## 12. Founder Constraints & Operating Principles

- **Nights and weekends only.** Every product decision must pass the test: "Can I build and maintain this with 10-15 hours per week?"
- **Revenue before features.** Ship the minimum that someone will pay for. Add features when paying customers ask for them.
- **No operational liability.** Solwyn is a client-side SDK + a metadata dashboard. It never touches customer infrastructure. It never sees customer prompts. It never executes remediation. If something breaks, Solwyn is what *prevented more damage*.
- **No model dependency.** Solwyn does not use AI models. It is pure infrastructure — client-side enforcement, metadata collection, circuit breaking. No fine-tuning, no GPU costs, no model risk.
- **We never see your data.** The SDK sends only metadata to the Solwyn cloud: token counts, costs, model names, latency, success/failure. Prompts and responses stay in the customer's environment. This is not a feature — it is a foundational architectural decision that eliminates the #1 objection to third-party AI tooling.
- **Self-serve or nothing.** If a feature requires hand-holding, demos, or custom onboarding, it doesn't ship. The product must sell itself.
- **Existing code first.** ~40-50% of core infrastructure exists in solwyn-core (circuit breakers, cost tracking, rate limiting, audit logs). Extract and repackage before building new.

---

## 13. Open Questions

1. **Budget check caching:** Should the SDK cache the allow/deny response for a few seconds to reduce API calls, or check every time? Per-call is simplest and most accurate. Caching reduces load but could allow a few requests to slip through after a budget is hit. Likely start with per-call and add caching if API load becomes an issue.
2. **Open source timing:** When (if ever) should the SDK be open-sourced? Open-sourcing the SDK builds trust (users can verify we don't capture prompts). The dashboard stays closed-source as the monetization layer. PostHog/Sentry playbook suggests open source accelerates adoption, but it also complicates the IP story for acquisition.
3. **GTM channel:** Hacker News launch vs. SEO-first vs. Product Hunt — which single channel gets the best return on 2-3 evenings of effort? To be decided post-V1 based on available time.
4. **JS/TS SDK timing:** Python first is confirmed. When does the JavaScript/TypeScript SDK ship? Likely V2, but if early customers ask, it could be accelerated.
5. **Provider credential flow:** Users configure their own OpenAI/Anthropic API keys in the SDK directly. Solwyn never sees provider credentials — they stay in the customer's environment alongside the SDK. This is a trust advantage but means we can't offer a "bring no keys" experience.

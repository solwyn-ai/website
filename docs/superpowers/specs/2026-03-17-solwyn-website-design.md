# Design Spec: Solwyn.ai Product Website

**Date:** 2026-03-17
**Author:** Christian (Founder) + Claude (Design)
**Status:** Draft
**Scope:** Landing page (`/`) + Pricing page (`/pricing`)

---

## 1. Context

Solwyn is an SDK-first control plane for AI agents in production. It provides hard spending caps, automatic provider failover, and per-agent cost attribution — all without proxying LLM traffic. The SDK wraps the customer's LLM client locally; only metadata (token counts, costs, latency) reaches Solwyn's cloud. Prompts and responses never leave the customer's environment.

The Model Price Index (mpi.sh) is already built and running as the top-of-funnel SEO tool. Its "Learn More →" CTA at the bottom links to solwyn.ai. This spec covers the solwyn.ai product website that MPI points to.

**What we're building:** A 2-page marketing site (landing page + pricing) with a waitlist email capture CTA. The product is nearly ready; the site launches first with a waitlist, then flips to real signup when the product ships.

**What we're not building:** Auth/signup flows, blog, docs, dashboard previews, analytics integration, or any backend beyond the waitlist email capture.

---

## 2. Visual Direction: "Warm Terminal"

The site is an evolved sibling of MPI — rooted in the same warm, editorial seriousness but with its own identity as a product site. It must look nothing like the typical dark-mode, neon-gradient AI tool website.

### Design Language

- **Background:** Warm cream `#f5f0e8` (matches MPI)
- **Text:** Near-black `#1a1a1a`
- **Secondary text:** Warm gray `#6b6155`
- **Muted text:** `#8a8070`
- **Accent:** Red `#c0392b` (carried from MPI's active tab underline)
- **Code block background:** Warm tan `#ebe6db` (light code blocks, matching MPI's warmth)
- **Dark code blocks:** `#1c1917` (used sparingly for contrast in feature sections)
- **Borders:** `#d4cfc5` (warm, not cold gray)

### Typography

- **Headlines:** Serif font — Instrument Serif or Playfair Display. Large, editorial, with negative letter-spacing. This is the defining aesthetic choice.
- **Body:** System font stack (`system-ui, -apple-system, sans-serif`). Clean, readable, doesn't compete with headlines.
- **Code:** Geist Mono (ties to the Vercel deployment ecosystem). Used for code snippets, the logo wordmark, and technical labels.
- **Navigation/labels:** System font, small caps or letterspaced uppercase. Warm gray color.

### Anti-Patterns (What This Site Must Never Look Like)

- Dark mode backgrounds with neon gradients
- Purple-on-white AI slop aesthetic
- Inter/Roboto/Arial body text
- Generic SaaS hero with floating mockup screenshots
- Decorative geometric shapes or blob gradients
- Cookie-cutter component card grids
- Any design that could be mistaken for a Portkey/Braintrust/generic AI tool page

### What Makes It Distinctive

- Warm cream background in a sea of dark AI sites
- Serif headlines — almost nobody in dev infra uses serif type
- The architecture diagram as hero visual (not a tagline + stock illustration)
- Typography-driven hierarchy — the design earns attention through type, not decoration
- Dark code blocks on warm background create visual rhythm without going full dark mode

---

## 3. Landing Page (`/`)

### Section 1: Hero

**Layout:** Left-aligned text with architecture diagram on the right (or below on mobile). Full-width warm cream background.

**Content:**
- **Headline (serif, ~40px):** "The control plane that never sees your prompts."
- **Subhead (system font, ~16px, warm gray):** "Hard spending caps. Automatic failover. Per-agent cost attribution. And we never see your data."
- **CTA:** Email input + "Get early access" button (dark background, cream text)
- **Secondary link:** "View pricing →"
- **Code snippet (below CTA):** The 3-line integration in a warm code block:
  ```python
  from solwyn import Solwyn
  client = Solwyn(openai.OpenAI(), api_key="sk-solwyn-...")
  # That's it. Your existing code works unchanged.
  ```

**Architecture Diagram (hero visual):**
CSS/SVG illustration showing the data flow:
```
┌──────────────────────┐                ┌─────────────────┐
│  Your App            │                │  Solwyn Cloud    │
│    ↓                 │  metadata only │  Budget state    │
│  Solwyn(OpenAI())    │ ──────────────→│  Cost dashboard  │
│    ↓                 │                │  Alerts          │
│  LLM Provider ←─────│── direct call  └─────────────────┘
└──────────────────────┘
```
- Three elements: "Your App + Solwyn SDK", "LLM Provider" (direct arrow), "Solwyn Dashboard" (dashed metadata arrow)
- Subtle animation on load: metadata "pulses" flowing to the dashboard
- Red accent on the SDK label to draw the eye
- The "direct call" arrow is bold/solid; the "metadata only" arrow is dashed/lighter — visually communicating that Solwyn is NOT in the request path

**Nav bar:**
- Logo: "SOLWYN" in bold letterspaced type (or "Solwyn" in serif) + "Control Plane" label in muted small caps
- Links: Pricing · Docs (links to `#` with "Coming soon" tooltip until docs site exists) · GitHub (links to github.com/solwyn-ai)
- Right side: "Get early access" button (compact)

### Section 2: The Problem (Horror Stories)

**Layout:** 3 stat cards in a row, each with a large number, a one-line description, and a source note.

**Content:**
- **$47,000** — "Recursive LangChain agent ran 11 days unnoticed. No cost ceiling."
- **579 outages** — "Anthropic experienced 579 incidents in 12 months. Avg 29/month."
- **$82,314** — "Stolen Gemini API key exploited for 48 hours. No spending cap."

**Kicker line (below cards):** "Observability tells you what went wrong. Solwyn prevents it."

**Design:** Cards have warm cream background with subtle border. Numbers are large serif. Descriptions are small system font. The kicker line is in serif italic or bold to stand apart.

### Section 3: Three Pillars (Features)

Three feature sections, each with a product-preview visual on one side and text on the other. Alternating left/right layout.

**Pillar 1 — Hard Spending Caps:**
- Visual: Budget gauge mockup — a progress bar showing "$47.20 / $100.00 daily budget" with a threshold marker at 80% (yellow) and 100% (red). Shows an alert badge: "Budget alert sent at 80%."
- Headline: "Stop the bleeding before it starts."
- Body: "Set daily, weekly, or monthly budgets per project. Alert-only by default — your agents keep running and you get notified. Opt into hard deny when you're ready. The SDK enforces caps locally, even if Solwyn's cloud is unreachable."

**Pillar 2 — Circuit Breaker & Failover:**
- Visual: State diagram showing Closed (green) → Open (red) → Half-Open (yellow) → Closed. With a timeline: "OpenAI 500 errors detected → Circuit opens → Traffic routes to Anthropic → OpenAI recovers → Circuit closes."
- Headline: "Your users notice nothing."
- Body: "When a provider fails, the SDK automatically routes to your configured fallback — all client-side, no server involved. The circuit breaker tracks health locally. No manual intervention. No downtime."

**Pillar 3 — Cost Attribution:**
- Visual: Mock cost breakdown table (warm cream background, matching MPI's data-dense aesthetic):
  ```
  Project          Model          7d Cost    Trend
  search-agent     gpt-4o         $142.30    ↑ 23%
  chat-bot         claude-sonnet   $87.50     ↓ 12%
  summarizer       gpt-4o-mini    $12.80     → flat
  ```
- Headline: "Know which agent is burning the budget."
- Body: "Per-project cost breakdown by model and time period. Real-time dashboard with current spend vs. budget. CSV export. API endpoint for custom dashboards. All powered by metadata — we never see your prompts."

### Section 4: The Privacy Guarantee

**Layout:** Two-column comparison with a header.

**Headline:** "What Solwyn sees vs. what Solwyn never sees."

**Left column — "What we receive" (with checkmarks):**
- Token count (input/output)
- Model name
- Calculated cost
- Latency (ms)
- Success/failure status
- Project ID

**Right column — "What never leaves your environment" (with X marks):**
- Prompts
- Responses
- System messages
- Function calls
- Conversation history
- Any content whatsoever

**Footer line:** "This is architecture, not policy. The SDK is a local wrapper — your LLM calls go directly from your app to the provider. Solwyn is never in the request path."

### Section 5: Comparison Strip

**Layout:** Horizontal comparison table (compact, MPI-inspired data density).

| Feature | Solwyn | Portkey | LiteLLM | Braintrust | Cloudflare AI GW |
|---------|--------|---------|---------|------------|-----------------|
| Hard cost caps | **Yes** | No | Basic | No | No |
| Circuit breaker | **Yes** | Yes | No | No | No |
| Cost attribution | **Yes** | Basic | No | Yes | No |
| Automatic failover | **Yes** | Yes | Basic | No | No |
| Sees your prompts? | **NEVER** | Yes | Yes | Yes | Yes |

The "NEVER" cell is styled with red accent to draw attention. This is the kill shot row.

### Section 6: How It Works

**Layout:** 3-step horizontal flow with code block.

**Steps:**
1. **Install** — `pip install solwyn` (badge showing package)
2. **Wrap** — 3 lines of code (the same snippet from the hero, repeated for reinforcement)
3. **Configure** — Set a budget on the dashboard (mini mockup of budget input)

**Footer:** "Under 5 minutes. No infrastructure changes. No proxy. No new dependencies."

### Section 7: Bottom CTA

**Layout:** Full-width section with warm cream background, centered.

**Headline (serif):** "Built by a developer who got a $2,000 surprise bill."
**Sub:** "Solwyn exists because the tools that should have prevented it didn't exist yet."
**CTA:** Email input + "Get early access" button (same as hero)

---

## 4. Pricing Page (`/pricing`)

### Header

**Headline (serif):** "Simple pricing. No surprises."
**Sub:** "Every tier includes the same privacy guarantee. Your prompts never leave your environment."

### Tier Cards

4 cards in a row (Free, Solo, Team, Business) + Enterprise as a "Contact us" strip below.

**Free — $0/mo:**
- 5K requests/month
- 1 project
- Spending caps (alert-only + hard deny)
- Circuit breaker + failover
- Cost attribution by project
- 7-day cost history
- Email alerts
- No credit card required

**Solo — $49/mo:**
- 50K requests/month
- 3 projects
- Everything in Free
- Cost attribution by project + model
- 30-day cost history
- Email + webhook alerts
- 14-day full trial
- Badge: "Most popular"

**Team — $149/mo:**
- 500K requests/month
- 10 projects
- Everything in Solo
- Cost attribution by project + model + team
- 90-day cost history
- + Slack alerts
- 30-day audit log
- Priority email support
- 14-day full trial

**Business — $399/mo:**
- 5M requests/month
- Unlimited projects
- Everything in Team
- Full cost breakdown
- 1-year cost history
- + PagerDuty alerts
- 1-year tamper-evident audit log
- Priority support + SLA
- 14-day full trial

**Enterprise strip:**
- "Need SSO, VPC deployment, or custom retention? Contact us."
- This is aspirational — not actively built or sold.

### Card Design

- Warm cream cards with subtle borders
- Active/recommended tier (Solo) has a slightly different treatment — thicker border or red accent
- Price is large serif
- Features are a compact list with checkmarks
- CTA button on each card: "Join waitlist" (all go to same waitlist since product isn't live)

### Overage Section

Below the cards, a small section explaining overages:

**"What happens when you exceed your plan?"**
- Solo: $2.50 per additional 50K requests
- Team: $2.00 per additional 50K requests
- Business: $1.00 per additional 50K requests
- "Overage is soft — your agents never stop because of billing. Charges accrue and appear on your next invoice."

### Feature Comparison Table

Expandable/collapsible detailed comparison matrix. Columns: Free, Solo, Team, Business. Rows grouped by category:

**Core Features:** Requests/mo, Projects, Spending caps, Circuit breaker, Failover, Cost attribution depth
**Alerts:** Email, Webhook, Slack, PagerDuty, Custom thresholds
**History & Audit:** Cost history retention, Audit log, Tamper-evident audit
**Support:** Community, Email, Priority email, SLA
**Privacy:** "Prompts never leave your environment" (checkmark across ALL tiers)

### FAQ Section

Collapsible accordion:
- "What counts as a request?" — Each LLM call instrumented by the Solwyn SDK counts as one request. Streaming calls count as one request.
- "What happens when I hit my request limit?" — Your agents keep running. Overage charges accrue automatically. No service interruption.
- "Do you ever see my prompts or responses?" — Never. The SDK wraps your client locally. LLM calls go directly from your app to the provider. Only metadata reaches Solwyn.
- "What if Solwyn's cloud goes down?" — Your agents keep running. The SDK enforces cached budget limits locally and continues allowing requests (fail-open by default).
- "Can I switch plans anytime?" — Yes. Upgrades take effect immediately. Downgrades take effect at the start of the next billing cycle.
- "Is there an annual discount?" — Yes. Annual billing offers a 2-month discount (e.g., Solo at $490/year = $40.83/mo effective).

### Bottom CTA

Same waitlist capture as landing page bottom CTA.

---

## 5. Shared Components

### Navigation

- Sticky top nav with warm cream background
- Logo left: "SOLWYN" (bold letterspaced) or "Solwyn" (serif)
- Links center/right: Pricing · Docs · GitHub
- CTA right: "Get early access" (compact button)
- On scroll: subtle shadow appears to separate from content
- Mobile: hamburger menu

### Footer

- Left: "© 2026 Solwyn, Inc."
- Center: Links — Pricing · Docs · GitHub · Privacy · Terms
- Right: "Built with obsessive attention to your privacy."
- Warm cream background, subtle top border

### Waitlist Form

- Email input (warm cream field with border) + "Get early access" button (dark fill)
- Validation: email format check
- Success state: input transforms to "You're on the list. We'll be in touch." with a checkmark
- Error state: "Something went wrong. Try again." with red accent
- Backend: Next.js API route that stores email (implementation details in plan)

---

## 6. Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Instrument Serif (headlines), system font stack (body), Geist Mono (code)
- **Deployment:** Vercel
- **Animation:** CSS animations for the architecture diagram pulse effect. No heavy JS animation libraries.
- **Waitlist backend:** Next.js API route → JSON file on disk for local dev, Vercel KV (via Upstash Redis from Marketplace) for production. Simplest durable option with zero external dependencies beyond Vercel.

### File Structure

```
website/
├── app/
│   ├── layout.tsx          # Root layout: fonts, nav, footer
│   ├── page.tsx            # Landing page
│   ├── pricing/
│   │   └── page.tsx        # Pricing page
│   └── api/
│       └── waitlist/
│           └── route.ts    # Waitlist email capture endpoint
├── components/
│   ├── nav.tsx             # Shared navigation
│   ├── footer.tsx          # Shared footer
│   ├── waitlist-form.tsx   # Email capture form (client component)
│   ├── architecture-diagram.tsx  # Hero SVG/CSS diagram
│   ├── stat-card.tsx       # Horror story stat cards
│   ├── feature-section.tsx # Feature pillar sections
│   ├── comparison-table.tsx # Competitor comparison
│   ├── pricing-card.tsx    # Pricing tier card
│   ├── pricing-table.tsx   # Feature comparison matrix
│   └── faq.tsx             # Accordion FAQ
├── public/
│   └── (static assets if needed)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### Responsive Design

Breakpoints follow Tailwind defaults: `sm` (640px), `md` (768px), `lg` (1024px).

**Mobile (< 768px):**
- Nav collapses to hamburger menu
- Hero: text stacks above architecture diagram (full width)
- Stat cards: vertical stack (1 column)
- Feature pillars: visual above text (no alternating)
- Privacy columns: stack vertically (receives → never sees)
- Comparison table: horizontal scroll with sticky first column
- How It Works: vertical steps (numbered list)
- Pricing cards: single column stack, recommended tier (Solo) first
- Feature comparison matrix: horizontal scroll with sticky first column
- FAQ: full width, no change needed

**Tablet (768px–1024px):**
- Stat cards: 3-up row (same as desktop, tighter spacing)
- Pricing cards: 2x2 grid
- Everything else: same as desktop with tighter margins

---

## 7. Content Sources

All copy is derived from:
- `brainstorm/product-description.md` — PRD, feature descriptions, user journeys, pricing tiers
- `brainstorm/2026-03-14-pricing-strategy-v3.md` — pricing details, overage rates, tier features, competitive positioning
- `brainstorm/core-repo-README.md` — code snippets, architecture diagram, technical accuracy
- `brainstorm/solwyn-competitive-landscape.md` — competitor comparison data, market stats, horror story figures

**Note:** The pricing strategy v3 is the authoritative source for all pricing, tier names, and overage rates. The PRD's Section 6 (Pricing) uses an older tier structure and is superseded. The competitive landscape doc uses the earlier working name "AgentVault" — all references should be read as "Solwyn."

No copy needs to be invented from scratch. The brainstorm docs contain all the raw material.

---

## 8. Open Decisions (Resolved)

| Question | Decision | Rationale |
|----------|----------|-----------|
| Landing + pricing on same page? | Separate pages | Cleaner navigation, pricing can be linked directly |
| Dark mode or light? | Light (warm cream) | Anti-AI-slop, MPI continuity, distinctive |
| CTA type? | Waitlist email capture | Product nearly ready but not shipped yet |
| Serif font choice? | Instrument Serif | Editorial weight without Playfair's overuse. Test during build. |
| Architecture diagram | CSS/SVG, not image | Crisp at all sizes, animatable, no asset management |
| Waitlist storage | Upstash Redis (Vercel KV) | Zero external deps beyond Vercel Marketplace. JSON file fallback for local dev. |

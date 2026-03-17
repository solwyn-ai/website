# Solwyn.ai Product Website — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 2-page marketing site (landing page + pricing) for Solwyn with a waitlist email capture, deployed on Vercel.

**Architecture:** Next.js 16 App Router with static pages. Server Components for everything except the waitlist form (client component for form state), hamburger menu, and FAQ accordion. Waitlist emails stored via a Next.js API route with JSON file storage for local dev.

**Tech Stack:** Next.js 16, Tailwind CSS 4, Instrument Serif + Geist Mono fonts via `next/font`, Vercel deployment.

**Spec:** `docs/superpowers/specs/2026-03-17-solwyn-website-design.md`

---

## File Map

```
website/
├── app/
│   ├── globals.css             # Tailwind imports + @theme config (colors, fonts)
│   ├── layout.tsx              # Root layout: fonts, metadata, nav, footer
│   ├── page.tsx                # Landing page (7 sections)
│   ├── pricing/
│   │   └── page.tsx            # Pricing page
│   └── api/
│       └── waitlist/
│           └── route.ts        # POST handler for email capture
├── components/
│   ├── nav.tsx                 # Sticky nav with mobile hamburger ('use client')
│   ├── footer.tsx              # Footer (server component)
│   ├── waitlist-form.tsx       # Email input + submit ('use client')
│   ├── architecture-diagram.tsx # SVG/CSS hero diagram (server component)
│   ├── stat-card.tsx           # Horror story stat card (server component)
│   ├── feature-pillar.tsx      # Feature section with visual + text (server component)
│   ├── budget-gauge.tsx        # Spending cap visual mockup (server component)
│   ├── circuit-breaker-diagram.tsx # Circuit breaker state visual (server component)
│   ├── cost-table.tsx          # Cost attribution mock table (server component)
│   ├── privacy-comparison.tsx  # Two-column sees vs never-sees (server component)
│   ├── competitor-table.tsx    # Competitor comparison strip (server component)
│   ├── how-it-works.tsx        # 3-step integration flow (server component)
│   ├── pricing-card.tsx        # Single pricing tier card (server component)
│   ├── pricing-comparison.tsx  # Feature comparison matrix (server component)
│   └── faq.tsx                 # Accordion FAQ ('use client')
├── lib/
│   └── waitlist.ts             # Waitlist storage abstraction
├── next.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.gitignore`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

Run:
```bash
cd /Users/christian/dev/repos/solwyn-ai/website
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --yes
```

Expected: Project scaffolded with Next.js 16, Tailwind CSS 4, App Router.

- [ ] **Step 2: Install Geist font package**

Run:
```bash
npm install geist
```

- [ ] **Step 3: Configure fonts in `app/layout.tsx`**

Replace the generated layout with:

```tsx
import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solwyn — The Control Plane That Never Sees Your Prompts",
  description:
    "Hard spending caps, automatic failover, and per-agent cost attribution for AI agents in production. Your prompts never leave your environment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${GeistMono.variable}`}
    >
      <body className="bg-cream text-primary antialiased font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Configure Tailwind theme in `app/globals.css`**

Replace the generated globals.css with the Warm Terminal design system:

```css
@import "tailwindcss";

@theme {
  --color-cream: #f5f0e8;
  --color-cream-dark: #ebe6db;
  --color-primary: #1a1a1a;
  --color-secondary: #6b6155;
  --color-muted: #8a8070;
  --color-accent: #c0392b;
  --color-border: #d4cfc5;
  --color-code-dark: #1c1917;

  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: var(--font-geist-mono);
}
```

- [ ] **Step 5: Create placeholder landing page**

Replace `app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-[family-name:var(--font-serif)] text-4xl tracking-tight">
        The control plane that never sees your prompts.
      </h1>
    </div>
  );
}
```

- [ ] **Step 6: Create placeholder nav and footer**

Create `components/nav.tsx`:
```tsx
export function Nav() {
  return <nav className="h-16 border-b border-border" />;
}
```

Create `components/footer.tsx`:
```tsx
export function Footer() {
  return <footer className="h-16 border-t border-border" />;
}
```

- [ ] **Step 7: Verify dev server runs**

Run: `npm run dev`

Open http://localhost:3001 (use port 3001 since MPI is on 3000). Verify: warm cream background, serif headline renders, no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 project with Warm Terminal design system"
```

---

## Task 2: Navigation + Footer

**Files:**
- Modify: `components/nav.tsx`
- Modify: `components/footer.tsx`

- [ ] **Step 1: Build the full navigation component**

Replace `components/nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border transition-shadow">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-3">
          <span className="text-lg font-bold tracking-[0.15em] text-primary">
            SOLWYN
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted hidden sm:inline">
            Control Plane
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/pricing"
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <span
            className="text-sm text-muted cursor-default"
            title="Coming soon"
          >
            Docs
          </span>
          <a
            href="https://github.com/solwyn-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="#waitlist"
            className="text-sm bg-primary text-cream px-4 py-2 hover:bg-primary/90 transition-colors"
          >
            Get early access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-px bg-primary transition-transform ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
            />
            <span
              className={`block h-px bg-primary transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-primary transition-transform ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-cream px-6 py-4 flex flex-col gap-4">
          <Link
            href="/pricing"
            className="text-sm text-secondary"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </Link>
          <span className="text-sm text-muted">Docs (coming soon)</span>
          <a
            href="https://github.com/solwyn-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary"
          >
            GitHub
          </a>
          <a
            href="#waitlist"
            className="text-sm bg-primary text-cream px-4 py-2 text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get early access
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Build the footer**

Replace `components/footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>&copy; 2026 Solwyn, Inc.</span>
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <span className="cursor-default" title="Coming soon">Docs</span>
          <a href="https://github.com/solwyn-ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
        <span className="text-xs">Built with obsessive attention to your privacy.</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run dev server, check: sticky nav with logo + links, footer at bottom, mobile hamburger works at narrow viewport.

- [ ] **Step 4: Commit**

```bash
git add components/nav.tsx components/footer.tsx
git commit -m "feat: add navigation and footer with mobile hamburger menu"
```

---

## Task 3: Waitlist Form + API Route

**Files:**
- Create: `components/waitlist-form.tsx`, `app/api/waitlist/route.ts`, `lib/waitlist.ts`

- [ ] **Step 1: Create waitlist storage abstraction**

Create `lib/waitlist.ts`:

```ts
import { promises as fs } from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), ".waitlist.json");

export async function addToWaitlist(email: string): Promise<void> {
  let emails: string[] = [];
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    emails = JSON.parse(data);
  } catch {
    // File doesn't exist yet
  }

  if (emails.includes(email)) {
    return; // Already on the list, silently succeed
  }

  emails.push(email);
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(emails, null, 2));
}
```

- [ ] **Step 2: Create the API route**

Create `app/api/waitlist/route.ts`:

```ts
import { NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/waitlist";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await addToWaitlist(email.toLowerCase().trim());

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Add `.waitlist.json` to `.gitignore`**

Append to `.gitignore`:
```
.waitlist.json
```

- [ ] **Step 4: Test the API route**

Run dev server, then:
```bash
curl -X POST http://localhost:3001/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Expected: `{"success":true}`

Verify `.waitlist.json` was created with `["test@example.com"]`.

Test invalid email:
```bash
curl -X POST http://localhost:3001/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "not-an-email"}'
```

Expected: `{"error":"Invalid email"}` with status 400.

- [ ] **Step 5: Build the waitlist form component**

Create `components/waitlist-form.tsx`:

```tsx
"use client";

import { useState } from "react";

export function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div id={id} className="flex items-center gap-2 text-sm text-secondary">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-accent"
        >
          <path
            d="M13.5 4.5L6 12L2.5 8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        You&apos;re on the list. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-cream-dark border border-border px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-secondary transition-colors"
        disabled={state === "loading"}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-primary text-cream px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {state === "loading" ? "..." : "Get early access"}
      </button>
      {state === "error" && (
        <p className="text-accent text-xs mt-1 absolute">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add lib/waitlist.ts app/api/waitlist/route.ts components/waitlist-form.tsx .gitignore
git commit -m "feat: add waitlist email capture form and API route"
```

---

## Task 4: Hero Section + Architecture Diagram

**Files:**
- Create: `components/architecture-diagram.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the architecture diagram**

Create `components/architecture-diagram.tsx`:

This is a CSS/HTML diagram (not SVG) for simplicity and Tailwind integration. Uses the warm terminal palette with a metadata pulse animation.

```tsx
export function ArchitectureDiagram() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Your App box */}
      <div className="border border-border bg-cream p-5 rounded-sm">
        <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-3">
          YOUR APPLICATION
        </div>
        <div className="space-y-2 text-sm font-[family-name:var(--font-mono)]">
          <div className="text-secondary">your_agent.py</div>
          <div className="flex items-center gap-2">
            <span className="text-muted">&darr;</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent font-medium">Solwyn(</span>
            <span className="text-primary">OpenAI()</span>
            <span className="text-accent font-medium">)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted">&darr;</span>
          </div>
        </div>
      </div>

      {/* Direct call arrow */}
      <div className="flex items-center gap-3 my-3 ml-6">
        <div className="h-px flex-1 bg-primary" />
        <span className="text-xs font-[family-name:var(--font-mono)] text-primary font-medium whitespace-nowrap">
          direct call &rarr;
        </span>
        <div className="border border-primary bg-cream px-4 py-2.5 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs font-medium">
            LLM Provider
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-muted">
            OpenAI / Anthropic
          </div>
        </div>
      </div>

      {/* Metadata arrow */}
      <div className="flex items-center gap-3 ml-6">
        <div className="h-px flex-1 border-t border-dashed border-muted" />
        <span className="text-xs font-[family-name:var(--font-mono)] text-muted whitespace-nowrap animate-pulse">
          metadata only &rarr;
        </span>
        <div className="border border-dashed border-muted bg-cream px-4 py-2.5 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs text-muted">
            Solwyn Cloud
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-muted/60">
            budget &middot; costs &middot; alerts
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build the hero section in the landing page**

Replace `app/page.tsx`:

```tsx
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { WaitlistForm } from "@/components/waitlist-form";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: copy */}
          <div className="flex-1 max-w-xl">
            <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl leading-[1.1] tracking-tight text-primary">
              The control plane that never sees your prompts.
            </h1>
            <p className="mt-6 text-lg text-secondary leading-relaxed">
              Hard spending caps. Automatic failover. Per-agent cost
              attribution. And we never see your data.
            </p>

            <div className="mt-8">
              <WaitlistForm id="waitlist" />
            </div>

            <div className="mt-4">
              <Link
                href="/pricing"
                className="text-sm text-secondary hover:text-primary transition-colors"
              >
                View pricing &rarr;
              </Link>
            </div>

            {/* Code snippet */}
            <div className="mt-10 bg-cream-dark rounded-sm p-5 font-[family-name:var(--font-mono)] text-sm leading-relaxed">
              <div>
                <span className="text-muted">from</span>{" "}
                <span className="text-primary">solwyn</span>{" "}
                <span className="text-muted">import</span>{" "}
                <span className="text-primary">Solwyn</span>
              </div>
              <div>
                <span className="text-primary">client</span>{" "}
                <span className="text-muted">=</span>{" "}
                <span className="text-primary">Solwyn</span>
                <span className="text-muted">(</span>
                <span className="text-primary">openai.OpenAI</span>
                <span className="text-muted">(),</span>{" "}
                <span className="text-primary">api_key</span>
                <span className="text-muted">=</span>
                <span className="text-accent">&quot;sk-solwyn-...&quot;</span>
                <span className="text-muted">)</span>
              </div>
              <div className="text-muted">
                # That&apos;s it. Your existing code works unchanged.
              </div>
            </div>
          </div>

          {/* Right: architecture diagram */}
          <div className="flex-1 w-full lg:pt-8">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Check: Hero renders with serif headline, code snippet, waitlist form, architecture diagram on right. Mobile stacks vertically.

- [ ] **Step 4: Commit**

```bash
git add components/architecture-diagram.tsx app/page.tsx
git commit -m "feat: add hero section with architecture diagram and code snippet"
```

---

## Task 5: Horror Stories Section

**Files:**
- Create: `components/stat-card.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the stat card component**

Create `components/stat-card.tsx`:

```tsx
export function StatCard({
  stat,
  description,
}: {
  stat: string;
  description: string;
}) {
  return (
    <div className="border border-border bg-cream p-6 flex-1 min-w-[200px]">
      <div className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl text-primary tracking-tight">
        {stat}
      </div>
      <p className="mt-2 text-sm text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Add horror stories section to landing page**

Add below the hero `</section>` closing tag in `app/page.tsx`:

```tsx
      {/* Horror Stories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row gap-4">
          <StatCard
            stat="$47,000"
            description="Recursive LangChain agent ran 11 days unnoticed. No cost ceiling."
          />
          <StatCard
            stat="579 outages"
            description="Anthropic experienced 579 incidents in 12 months. Avg 29/month."
          />
          <StatCard
            stat="$82,314"
            description="Stolen Gemini API key exploited for 48 hours. No spending cap."
          />
        </div>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-primary italic">
          Observability tells you what went wrong. Solwyn prevents it.
        </p>
      </section>
```

- [ ] **Step 3: Verify — 3 stat cards render in a row (stack on mobile), kicker line below**

- [ ] **Step 4: Commit**

```bash
git add components/stat-card.tsx app/page.tsx
git commit -m "feat: add horror stories section with stat cards"
```

---

## Task 6: Feature Pillars (3 Sections)

**Files:**
- Create: `components/feature-pillar.tsx`, `components/budget-gauge.tsx`, `components/circuit-breaker-diagram.tsx`, `components/cost-table.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the feature pillar layout component**

Create `components/feature-pillar.tsx`:

```tsx
export function FeaturePillar({
  headline,
  body,
  visual,
  reverse,
}: {
  headline: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
    >
      <div className="flex-1 max-w-md">
        <h3 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight">
          {headline}
        </h3>
        <p className="mt-4 text-secondary leading-relaxed">{body}</p>
      </div>
      <div className="flex-1 w-full">{visual}</div>
    </div>
  );
}
```

- [ ] **Step 2: Create the budget gauge mockup**

Create `components/budget-gauge.tsx`:

```tsx
export function BudgetGauge() {
  return (
    <div className="border border-border bg-cream p-6 rounded-sm">
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted">
          DAILY BUDGET
        </span>
        <span className="font-[family-name:var(--font-mono)] text-sm text-primary">
          $47.20 / $100.00
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-2 bg-cream-dark rounded-full overflow-hidden relative">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: "47.2%" }}
        />
        {/* 80% threshold marker */}
        <div className="absolute top-0 h-full w-px bg-accent" style={{ left: "80%" }} />
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-[family-name:var(--font-mono)] text-muted">
        <span>$0</span>
        <span className="text-accent">80% alert</span>
        <span>$100</span>
      </div>
      {/* Alert badge */}
      <div className="mt-4 flex items-center gap-2 text-xs text-accent">
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        Budget alert sent at 80%
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the circuit breaker diagram**

Create `components/circuit-breaker-diagram.tsx`:

```tsx
export function CircuitBreakerDiagram() {
  return (
    <div className="border border-border bg-cream p-6 rounded-sm">
      <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-4">
        CIRCUIT BREAKER STATE
      </div>
      {/* States */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="font-[family-name:var(--font-mono)] text-xs">Closed</span>
        </div>
        <span className="text-muted text-xs">&rarr;</span>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-accent rounded-sm bg-accent/5">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-[family-name:var(--font-mono)] text-xs">Open</span>
        </div>
        <span className="text-muted text-xs">&rarr;</span>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="font-[family-name:var(--font-mono)] text-xs">Half-Open</span>
        </div>
        <span className="text-muted text-xs">&rarr;</span>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="font-[family-name:var(--font-mono)] text-xs">Closed</span>
        </div>
      </div>
      {/* Timeline */}
      <div className="mt-5 space-y-2 text-xs font-[family-name:var(--font-mono)] text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-accent" />
          OpenAI 500 errors detected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-accent" />
          Circuit opens &mdash; traffic routes to Anthropic
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-green-600" />
          OpenAI recovers &mdash; circuit closes
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create the cost attribution table**

Create `components/cost-table.tsx`:

```tsx
const MOCK_DATA = [
  { project: "search-agent", model: "gpt-4o", cost: "$142.30", trend: "↑ 23%", trendColor: "text-accent" },
  { project: "chat-bot", model: "claude-sonnet", cost: "$87.50", trend: "↓ 12%", trendColor: "text-green-600" },
  { project: "summarizer", model: "gpt-4o-mini", cost: "$12.80", trend: "→ flat", trendColor: "text-muted" },
];

export function CostTable() {
  return (
    <div className="border border-border bg-cream rounded-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              PROJECT
            </th>
            <th className="text-left p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              MODEL
            </th>
            <th className="text-right p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              7D COST
            </th>
            <th className="text-right p-4 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
              TREND
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.map((row) => (
            <tr key={row.project} className="border-b border-border last:border-0">
              <td className="p-4 font-[family-name:var(--font-mono)] text-primary">{row.project}</td>
              <td className="p-4 font-[family-name:var(--font-mono)] text-secondary">{row.model}</td>
              <td className="p-4 font-[family-name:var(--font-mono)] text-primary text-right">{row.cost}</td>
              <td className={`p-4 font-[family-name:var(--font-mono)] text-right ${row.trendColor}`}>{row.trend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 5: Add all three feature pillars to landing page**

Add to `app/page.tsx` after the horror stories section:

```tsx
      {/* Feature Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        <FeaturePillar
          headline="Stop the bleeding before it starts."
          body="Set daily, weekly, or monthly budgets per project. Alert-only by default — your agents keep running and you get notified. Opt into hard deny when you're ready. The SDK enforces caps locally, even if Solwyn's cloud is unreachable."
          visual={<BudgetGauge />}
        />
        <FeaturePillar
          headline="Your users notice nothing."
          body="When a provider fails, the SDK automatically routes to your configured fallback — all client-side, no server involved. The circuit breaker tracks health locally. No manual intervention. No downtime."
          visual={<CircuitBreakerDiagram />}
          reverse
        />
        <FeaturePillar
          headline="Know which agent is burning the budget."
          body="Per-project cost breakdown by model and time period. Real-time dashboard with current spend vs. budget. CSV export. API endpoint for custom dashboards. All powered by metadata — we never see your prompts."
          visual={<CostTable />}
        />
      </section>
```

Remember to add the imports at the top of `app/page.tsx`.

- [ ] **Step 6: Verify — three feature sections alternate left/right, visuals render correctly**

- [ ] **Step 7: Commit**

```bash
git add components/feature-pillar.tsx components/budget-gauge.tsx components/circuit-breaker-diagram.tsx components/cost-table.tsx app/page.tsx
git commit -m "feat: add three feature pillar sections with product-preview visuals"
```

---

## Task 7: Privacy Guarantee + Comparison + How It Works

**Files:**
- Create: `components/privacy-comparison.tsx`, `components/competitor-table.tsx`, `components/how-it-works.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create privacy comparison component**

Create `components/privacy-comparison.tsx`:

```tsx
const RECEIVES = [
  "Token count (input/output)",
  "Model name",
  "Calculated cost",
  "Latency (ms)",
  "Success/failure status",
  "Project ID",
];

const NEVER_SEES = [
  "Prompts",
  "Responses",
  "System messages",
  "Function calls",
  "Conversation history",
  "Any content whatsoever",
];

export function PrivacyComparison() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight">
        What Solwyn sees vs. what Solwyn never sees.
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border bg-cream p-6 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-4">
            WHAT WE RECEIVE
          </div>
          <ul className="space-y-2">
            {RECEIVES.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-secondary">
                <span className="text-green-600">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-accent/30 bg-cream p-6 rounded-sm">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent mb-4">
            WHAT NEVER LEAVES YOUR ENVIRONMENT
          </div>
          <ul className="space-y-2">
            {NEVER_SEES.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-primary font-medium">
                <span className="text-accent">&#10005;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-sm text-secondary italic">
        This is architecture, not policy. The SDK is a local wrapper — your LLM
        calls go directly from your app to the provider. Solwyn is never in the
        request path.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create competitor comparison table**

Create `components/competitor-table.tsx`:

```tsx
const FEATURES = [
  { name: "Hard cost caps", solwyn: "Yes", portkey: "No", litellm: "Basic", braintrust: "No", cloudflare: "No" },
  { name: "Circuit breaker", solwyn: "Yes", portkey: "Yes", litellm: "No", braintrust: "No", cloudflare: "No" },
  { name: "Cost attribution", solwyn: "Yes", portkey: "Basic", litellm: "No", braintrust: "Yes", cloudflare: "No" },
  { name: "Automatic failover", solwyn: "Yes", portkey: "Yes", litellm: "Basic", braintrust: "No", cloudflare: "No" },
  { name: "Sees your prompts?", solwyn: "NEVER", portkey: "Yes", litellm: "Yes", braintrust: "Yes", cloudflare: "Yes" },
] as const;

export function CompetitorTable() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight mb-8">
        How Solwyn compares.
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-primary">
              <th className="text-left p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                FEATURE
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-primary font-bold">
                SOLWYN
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                PORTKEY
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                LITELLM
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                BRAINTRUST
              </th>
              <th className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted font-normal">
                CLOUDFLARE AI GW
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((f) => (
              <tr key={f.name} className="border-b border-border">
                <td className="p-3 text-secondary">{f.name}</td>
                <td className={`p-3 text-center font-medium ${f.solwyn === "NEVER" ? "text-accent font-bold" : "text-primary"}`}>
                  {f.solwyn}
                </td>
                <td className="p-3 text-center text-muted">{f.portkey}</td>
                <td className="p-3 text-center text-muted">{f.litellm}</td>
                <td className="p-3 text-center text-muted">{f.braintrust}</td>
                <td className="p-3 text-center text-muted">{f.cloudflare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the how-it-works component**

Create `components/how-it-works.tsx`:

```tsx
const STEPS = [
  {
    number: "1",
    title: "Install",
    code: "pip install solwyn",
  },
  {
    number: "2",
    title: "Wrap",
    code: 'client = Solwyn(openai.OpenAI())',
  },
  {
    number: "3",
    title: "Configure",
    code: "Set a $100/day budget on the dashboard",
  },
];

export function HowItWorks() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-primary tracking-tight mb-8">
        Three lines. Five minutes.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <div key={step.number} className="border border-border bg-cream p-6 rounded-sm">
            <div className="font-[family-name:var(--font-serif)] text-4xl text-muted/40 mb-3">
              {step.number}
            </div>
            <div className="font-medium text-primary mb-2">{step.title}</div>
            <div className="font-[family-name:var(--font-mono)] text-xs text-secondary bg-cream-dark p-3 rounded-sm">
              {step.code}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-secondary">
        Under 5 minutes. No infrastructure changes. No proxy. No new
        dependencies.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Add all three sections to landing page**

Add to `app/page.tsx` after the feature pillars section:

```tsx
      {/* Privacy Guarantee */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <PrivacyComparison />
      </section>

      {/* Comparison Strip */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <CompetitorTable />
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <HowItWorks />
      </section>
```

Add the imports at the top.

- [ ] **Step 5: Add the bottom CTA section**

Add to `app/page.tsx`:

```tsx
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
          <WaitlistForm />
        </div>
      </section>
```

- [ ] **Step 6: Verify — full landing page scrolls through all 7 sections, comparison table scrolls on mobile**

- [ ] **Step 7: Commit**

```bash
git add components/privacy-comparison.tsx components/competitor-table.tsx components/how-it-works.tsx app/page.tsx
git commit -m "feat: add privacy guarantee, competitor comparison, how-it-works, and bottom CTA"
```

---

## Task 8: Pricing Page

**Files:**
- Create: `app/pricing/page.tsx`, `components/pricing-card.tsx`, `components/pricing-comparison.tsx`, `components/faq.tsx`

- [ ] **Step 1: Create the pricing card component**

Create `components/pricing-card.tsx`:

```tsx
export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted,
  badge,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`border p-6 rounded-sm relative flex flex-col ${
        highlighted
          ? "border-accent border-2"
          : "border-border"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-4 bg-accent text-cream text-[10px] font-[family-name:var(--font-mono)] tracking-wider px-2 py-0.5">
          {badge}
        </div>
      )}
      <div className="mb-4">
        <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted mb-2">
          {name}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-serif)] text-3xl text-primary">
            {price}
          </span>
          {period && <span className="text-sm text-muted">{period}</span>}
        </div>
        <p className="mt-2 text-sm text-secondary">{description}</p>
      </div>
      <ul className="space-y-2 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-secondary">
            <span className="text-muted mt-0.5">&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#waitlist-pricing"
        className={`mt-6 block text-center text-sm py-2.5 transition-colors ${
          highlighted
            ? "bg-primary text-cream hover:bg-primary/90"
            : "border border-border text-primary hover:bg-cream-dark"
        }`}
      >
        Join waitlist
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Create the pricing feature comparison matrix**

Create `components/pricing-comparison.tsx`:

```tsx
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
      { feature: "Cost attribution", values: ["Project", "Project + model", "Project + model + team", "Full"] },
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
      { feature: "Cost history", values: ["7 days", "30 days", "90 days", "1 year"] },
      { feature: "Audit log", values: ["—", "—", "30 days", "1 year"] },
      { feature: "Tamper-evident audit", values: ["—", "—", "—", "1 year"] },
    ],
  },
  {
    name: "Support",
    rows: [
      { feature: "Support", values: ["Community", "Email", "Priority email", "Priority + SLA"] },
    ],
  },
  {
    name: "Privacy",
    rows: [
      { feature: "Prompts never leave your environment", values: ["✓", "✓", "✓", "✓"] },
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
        <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
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
                  <th key={tier} className="text-center p-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-primary font-bold">
                    {tier.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTIONS.map((section) => (
                <Fragment key={section.name}>
                  <tr>
                    <td colSpan={5} className="pt-4 pb-1 px-3 font-[family-name:var(--font-mono)] text-xs tracking-wider text-muted">
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
```

- [ ] **Step 3: Create the FAQ accordion**

Create `components/faq.tsx`:

```tsx
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
              <span className="text-sm font-medium text-primary">
                {faq.q}
              </span>
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
```

- [ ] **Step 4: Build the full pricing page**

Create `app/pricing/page.tsx`:

```tsx
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
```

- [ ] **Step 5: Verify pricing page at `/pricing`**

Check: 4 tier cards, Solo highlighted with "Most Popular" badge, enterprise strip, overage section, expandable comparison table, FAQ accordion, bottom CTA.

- [ ] **Step 6: Commit**

```bash
git add app/pricing/page.tsx components/pricing-card.tsx components/pricing-comparison.tsx components/faq.tsx
git commit -m "feat: add pricing page with tier cards, comparison matrix, FAQ, and waitlist CTA"
```

---

## Task 9: Visual Polish + Responsive

**Files:**
- Modify: Multiple component files as needed

- [ ] **Step 1: Add section dividers for visual rhythm**

Add subtle horizontal rules between major landing page sections. In `app/page.tsx`, add between sections:

```tsx
<div className="max-w-6xl mx-auto px-6">
  <hr className="border-border" />
</div>
```

- [ ] **Step 2: Verify mobile responsiveness**

Open dev tools, test at 375px (mobile) and 768px (tablet) widths:

Checklist:
- [ ] Nav hamburger works and closes on link click
- [ ] Hero stacks vertically, headline is readable
- [ ] Stat cards stack to 1 column on mobile
- [ ] Feature pillars stack visual above text
- [ ] Privacy columns stack vertically
- [ ] Competitor table scrolls horizontally
- [ ] Pricing cards single column on mobile, 2x2 on tablet
- [ ] FAQ accordion full-width
- [ ] All text is readable without horizontal scroll

- [ ] **Step 3: Add scroll-shadow to nav on scroll**

In `components/nav.tsx`, add scroll detection:

```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

Add to the `<nav>` className: `${scrolled ? "shadow-sm" : ""}`

Add `useEffect` to the import from React.

- [ ] **Step 4: Test full user flow**

1. Land on `/` — hero renders, form visible
2. Submit email in waitlist form — success state shows
3. Navigate to `/pricing` via nav link or "View pricing →"
4. Pricing page loads with all sections
5. FAQ accordion opens/closes
6. Feature comparison expands/collapses
7. Mobile hamburger menu opens, links work, closes

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: add visual polish, section dividers, nav scroll shadow, responsive fixes"
```

---

## Task 10: Build Verification + Deploy Prep

**Files:**
- Modify: `next.config.ts` (if needed)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Check for any TypeScript or ESLint warnings.

- [ ] **Step 2: Test production build locally**

```bash
npm run start -- -p 3001
```

Verify both pages render correctly in production mode.

- [ ] **Step 3: Verify `.gitignore` includes all necessary entries**

Ensure these are in `.gitignore`:
```
.waitlist.json
.next/
node_modules/
```

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "chore: production build verification and deploy prep"
```

- [ ] **Step 5: Summary**

At this point the site is ready for:
- `vercel deploy` for preview deployment
- `vercel --prod` for production deployment to solwyn.ai

The MPI site's "Learn More →" CTA should point to the deployed solwyn.ai URL.

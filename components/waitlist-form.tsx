"use client";

import { useState } from "react";

export function WaitlistForm({ id, dark }: { id?: string; dark?: boolean }) {
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
      <div
        id={id}
        className={`text-sm space-y-1 ${dark ? "text-dark-muted" : "text-secondary"}`}
      >
        <div className="flex items-center gap-2">
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
          You&apos;re in. We&apos;ll email you when the SDK is ready.
        </div>
        <p className={`text-xs ${dark ? "text-dark-muted" : "text-muted"}`}>
          Early access members lock in current pricing permanently.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="flex gap-2 max-w-md relative">
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 border px-4 py-2.5 text-sm focus:outline-none transition-colors ${
          dark
            ? "bg-dark-surface border-white/10 text-dark-text placeholder:text-dark-muted focus:border-white/30"
            : "bg-cream-dark border-border text-primary placeholder:text-muted focus:border-secondary"
        }`}
        disabled={state === "loading"}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className={`px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 whitespace-nowrap ${
          dark
            ? "bg-cream text-primary hover:bg-cream/90"
            : "bg-primary text-cream hover:bg-primary/90"
        }`}
      >
        {state === "loading" ? "..." : "Protect my AI spend"}
      </button>
      {state === "error" && (
        <p className="text-accent text-xs mt-1 absolute -bottom-6 left-0">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}

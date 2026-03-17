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
    <form id={id} onSubmit={handleSubmit} className="flex gap-2 max-w-md relative">
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
        <p className="text-accent text-xs mt-1 absolute -bottom-6 left-0">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}

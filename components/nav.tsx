"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border transition-shadow ${scrolled ? "shadow-sm" : ""}`}
    >
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

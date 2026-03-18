import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>&copy; 2026 Solwyn, Inc.</span>
        <div className="flex gap-6">
          <Link
            href="/pricing"
            className="hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <span className="cursor-default" title="Coming soon">
            Docs
          </span>
          <a
            href="https://github.com/solwyn-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms
          </a>
        </div>
        <span className="text-xs">
          Your prompts never leave your environment.
        </span>
      </div>
    </footer>
  );
}

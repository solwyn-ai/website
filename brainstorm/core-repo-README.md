# Solwyn

**AI Agent Control Plane — hard spending caps, automatic failover, per-agent cost attribution.**

Every other tool in this category reads your prompts. Solwyn does not.

The SDK wraps your LLM client locally. Calls go direct to the provider. Only metadata (token counts, costs, latency) reaches Solwyn's cloud. This is architecture, not policy.

## How It Works

```python
from solwyn import Solwyn
import openai

client = Solwyn(openai.OpenAI(), api_key="sk-solwyn-...")

# That's it. Your existing code works unchanged.
# Solwyn enforces budgets, tracks costs, and handles failover — locally.
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)
```

## What Solwyn Does

- **Hard spending caps** — daily/weekly/monthly budgets with alert-only (default) or hard-deny modes
- **Circuit breaker & failover** — automatic provider failover when OpenAI/Anthropic go down, fully client-side
- **Cost attribution** — per-project cost breakdown by model and time period
- **Privacy by architecture** — the SDK never captures, logs, or transmits prompts or responses

## Architecture

```
Your App + Solwyn SDK                    Solwyn Cloud
┌──────────────────────┐                ┌─────────────────┐
│  your code           │                │  Budget state    │
│    ↓                 │  metadata only │  Cost dashboard  │
│  Solwyn(OpenAI())    │ ──────────────→│  Alerts          │
│    ↓                 │                └─────────────────┘
│  LLM provider ←─────│── direct call
└──────────────────────┘
```

The SDK sits in your process. LLM calls go directly from your app to the provider. Solwyn's cloud only receives metadata — never prompts, never responses.

## Repo Structure

```
solwyn/
├── sdks/python/          # pip install solwyn (Python SDK)
├── api/                  # Solwyn Cloud API (FastAPI)
├── shared/               # Contracts between SDK ↔ API
├── dashboard/            # React frontend (minimal V1)
└── docs/plans/           # Architecture and implementation plans
```

This is a [UV workspace](https://docs.astral.sh/uv/concepts/workspaces/) monorepo with three Python packages:

| Package | Name | Description |
|---------|------|-------------|
| `sdks/python` | `solwyn` | Python SDK — wraps `openai` and `anthropic` clients |
| `api` | `solwyn-api` | API — budget aggregation, metadata ingestion, notifications |
| `shared` | `solwyn-shared` | Wire-format models and types shared between SDK and API |

### Import Boundaries

```
shared → (imported by) → sdk, api
sdk ✗ api       # SDK never imports cloud API code
api ✗ sdk       # Cloud API never imports SDK code
```

## Key Design Decisions

- **Wrapper, not proxy** — LLM calls go direct to provider. Solwyn is never in the request path.
- **Fail-open by default** — if Solwyn's cloud is unreachable, your agents keep running (alert-only mode). Hard-deny mode enforces locally using last-known budget limits.
- **Alert-only default** — budget caps default to alerting, not blocking. Hard deny is opt-in.
- **Dual sync/async** — `Solwyn` (sync) and `AsyncSolwyn` (async) share a sans-I/O base class. No thread-wrapping overhead.
- **Zero new dependencies** — `httpx` is already required by both `openai` and `anthropic` SDKs.

## Status

This project is in early development. See `docs/plans/` for architecture design, extraction plan, and implementation roadmap.

## License

Proprietary. All rights reserved.

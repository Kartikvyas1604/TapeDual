# TapeDuel

**60-second sealed-state tokenized stock vs. USDC trading arena on MagicBlock Private Ephemeral Rollups.**

Early conviction and live volatility warp your payout multiplier — with zero house LVR risk and atomic L1 settlement.

Built for Solana Blitz V10 — Entertainment Finance.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** + shadcn/ui (Base UI / Nova preset)
- **lucide-react** icons
- **Geist Sans / Geist Mono** via `next/font`
- Solana Devnet + MagicBlock PER / ER / VRF + Pyth Lazer (Anchor program, separate Rust workspace)

## Brand

Midnight Signal — `oklch`-based dark-first palette (technical · serious · trustworthy).
Tokens live in `app/globals.css`; full spec in `brand.md`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Turbopack)
npm run lint
```

## Arena flow

1. Connect a wallet (devnet USDC).
2. Enable 1-click Session Keys (gasless ER tx, <50 ms).
3. Pick a bucket — DOWN / FLAT / UP — and stake USDC ($1–$500).
4. Position is sealed inside the MagicBlock PER until round close (60 s).
5. At round close, Pyth Lazer locks the settlement price, VRF rolls the Golden Ticket bonus, and `MagicIntentBundleBuilder` settles atomically to L1.

## Project structure

```
app/
  page.tsx          # single-screen Arena
  globals.css       # Midnight Signal tokens (+ shadcn base)
  layout.tsx        # Geist fonts + TooltipProvider
components/
  arena/
    top-bar.tsx         # live ticker, volatility, countdown
    wallet-bar.tsx      # USDC balance, connect, session keys
    countdown-ring.tsx  # 60s round ring
    price-chart.tsx     # live SVG price chart (+ skeleton)
    conviction-buttons.tsx  # DOWN / FLAT / UP entry
    judge-panel.tsx     # proof-first verification panel
    enter-bucket-dialog.tsx # stake + confirm modal
    states.tsx          # loading / empty / error states
lib/
  use-arena.ts          # mock live-data feed + position state
```

## Notes

- The frontend uses a mock live-data feed (Pyth Lazer equivalent) for the demo loop. Production wires the Anchor program via adapters in `config/addresses.ts`.
- UI copy avoids banned wording ("guaranteed profit", "risk-free", "gambling", etc.) per `agent/Agent.md`.

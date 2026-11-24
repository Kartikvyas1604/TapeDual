# Brand — TapeDuel

**Status:** applied

TapeDuel is a 60-second sealed-state tokenized stock vs. USDC trading arena on MagicBlock Private Ephemeral Rollups where early conviction and live volatility warp your payout multiplier — with zero house LVR risk and atomic L1 settlement.

## Palette — Midnight Signal

**Vibe:** A terminal for money. Cold, sharp, never frivolous.
**Mood:** technical · serious · trustworthy
**Category:** defi · infra · data

### Dark mode (primary)

| Token | OKLCH | Hex |
|---|---|---|
| `--background` | `oklch(0.14 0.02 265)` | `#0A0E1A` |
| `--foreground` | `oklch(0.96 0.01 265)` | `#F1F3F8` |
| `--card` | `oklch(0.19 0.02 265)` | `#141A29` |
| `--primary` | `oklch(0.72 0.17 250)` | `#5B8DEF` |
| `--primary-foreground` | `oklch(0.10 0 0)` | `#000000` |
| `--secondary` | `oklch(0.23 0.03 265)` | `#1D253A` |
| `--muted` | `oklch(0.21 0.02 265)` | `#192031` |
| `--muted-foreground` | `oklch(0.66 0.015 265)` | `#9AA3B2` |
| `--accent` | `oklch(0.25 0.03 250)` | `#2B3654` |
| `--border` | `oklch(0.27 0.03 265)` | `#2A3248` |
| `--input` | `oklch(0.19 0.02 265)` | `#171E2D` |
| `--ring` | `oklch(0.72 0.17 250)` | `#5B8DEF` |
| `--destructive` | `oklch(0.65 0.22 25)` | `#D14A4A` |
| `--radius` | `0.5rem` | — |

### Light mode

| Token | OKLCH | Hex |
|---|---|---|
| `--background` | `oklch(0.98 0.01 265)` | `#F5F3FA` |
| `--foreground` | `oklch(0.18 0.02 265)` | `#1E2131` |
| `--card` | `oklch(1 0 0)` | `#FFFFFF` |
| `--primary` | `oklch(0.52 0.17 250)` | `#3A6BD8` |
| `--primary-foreground` | `oklch(0.98 0 0)` | `#FFFFFF` |
| `--secondary` | `oklch(0.94 0.01 265)` | `#ECEBEF` |
| `--muted` | `oklch(0.95 0.01 265)` | `#EFEEF2` |
| `--muted-foreground` | `oklch(0.48 0.015 265)` | `#6A6F7C` |
| `--accent` | `oklch(0.93 0.02 250)` | `#E4E6F2` |
| `--border` | `oklch(0.90 0.01 265)` | `#D9D7DD` |
| `--input` | `oklch(0.96 0.01 265)` | `#F3F1F7` |
| `--ring` | `oklch(0.52 0.17 250)` | `#3A6BD8` |

## Typography

- **Sans (UI):** Geist Sans — via `next/font/google`, variable `--font-geist-sans`
- **Mono (numbers/code):** Geist Mono — via `next/font/google`, variable `--font-geist-mono`
- Numbers that change use `font-mono tabular-nums` so digits don't jitter.

## Tone / Voice

- Concise, active voice, specific. "Enter conviction" not "Click here to enter your conviction bucket."
- No banned wording: never "guaranteed profit," "risk-free," "tamper-proof," "100% decentralized," "gambling," or "TBD" in UI copy.
- Legal framing: "Timed skill-and-timing market-prediction arena with verifiable onchain odds."

## Usage dos and don'ts

- **Do** use shadcn tokens (`bg-background`, `text-foreground`, `border-border`, `bg-primary text-primary-foreground`).
- **Do** keep hit targets ≥ 40×40 px on touch.
- **Do** respect `prefers-reduced-motion`.
- **Don't** inline hex values or magic-number spacing (`p-[13px]`).
- **Don't** hardcode `bg-white` or `text-black` — dark mode must render correctly.
- **Don't** use `<div onClick>` — real `<button>` / `<a>` everywhere.

## Files

- `app/globals.css` — applied `:root` and `.dark` token blocks (backup at `app/globals.css.bak`)
- `app/layout.tsx` — Geist Sans + Geist Mono wired via `next/font/google`

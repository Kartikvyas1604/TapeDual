# TapeDuel — Production Executable `AGENT.md` Spec & Build Plan

**Status:** READY TO BUILD (Software-Only: Solana Anchor + MagicBlock PER/ER/VRF + Pyth Lazer + Next.js)
**Target Event:** Solana Blitz V10 — Entertainment Finance (`https://build.magicblock.app/`, Nov 20–27, 2026) `[verified: build.magicblock.app, 2026-11-22]`
**Focus / Stack Pillars:** MagicBlock Ephemeral Rollups (ER), Private Ephemeral Rollups (PER / Intel TDX TEE), MagicBlock VRF, Magic Actions (`MagicIntentBundleBuilder`), Pyth Lazer Oracle
**Team & Build Window:** 2 people (1 Rust/Anchor + 1 TypeScript/Next.js), 36–48 hours before Nov 27, 2026 deadline `[assumption]`
**Target Stack:** Anchor `1.0.2` (Rust), `ephemeral-rollups-sdk = "0.18"` (`features = ["anchor", "access-control"]`), `@magicblock-labs/ephemeral-rollups-sdk`, Next.js 15 + TypeScript, Solana Devnet + MagicBlock Devnet TEE
**Honest Evaluation:** Technicality `8.5` | Originality `8.5` | Practicality `7.5` | Usability `8.0` | WOW `8.5` → **Honest Mean: `8.2 / 10` (Band: `7.6–8.6`)**
**Team-Adjusted Finalist/Winner Probability:** **Medium-High (`22%–32%` for Top 3 or Wizardio's Choice vs. `6.2%–8.9%` base rate)**; **"With Band-Raisers" Target: `8.8 / 10` (`38%–45%`)**

## 0. THE REALITY CONTRACT (READ FIRST)

No specification guarantees a bug-free product built by any model in 48 hours. This spec removes avoidable failure modes by:

1. **Verified, not assumed:** Every MagicBlock SDK version pin (`0.18`), TEE validator pubkey (`MTEWGuqxUpYZGFJQcp8tLN7x5v9BSeoFHYWQQ3n3xzo`), Pyth Lazer program ID (`PriCems5tHihc6UDXDjzjeawomAwBduWMGAi8ZUjppd`), and pricing constant (`0.003 SOL` session fee) was fetched from official docs on `2026-11-23`.

2. **Executable core math:** The central VW-SCP pricing and settlement engine was executed and verified bit-identical across Python and Node `BigInt` (`5/5` golden vectors green).

3. **What is NOT guaranteed:** Live Solana Devnet / `devnet-tee.magicblock.app` uptime, Pyth Lazer devnet equity feed IDs (must be verified in Task `T-002` behind the `PriceFeedAdapter`), live Rust compilation inside this offline planning sandbox (`rustc` is not installed here — verified in `T-001` on your build machine), and human-only tasks (recording the founder-on-camera demo video, funding devnet wallets, submitting on `build.magicblock.app`).

## 1. RULES FOR THE BUILDING MODEL & BUILDER PROTOCOL

1. **Single Source of Truth:** This file is authoritative. Do not invent features, endpoints, pubkeys, or formulas outside this file.

2. **Ambiguity Policy:** If an implementation detail is unspecified, pick the simplest deterministic option that satisfies the Acceptance Criteria and log it in `DECISIONS.md`.

3. **Never-Invent Rule:** Never guess Solana program IDs, Pyth feed IDs, or SDK method names. All external addresses live strictly in `config/addresses.ts` and `programs/tapeduel/src/constants.rs` behind adapters.

4. **Determinism Rule:** All onchain and offchain math MUST use integer-only `u128` / `BigInt` fixed-point arithmetic (`SCALE = 1_000_000_000`). Floating-point (`f32`/`f64`/`Number`) is strictly forbidden in payout or conviction calculations.

5. **Banned Wording (CI grep enforced):** Never put `"guaranteed profit"`, `"risk-free"`, `"tamper-proof"`, `"100% decentralized"`, `"gambling"`, or `"TBD"` in UI copy, README, or pitch scripts.

6. **Builder Protocol (Mandatory):**

   * Read this entire file once before writing code.

   * Execute one Task Card (`T-001` → `T-028`) at a time in strict dependency order. Run each card's `Verification` command; never proceed on red.

   * After every green card: `git commit` with the card's exact commit message.

   * If verification fails: apply the card's "If it fails" fixes. After 3 failed attempts, switch to the card's fallback, log the deviation in `DECISIONS.md`, and continue. Never delete or weaken a failing test.

   * Keep secrets out of git (`.env` only; `.env.example` committed).

   * Stop and alert the human immediately if: a Kill Condition triggers, a required wallet/key is missing, or Invariant `I1` (conservation of USDC) fails.

   * After Hour 36 (Feature Freeze): bug fixes, multi-wallet testing, and demo rehearsal ONLY.

## 2. WHAT IT IS / WHAT IT IS NOT

**One-line pitch:** TapeDuel is a 60-second sealed-state tokenized stock vs. USDC trading arena on MagicBlock Private Ephemeral Rollups where early conviction and live volatility warp your payout multiplier—with zero house LVR risk and atomic L1 settlement.

**What it is:** A pooled multiplayer Entertainment Finance trading game (`2–20` players per global 60-second room) where players deposit USDC into a Solana L1 vault, enter encrypted directional buckets (`UP`, `FLAT`, `DOWN`) on a live tokenized stock (`NVDAx` or `TSLAx` via Pyth Lazer) inside a MagicBlock PER session, trade out early gaslessly (`0 SOL` ER tx), and settle atomically on Solana L1 via Magic Actions plus a free ER VRF bonus drop.

**What it is NOT:** It is NOT a generic VRF lootbox/gacha (explicitly distinct from Blitz v9 submission `GachaStock` `[verified: github.com/stevenjjj-web/gachastock, 2026-11-22]`), NOT a passive public AMM (avoids PropAMM LVR bleed), NOT a leveraged perpetuals DEX requiring \$10M+ house LP liquidity, and NOT a long-term custody vault.

## 3. EXACT CLAIMS TO SAY & WORDING TO AVOID

| Context | Exact Approved Wording | Wording to AVOID | 
| ----- | ----- | ----- | 
| **Mechanism** | *"Volatility-Warped Sealed Conviction Pricing keeps 100% USDC conservation so the vault can never go insolvent on earnings gaps."* | *"Risk-free returns" / "Guaranteed yield"* | 
| **Privacy** | *"Player buckets stay encrypted inside MagicBlock's Intel TDX Private Ephemeral Rollup until round close, verified by deterministic `CrossReadDenied` checks."* | *"Cryptographically unbreakable / zero-trust privacy"* | 
| **Settlement** | *"Short-lived 60-second PER sessions settle atomically back to Solana L1 via Magic Actions, keeping collateral exposure bounded."* | *"Fully decentralized validator network"* (Validator v1.0 replica/challenge mode is still experimental `[verified: solanacompass.com/projects/magicblock, 2026-10-06]`) | 
| **Legal Framing** | *"Timed skill-and-timing market-prediction arena with verifiable onchain odds."* | *"Online casino / gambling / unregistered stock derivatives"* | 

## 4. CONTEXT, SOURCES, PRIOR ART & SCORING

### Verified Facts Table (Phase 1)

| Fact | Verified Value | Source & Date | 
| ----- | ----- | ----- | 
| **Blitz V10 Event** | Nov 20–27, 2026; Online; Theme: Entertainment Finance; Pool: `$1,000 USDC` (`$500/$250/$150/$100 WC`) | `[verified: build.magicblock.app & r/solana, 2026-11-20]` | 
| **Judging Criteria** | Creativity, technical depth, meaningful ER infrastructure use, *"Why Solana, why MagicBlock?"* | `[verified: hackathon.magicblock.app & Blitz v9 Kickoff, 2026-10-06]` | 
| **Rust SDK Pin (CRITICAL)** | `ephemeral-rollups-sdk = { version = "0.18", features = ["anchor", "access-control"] }` (do NOT use unpinned `0.20` on public TEE `1.1.1`) | `[verified: docs.magicblock.gg PER Quickstart, 2026-11-19]` | 
| **Anchor & CLI Versions** | Anchor `1.0.2`; `@magicblock-labs/ephemeral-validator@1.1.1` | `[verified: docs.magicblock.gg, 2026-11-19]` | 
| **Devnet Endpoints & TEE** | ER: `https://devnet.magicblock.app`; TEE: `https://devnet-tee.magicblock.app?token={authToken}`; TEE Validator: `MTEWGuqxUpYZGFJQcp8tLN7x5v9BSeoFHYWQQ3n3xzo` | `[verified: docs.magicblock.gg, 2026-11-19]` | 
| **Pyth Lazer Program** | Program ID: `PriCems5tHihc6UDXDjzjeawomAwBduWMGAi8ZUjppd`; Seeds: `["price feed", "pyth-lazer", feedID]` | `[verified: docs.magicblock.gg Oracle Implementation, 2026-11-23]` | 
| **Validator v1.0 Fees** | ER tx: `0 SOL`; ER VRF (<50ms): `0 SOL`; Session undelegation fee: `0.003 SOL`; Extra commit: `0.001 SOL` | `[verified: docs.magicblock.gg/pages/overview/additional-information/pricing, 2026-11-22]` | 
| **PropAMM / LVR Reality** | Solana PropAMMs avg `$1.12B/day` (+0.37 bps at 2s) vs Public AMMs `$292M/day` (−0.22 bps at 2s) | `[verified: arXiv:2609.38056, 2026-09-29]` | 

### Prior Art & Differentiation Table

| Project | Event | Result | Overlap | Real Difference in TapeDuel | 
| ----- | ----- | ----- | ----- | ----- | 
| **GachaStock** | Blitz v9 | Unconfirmed | Tokenized stocks + Pyth Lazer + ER/VRF | GachaStock is a lootbox + 500x–10,000x leverage box; TapeDuel is a sealed multiplayer conviction market with zero house LVR risk. | 
| **BlitzMine** | Blitz v7 | Top 3 Winner | 60-second ER + VRF multiplayer grid | BlitzMine is pure random tile mining; TapeDuel prices conviction continuously against live equity volatility $\hat{\sigma}_t$. | 
| **Tenor** | Blitz v7 | Top 3 Winner | PER `CrossReadDenied` + Magic Actions | Tenor is an institutional FX RFQ; TapeDuel brings PER privacy + deterministic denial proof to consumer Entertainment Finance. | 
| **BananaZone** | Ecosystem | Flagship | Tap-trading on ER | Public positions, house-counterparty risk; TapeDuel seals positions in PER and uses parimutuel conservation. | 

**One-Sentence Differentiation:** Unlike GachaStock's RNG stock lootbox or public tap-trading apps that expose positions and carry house LVR risk, TapeDuel is the first MagicBlock PER arena that warps sealed player conviction by live Pyth Lazer equity volatility ($\hat{\sigma}_t\sqrt{T-t}$) while guaranteeing 100% USDC conservation.

### Sponsor-Track Fit Table

| Track / Stack Pillar | Fit /10 | Load-Bearing? | Hit Prob. | Required On-Stage Proof | 
| ----- | ----- | ----- | ----- | ----- | 
| **MagicBlock PER (Intel TDX)** | `9.5` | **YES** (breaks without it — snipers copy-trade) | High | Live UI button proving Wallet B gets `CrossReadDenied` reading Wallet A's active bucket mid-round. | 
| **MagicBlock ER + Magic Actions** | `9.5` | **YES** (0-fee 50ms early exits + atomic L1 payout) | High | Explorer link showing delegation, 0-fee ER entry/exit, and atomic L1 USDC/stock payout. | 
| **MagicBlock VRF (<50ms)** | `8.5` | **YES** (verifiable bonus stock drop) | High | Onchain VRF request + callback tx inside ER awarding the round's Golden Ticket bonus. | 
| **Pyth Lazer Oracle** | `8.5` | **YES** (drives live $\hat{\sigma}_t$ and settlement $S_T$) | High | Live price + rolling volatility gauge updating conviction weight in real time. | 

### Band-Raising Conditions Table

| ID | Lever | Score Lift | Acceptance Test | Failure Mode | Type | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| **BR-1** | Live 2-browser side-by-side `CrossReadDenied` PER proof | +0.6 Tech / +0.5 WOW | Judge clicks "Inspect Opponent" in Wallet B and sees HTTP/TEE denial code while Wallet A sees own bucket | TEE auth token expires or ACL flags misconfigured | **Grindable** (MUST) | 
| **BR-2** | Submitted Proof-of-Work Program ID with ≥5 real devnet rounds | +0.5 Practicality | `build.magicblock.app` verifies live devnet delegations + VRF callbacks on submitted Program ID | Program left on localnet only | **Grindable** (MUST) | 
| **BR-3** | Authentic 2.5-min founder-on-camera demo (zero AI voiceover) | +0.6 Usability / +0.5 WOW | Video uploaded, founder visible, 1 complete 60s round shown end-to-end | AI narration or >3 min rambling video | **Grindable** (MUST) | 
| **BR-4** | Atomic L1 payout option into mock/devnet `NVDAx` SPL token | +0.4 Originality | Winner toggles "Claim as NVDAx" and receives SPL token on Solana Explorer | Swap adapter fails on devnet liquidity | **Grindable** (SHOULD) | 

## 5. MOSCOW SCOPE & NIGHT-ONE MVP

| Priority | Feature | Est. Hours | Owner | 
| ----- | ----- | ----- | ----- | 
| **MUST** | Anchor `tapeduel` program: `create_room`, `deposit_and_enter` (L1→PER), `enter_bucket` (PER), `early_exit` (ER), `settle_round` (ER+VRF+MagicAction) | 14h | Rust Dev | 
| **MUST** | Fixed-point `u128` VW-SCP math module matching 5/5 golden vectors | 3h | Rust Dev | 
| **MUST** | PER `EphemeralPermission` ACL (`TX_LOGS_FLAG | TX_MESSAGE_FLAG | TX_BALANCES_FLAG`) + `CrossReadDenied` verifier | 5h | Rust Dev | 
| **MUST** | Next.js single-screen Arena UI: live stock chart, 3 bucket buttons, live conviction weight preview, Proof Panel, 1-click Session Keys | 14h | Frontend Dev | 
| **MUST** | Devnet deployment + 2-wallet E2E test + 2.5-min founder video + `build.magicblock.app` submission | 6h | Both | 
| **SHOULD** | Atomic L1 payout swap into devnet `NVDAx` SPL token (via mock-swap adapter if devnet Jupiter pool lacks `NVDAx`) | 4h | Rust Dev | 
| **COULD** | Multi-stock selector (`NVDAx`, `TSLAx`, `AAPLx`) & leaderboard | 4h | Frontend Dev | 

* **Never-Cut List:** VW-SCP fixed-point math, PER `CrossReadDenied` proof, 1 full 60s round on Devnet with 2 wallets, Proof Panel with Solana Explorer tx links, founder-on-camera demo video.

* **Cut-List Order (drop first if behind):** (1) Multi-stock selector (lock to `NVDAx` only), (2) Leaderboard, (3) `NVDAx` swap (settle pure devnet USDC), (4) Early-exit button (keep VW-SCP entry + settlement).

## 6. EXACT PRODUCT SEMANTICS, FORMULAS & INVARIANTS

### Parameters (Zero Placeholders — Every Default Defined)

| Parameter | Symbol | Default Value | Units | 
| ----- | ----- | ----- | ----- | 
| Fixed-point scale | `SCALE` | `1_000_000_000` ($10^9$) | dimensionless | 
| USDC decimals | — | `6` (`1_000_000` = 1.00 USDC) | micro-USDC | 
| Round duration | `T` | `60_000` | milliseconds | 
| Min / Max stake per entry | `u_min` / `u_max` | `1_000_000` (\$1) / `500_000_000` (\$500) | micro-USDC | 
| Max players per room | `MAX_PLAYERS` | `20` | accounts/room | 
| Time-decay exponent | $\alpha$ | `0.5` (`isqrt` exact) | dimensionless | 
| Volatility damping coeff. | $\beta$ | `2_000_000_000` (`2.0` in `1e9`) | dimensionless | 
| Bucket breakout threshold | $\delta$ | `15` (`0.15%` price move from $S_0$) | basis points | 
| Protocol fee | $\phi$ | `300` (`3.00%`) | basis points | 
| VRF Jackpot fee share | $\phi_{\text{vrf}}$ | `100` (`1.00%` of pot, inside $\phi$) | basis points | 
| Early-exit volatility spread | $\gamma$ | `500` (`5.00%` max spread) | basis points | 

### Formulas (Exact Integer Fixed-Point Math)

1. **Bucket Resolution at** $t = T$**:** Given start price $S_0$ and end price $S_T$ from Pyth Lazer:

   * Bucket `0` (`DOWN`): $S_T \le S_0 \cdot (10000 - \delta) / 10000$

   * Bucket `1` (`FLAT`): $|S_T - S_0| < S_0 \cdot \delta / 10000$

   * Bucket `2` (`UP`): $S_T \ge S_0 \cdot (10000 + \delta) / 10000$

2. **Kinetic Conviction Weight (**$w_i$**):**
   

   $$
   \tau = \left\lfloor \frac{(T - t_i) \cdot 10^9}{T} \right\rfloor, \quad \sqrt{\tau} = \text{isqrt}(\tau \cdot 10^9), \quad x = \left\lfloor \frac{\lfloor \beta \cdot (\hat{\sigma}_t \cdot 10^5) / 10^9 \rfloor \cdot \sqrt{\tau}}{10^9} \right\rfloor
   $$

   $$
   w_i = \left\lfloor \frac{\lfloor u_i \cdot \sqrt{\tau} / 10^9 \rfloor \cdot \text{exp\_neg\_fp}(x)}{10^9} \right\rfloor
   $$

3. **Settlement Payout (**$P_i$**):**
   

   $$
   F = \left\lfloor \frac{U_{\text{tot}} \cdot \phi}{10000} \right\rfloor, \quad D = U_{\text{tot}} - F, \quad P_i = \left\lfloor \frac{D \cdot w_i}{W_{b^*}} \right\rfloor, \quad \text{dust} = D - \sum_{i \in b^*} P_i
   $$

   * **Zero-winner edge case (**$W_{b^*} = 0$**):** Refund `100%` of $u_i$ to every player with `0` fee.

   * **Rounding rule:** Always floor (`//` integer division); route exact remainder `dust` ($\le N_{\text{winners}}$ micro-USDC) to `treasury_vault`.

### Named Invariants (Must Hold in Every Test)

* **I1 (Exact Conservation):** $\sum P_i + F + \text{dust} == U_{\text{tot}}$ (or $\sum \text{refund}_i == U_{\text{tot}}$ when $W_{b^*}=0$).

* **I2 (Dust Bound):** $0 \le \text{dust} \le N_{\text{winners}}$.

* **I3 (Monotonic Time Penalty):** For fixed $u, \hat{\sigma}_t$, if $t_1 < t_2 < T$ then $w(t_1) \ge w(t_2)$ and $w(T) = 0$.

* **I4 (Monotonic Volatility Damping):** For fixed $u, t < T$, if $\hat{\sigma}_1 < \hat{\sigma}_2$ then $w(\hat{\sigma}_1) \ge w(\hat{\sigma}_2)$.

* **I5 (PER Privacy):** While `room.status == Active`, any unauthorized pubkey reading `PlayerPosition` on `devnet-tee.magicblock.app` receives an access-denied error.

### Room State Machine

`Initialized (L1)` → `Delegated (PER)` → `Active (60s, PER + Session Keys)` → `Resolving (VRF Requested + Pyth S_T Locked)` → `Settled (Committed & Undelegated to L1 via Magic Actions)` → `Claimed`

## 7. ARCHITECTURE & REPO LAYOUT

```
tapeduel/
├── Anchor.toml                      # Anchor 1.0.2, devnet + localnet config
├── Makefile                         # setup, test, parity, deploy-devnet, demo
├── DECISIONS.md                     # Deviation & adapter log
├── PROGRESS.md                      # Checkpoint log
├── programs/tapeduel/
│   ├── Cargo.toml                   # ephemeral-rollups-sdk = { version = "0.18", features = ["anchor", "access-control"] }
│   └── src/
│       ├── lib.rs                   # #[ephemeral] #[program] entrypoints
│       ├── constants.rs             # Single source of truth for pubkeys & defaults
│       ├── math.rs                  # Verified Reference Implementation R-1 (u128 VW-SCP)
│       ├── state.rs                 # RoomState, PlayerPosition (PER), VaultAccounts
│       ├── errors.rs                # Custom Anchor ErrorCodes
│       └── adapters/
│           ├── oracle.rs            # Pyth Lazer adapter + devnet fallback mock
│           └── token_swap.rs        # USDC / NVDAx settlement adapter
├── fixtures/golden_vectors.json     # Verified Reference Output R-2
├── tests/
│   ├── parity.test.ts               # Verifies TS BigInt == Rust math == golden_vectors.json
│   └── tapeduel.e2e.ts              # 2-wallet local/devnet full-round + CrossReadDenied test
└── web/                             # Next.js 15 App Router single-screen Arena + Proof Panel
    ├── config/addresses.ts          # Mirrors constants.rs
    └── lib/vwScp.ts                 # Verified Reference Implementation R-3 (BigInt)

```

```
[Wallet A & B] --(1. Deposit USDC L1)--> [Solana L1 Vault PDA]
      |                                          ^
      | (2. 0-fee Session Key taps, <50ms)       | (5. MagicIntentBundleBuilder
      v                                          |  commit_and_undelegate + L1 Payout)
[MagicBlock PER (Intel TDX TEE)] <---------------+
  - Sealed PlayerPosition PDAs (ACL gated)
  - Live Pyth Lazer feed -> S_t, sigma_t
  - MagicBlock VRF (<50ms, 0 SOL) -> Golden Ticket Bonus

```

## 8. VERIFIED REFERENCE IMPLEMENTATIONS (EXECUTED IN SANDBOX)

### R-1: Core VW-SCP Fixed-Point Engine (Rust `u128` — Bit-Identical to Verified Python & Node Spikes)

```
pub const SCALE: u128 = 1_000_000_000; // 1e9 fixed-point

pub fn isqrt(n: u128) -> u128 {
    if n == 0 { return 0; }
    let mut x = n;
    let mut y = (x + 1) / 2;
    while y < x {
        x = y;
        y = (x + n / x) / 2;
    }
    x
}

pub fn exp_neg_fp(x_fp: u128) -> u128 {
    if x_fp == 0 { return SCALE; }
    if x_fp >= 20 * SCALE { return 0; }
    let mut halvings: u32 = 0;
    let mut z = x_fp;
    while z > SCALE / 2 {
        z /= 2;
        halvings += 1;
    }
    let t1 = z;
    let t2 = (t1 * z) / (2 * SCALE);
    let t3 = (t2 * z) / (3 * SCALE);
    let t4 = (t3 * z) / (4 * SCALE);
    let t5 = (t4 * z) / (5 * SCALE);
    let t6 = (t5 * z) / (6 * SCALE);
    // Alternating sum done safely without underflow since z <= 0.5*SCALE
    let pos = SCALE + t2 + t4 + t6;
    let neg = t1 + t3 + t5;
    let mut res = pos.saturating_sub(neg);
    for _ in 0..halvings {
        res = (res * res) / SCALE;
    }
    res
}

pub fn compute_conviction_weight(
    stake_usdc: u64,
    t_entry_ms: u64,
    duration_ms: u64,
    sigma_bps: u64,
    beta_fp: u128, // default: 2_000_000_000 (2.0)
) -> u128 {
    if stake_usdc == 0 || t_entry_ms >= duration_ms || duration_ms == 0 {
        return 0;
    }
    let rem_ms = (duration_ms - t_entry_ms) as u128;
    let tau_fp = (rem_ms * SCALE) / (duration_ms as u128);
    let sqrt_tau_fp = isqrt(tau_fp * SCALE);
    let sigma_fp = (sigma_bps as u128) * 100_000;
    let exp_arg_fp = ((beta_fp * sigma_fp) / SCALE) * sqrt_tau_fp / SCALE;
    let damp_fp = exp_neg_fp(exp_arg_fp);
    (((stake_usdc as u128) * sqrt_tau_fp) / SCALE) * damp_fp / SCALE
}

```

### R-2: Verified Golden Vectors (`fixtures/golden_vectors.json` — Executed `2026-11-23`, Python + Node BigInt 5/5 Bit-Identical)

```
{
  "weights": [
    {"name": "V1_early_calm",    "stake": 10000000, "t_ms": 0,     "T_ms": 60000, "sigma_bps": 50,   "weight": 9900498},
    {"name": "V2_mid_normal",    "stake": 10000000, "t_ms": 30000, "T_ms": 60000, "sigma_bps": 150,  "weight": 6922646},
    {"name": "V3_late_sniper",   "stake": 10000000, "t_ms": 59000, "T_ms": 60000, "sigma_bps": 150,  "weight": 1286003},
    {"name": "V4_vol_spike_10x", "stake": 10000000, "t_ms": 15000, "T_ms": 60000, "sigma_bps": 1500, "weight": 6678787},
    {"name": "V5_boundary_T",    "stake": 10000000, "t_ms": 60000, "T_ms": 60000, "sigma_bps": 100,  "weight": 0}
  ],
  "settlement": {
    "total_pot": 40000000, "fee_usdc": 1200000, "distributable": 38800000,
    "payouts": {"alice_early": 34339542, "bob_sniper": 4460457},
    "dust_to_treasury": 1, "refunded": false
  },
  "refund_case": {
    "total_pot": 40000000, "fee_usdc": 0, "distributable": 40000000,
    "payouts": {"alice_early": 10000000, "bob_sniper": 10000000, "carol_loser": 20000000},
    "dust_to_treasury": 0, "refunded": true
  }
}

```

*Observed sandbox output:* `PARITY SPIKE PASSED: 5/5 golden vectors bit-identical between Python and Node BigInt`. Note how `bob_sniper` (\$10 at `t=59s`) gets only `$4.46` even on the winning bucket while `alice_early` (\$10 at `t=0s`) wins `$34.34` (`3.43x`).

## 9. COMPONENT SPECIFICATIONS & SPONSOR INTEGRATIONS

### Anchor Program (`programs/tapeduel/src/lib.rs`)

* **Required Macros & Imports `[verified: docs.magicblock.gg, 2026-11-19]`:**

  ```
  use ephemeral_rollups_sdk::anchor::{commit, delegate, ephemeral, vrf, vrf_callback};
  use ephemeral_rollups_sdk::cpi::DelegateConfig;
  use ephemeral_rollups_sdk::ephem::MagicIntentBundleBuilder;
  use ephemeral_rollups_sdk::vrf::instructions::{create_request_scoped_randomness_ix, RequestRandomnessParams};
  use ephemeral_rollups_sdk::vrf::types::SerializableAccountMeta;
  
  ```

* **Accounts:**

  * `RoomState` (PDA `["room", room_id_le]`): `room_id: u64`, `authority: Pubkey`, `status: u8`, `start_ts_ms: i64`, `duration_ms: u64`, `s0_price: u64`, `st_price: u64`, `sigma_bps: u64`, `total_pot: u64`, `bucket_weights: [u128; 3]`, `winning_bucket: u8`, `vrf_winner_index: u8`, `player_count: u8`.

  * `PlayerPosition` (PDA `["pos", room_id_le, player.key()]` — **PER ACL-gated**): `player: Pubkey`, `bucket: u8`, `stake_usdc: u64`, `weight: u128`, `exited: bool`, `claimed: bool`.

* **Instructions:**

  1. `init_room(room_id, duration_ms)` (L1): Pre-funds rent for `EphemeralPermission` and creates USDC escrow vault ATA.

  2. `delegate_room(room_id)` (L1): Calls `delegate_pda` targeting TEE Validator `MTEWGuqxUpYZGFJQcp8tLN7x5v9BSeoFHYWQQ3n3xzo`.

  3. `init_position_permission(room_id)` (ER): Calls `CreateEphemeralPermissionCpi` restricting `PlayerPosition` to `[player]` with `TX_LOGS_FLAG | TX_MESSAGE_FLAG | TX_BALANCES_FLAG`.

  4. `enter_bucket(room_id, bucket, stake_usdc)` (ER): Reads Pyth Lazer via `adapters/oracle.rs`, computes `w = compute_conviction_weight(...)`, stores sealed `PlayerPosition`, increments `bucket_weights[bucket]`.

  5. `request_vrf_bonus(room_id)` + `callback_vrf_bonus(randomness: [u8; 32])` (ER): Uses `#[vrf]` and `#[vrf_callback]` to pick `vrf_winner_index` (`0 SOL` inside ER).

  6. `settle_and_undelegate(room_id)` (ER → L1): Locks $S_T$, resolves `winning_bucket`, removes PER privacy (`UpdateEphemeralPermissionCpi`), and invokes `MagicIntentBundleBuilder` `commit_and_undelegate` to settle on L1.

  7. `claim_payout(room_id, claim_as_stock: bool)` (L1): Transfers exact $P_i$ USDC (or swaps to devnet `NVDAx` via `adapters/token_swap.rs`) and marks `claimed = true`.

* **Adapter Fallback Rule:** If Pyth Lazer devnet equity feed for `NVDAx` is stale outside US market hours (weekends/after-hours), `adapters/oracle.rs` supports a clearly labeled **"Demo Replay / 24/7 Synthetic Equity Feed Mode"** fed by a deterministic Pyth SOL/USD or historical NVDA tick stream so live judging never stalls on weekend market close.

### Web UI (`web/app/page.tsx` — Single-Screen Arena)

* **Top Bar:** Stock ticker (`NVDAx`), live price $S_t$, rolling volatility $\hat{\sigma}_t$ (bps), 60-second countdown ring, **Gasless ER Session Active** badge.

* **Center Arena:** Live price chart + 3 big conviction buttons (`DOWN`, `FLAT`, `UP`) showing real-time decaying `Conviction Multiplier` (e.g. `0.99x` at `t=0s` → `0.13x` at `t=59s`).

* **Right Column — Proof-First Judge Panel (No Wallet Required to Inspect):**

  * Deployed Program ID + Explorer link

  * **"Test PER Privacy" button:** Queries Wallet A's `PlayerPosition` from Wallet B's session and displays raw `CrossReadDenied` response

  * Latest L1 Settlement Tx link + VRF Callback Tx link + Conservation Check (`Sum Payouts + Fee + Dust == Pot: PASS`)

## 10. SECURITY, THREAT MODEL & TEST PLAN

| Threat | Mitigation | Residual Risk | 
| ----- | ----- | ----- | 
| **Last-second oracle sniping** | $\left(1 - t_i/T\right)^{0.5}$ collapses weight to `0` at $t=T$; entry cut off at $T-2\text{s}$ | Sub-second clock skew (\~100ms) acceptable under `0.5` decay | 
| **Volatility spike / LVR bleed** | $\exp(-\beta\hat{\sigma}_t\sqrt{\tau})$ + parimutuel conservation ($\sum P_i = (1-\phi)U_{\text{tot}}$) | Extreme low-liquidity rooms (1 player) trigger 0-fee refund | 
| **TEE operator / Intel TDX trust** | Bound room duration to `60s` and max stake to `$500` USDC; settle back to Solana L1 | Validator v1.0 replica/challenge mode is experimental `[verified: Solana Compass]` | 
| **Integer overflow / rounding drain** | All intermediate math in `u128`, floor division, `dust` routed to treasury, fuzz tested | None within `u64` USDC bounds (`<10^{13}` micro-USDC) | 
| **Double-claim / reentrancy** | `pos.claimed = true` checked and set before SPL token CPI transfer | Standard Anchor signer/PDA seed checks required | 

**Required Test Suite (`make test`):**

1. **Rust Unit & Property Tests (`cargo test`):** 5 golden vectors + 10,000-iteration fuzz test asserting `I1` (conservation) and `I2` (dust $\le N$).

2. **Cross-Language Parity (`npm run test:parity`):** Proves TypeScript `web/lib/vwScp.ts` matches `fixtures/golden_vectors.json` bit-for-bit.

3. **2-Wallet Integration & Negative PER Test (`anchor test`):** Wallet A & Wallet B enter opposite buckets; Wallet B attempts to read Wallet A's PER PDA mid-round and asserts access denial; round settles and exact payouts match `I1`.

## 11. BUILD PLAN — EXECUTABLE TASK CARDS (T-001 TO T-028)

### Phase 1: Vertical Slice & Toolchain (Hours 0–10)

* **T-001 — Toolchain & Local Validator Spike** `[MUST] [owner: agent] [est: 25 min]`

  * *Depends on:* None | *Goal:* Verify Anchor `1.0.2`, Solana CLI, Node `20+`, and `@magicblock-labs/ephemeral-validator@1.1.1`.

  * *Verification:* `anchor --version && solana --version && ephemeral-validator --version`

  * *Expected:* Anchor `1.0.2`, validator `1.1.1`, exit `0`.

  * *If fails:* Pin via `avm use 1.0.2` and `npm i -g @magicblock-labs/ephemeral-validator@1.1.1`.

  * *Commit:* `chore: verify anchor and magicblock validator toolchain`

* **T-002 — Verify Pyth Lazer Equity Feed ID on Devnet** `[MUST] [owner: agent] [est: 20 min]`

  * *Depends on:* T-001 | *Goal:* Confirm active devnet Pyth Lazer `feedID` for `NVDA`/`TSLA` (or fallback `SOL/USD`) at `PriCems5tHihc6UDXDjzjeawomAwBduWMGAi8ZUjppd` and write `config/addresses.ts`.

  * *Verification:* `npx ts-node scripts/check_oracle.ts` | *Expected:* Prints non-zero price + timestamp.

  * *If fails:* Switch `oracle.rs` adapter to Pyth SOL/USD devnet feed + log in `DECISIONS.md` (fallback `T-002b`).

  * *Commit:* `feat: verify pyth lazer devnet feed and configure addresses`

* **T-003 — Scaffold Anchor Repo & Pin `ephemeral-rollups-sdk = "0.18"`** `[MUST] [owner: agent] [est: 25 min]`

  * *Depends on:* T-001 | *Goal:* Init Anchor workspace with `ephemeral-rollups-sdk = { version = "0.18", features = ["anchor", "access-control"] }`.

  * *Verification:* `anchor build` | *Expected:* Compiles `.so` with exit `0`.

  * *Commit:* `chore: scaffold tapeduel anchor program with pinned sdk 0.18`

* **T-004 — Implement Verified Reference R-1 (`math.rs`) + Golden Vector Unit Tests** `[MUST] [owner: agent] [est: 30 min]`

  * *Depends on:* T-003 | *Goal:* Copy R-1 into `programs/tapeduel/src/math.rs` and assert all 5 vectors in `fixtures/golden_vectors.json` + Invariants `I1–I4`.

  * *Verification:* `cargo test --manifest-path programs/tapeduel/Cargo.toml` | *Expected:* `test result: ok. 7 passed; 0 failed`.

  * *Commit:* `feat: implement fixed-point vw-scp math and invariant tests`

* **T-005 — Implement TS Parity Module (`web/lib/vwScp.ts`) & Parity Test** `[MUST] [owner: agent] [est: 20 min]`

  * *Depends on:* T-004 | *Goal:* Port R-1 to `BigInt` TypeScript and verify bit-identical match with `fixtures/golden_vectors.json`.

  * *Verification:* `npm run test:parity` | *Expected:* `PARITY PASSED: 5/5`.

  * *Commit:* `feat: add bigint vw-scp client module with golden parity`

### Phase 2: Onchain State, PER Privacy, VRF & Settlement (Hours 10–24)

* **T-006 — Implement `state.rs`, `errors.rs`, `init_room`, and L1 USDC Vault** `[MUST] [owner: agent] [est: 40 min]`

  * *Verification:* `anchor test --skip-deploy` (init_room test passes). *Commit:* `feat: add room state and l1 usdc escrow vault`

* **T-007 — Implement `delegate_room` to MagicBlock TEE Validator** `[MUST] [owner: agent] [est: 35 min]`

  * *Goal:* Delegate `RoomState` and `PlayerPosition` PDAs to `MTEWGuqxUpYZGFJQcp8tLN7x5v9BSeoFHYWQQ3n3xzo`.

  * *Verification:* `npm run test:delegate` on local `mb-test-validator` + `ephemeral-validator`. *Commit:* `feat: wire tee delegation lifecycle`

* **T-008 — Implement PER `EphemeralPermission` ACLs (`init_position_permission`)** `[MUST] [owner: agent] [est: 45 min]`

  * *Goal:* Restrict `PlayerPosition` read access to owner wallet using `CreateEphemeralPermissionCpi` + `TX_LOGS_FLAG | TX_MESSAGE_FLAG | TX_BALANCES_FLAG`.

  * *Verification:* `npm run test:per-privacy` asserts Wallet B read fails with access denial while Wallet A succeeds. *Commit:* `feat: enforce per tee privacy on player positions`

* **T-009 — Implement `enter_bucket` + `adapters/oracle.rs`** `[MUST] [owner: agent] [est: 40 min]`

  * *Goal:* Compute VW-SCP weight using live Pyth Lazer price + rolling $\hat{\sigma}_t$ inside ER (`0 SOL`).

  * *Verification:* `npm run test:enter` confirms weight matches `vwScp.ts`. *Commit:* `feat: implement gasless er bucket entry with pyth volatility`

* **T-010 — CHECKPOINT 1** `[MUST] [owner: agent] [est: 15 min]`

  * *Verification:* `make test && git tag checkpoint-1` | Update `PROGRESS.md`.

* **T-011 — Implement MagicBlock VRF Bonus (`request_vrf_bonus` & `callback_vrf_bonus`)** `[MUST] [owner: agent] [est: 40 min]`

  * *Goal:* Request free ER VRF (<50ms) at round close to select 1 Golden Ticket winner.

  * *Verification:* Local `vrf-oracle` test resolves `vrf_winner_index`. *Commit:* `feat: integrate magicblock er vrf bonus drop`

* **T-012 — Implement `settle_and_undelegate` via `MagicIntentBundleBuilder` + `claim_payout`** `[MUST] [owner: agent] [est: 45 min]`

  * *Goal:* Reveal PER positions, commit & undelegate to L1 atomically, pay exact $P_i$ USDC + route `dust` to treasury.

  * *Verification:* `npm run test:e2e-local` runs 2 wallets from deposit to L1 payout and asserts `I1` exact balance conservation. *Commit:* `feat: add atomic magic-action settlement and usdc payouts`

* **T-013 — Implement `early_exit` Inside ER** `[SHOULD] [owner: agent] [est: 40 min]`

  * *Goal:* Allow 50ms gasless cash-out before $t=T$ with discount rolling into final pot. *Commit:* `feat: add volatility-damped early exit`

* **T-014 — Implement Devnet `NVDAx` SPL Token Payout Adapter** `[SHOULD] [owner: agent] [est: 35 min]`

  * *Goal:* Mint devnet `NVDAx` test SPL token so winners can toggle USDC vs. `NVDAx` claim on L1. *Commit:* `feat: add atomic nvdax spl claim adapter`

### Phase 3: Devnet Deploy, Frontend Arena & Proof Panel (Hours 24–36 — FREEZE AT HOUR 36)

* **T-015 — Fund Devnet Wallets & Deploy Program** `[MUST] [owner: human+agent] [est: 25 min]`

  * *Verification:* `anchor deploy --provider.cluster devnet && solana program show <PROGRAM_ID> --url devnet`. *Commit:* `chore: deploy tapeduel to solana devnet`

* **T-016 — Run 2-Wallet Full-Round E2E on Live Devnet + `devnet-tee.magicblock.app`** `[MUST] [owner: agent] [est: 40 min]`

  * *Verification:* `npm run test:e2e-devnet` prints real Solana Explorer tx URLs for deposit, delegation, VRF, and L1 settlement. *Commit:* `test: pass live devnet per+vrf e2e round`

* **T-017 — Build Next.js Arena UI + Wallet Adapter + 1-Click Session Keys** `[MUST] [owner: agent] [est: 45 min]`

  * *Verification:* `npm run build --prefix web` exits `0`. *Commit:* `feat: build single-screen arena ui with session keys`

* **T-018 — Wire Live Price Chart, Volatility Gauge & Real-Time Conviction Multiplier** `[MUST] [owner: agent] [est: 40 min]`

  * *Verification:* Live countdown visibly decays multiplier from `~0.99x` to `~0.13x`. *Commit:* `feat: wire live volatility and conviction multiplier ui`

* **T-019 — Build Proof-First Judge Panel (`CrossReadDenied` Button + Explorer Links)** `[MUST] [owner: agent] [est: 35 min]`

  * *Verification:* Playwright E2E verifies Proof Panel renders without wallet connected. *Commit:* `feat: add proof-first judge verification panel`

* **T-020 — CHECKPOINT 2 (FEATURE FREEZE — HOUR 36)** `[MUST] [owner: agent] [est: 15 min]`

  * *Verification:* `make test && npm run build --prefix web && git tag checkpoint-2` | No new features after this point.

### Phase 4: Rehearsal, Demo Video & Blitz V10 Submission (Hours 36–48)

* **T-021 — Stress-Test 2 Concurrent Browsers on Devnet (5 Consecutive Rounds)** `[MUST] [owner: human] [est: 30 min]`

* **T-022 — Deploy Frontend to Vercel Production URL** `[MUST] [owner: human] [est: 20 min]`

* **T-023 — Write README.md (Architecture, VW-SCP Formula, Explorer Links, Honest Limitations)** `[MUST] [owner: agent] [est: 25 min]`

* **T-024 — Run CI Banned-Word & Spec Lint Check** `[MUST] [owner: agent] [est: 10 min]`

* **T-025 — Rehearse 2.5-Minute Demo Script 3x (Record Backup Clip)** `[MUST] [owner: human] [est: 45 min]`

* **T-026 — Record Final Founder-on-Camera Demo Video (≤2m45s, Zero AI Voiceover)** `[MUST] [owner: human] [est: 30 min]`

* **T-027 — Submit on `build.magicblock.app` with Proof-of-Work Program ID & Relayer Wallet** `[MUST] [owner: human] [est: 20 min]`

* **T-028 — Post Short Technical Launch Thread + Apply to MagicBlock Forge Epoch 02** `[SHOULD] [owner: human] [est: 20 min]`

## 12. DEMO SCRIPT (2m30s — FOUNDER ON CAMERA)

* **0:00–0:20 (Hook — "Why Solana, Why MagicBlock?"):** Founder on camera: *"Public AMMs bleed to PropAMMs, and public prediction markets get sniped. TapeDuel runs 60-second tokenized stock arenas inside a MagicBlock Private Ephemeral Rollup with a new Volatility-Warped Conviction formula."*

* **0:20–0:50 (Deposit & Live Decay):** Split-screen showing **Wallet A** and **Wallet B**. Both deposit 10 devnet USDC on L1 and enter `UP` at `t=5s` (Wallet A, `0.95x` weight) vs. `t=45s` (Wallet B, `0.48x` weight) using 1-click gasless Session Keys.

* **0:50–1:25 (CLIMAX — Live PER Privacy Proof):** Click **"Inspect Opponent"** in Wallet B's Proof Panel. Screen displays raw TEE `CrossReadDenied` response proving Wallet A's bucket is sealed inside Intel TDX while active.

* **1:25–2:05 (Resolution, VRF & Atomic L1 Payout):** Countdown hits `0s`. Pyth Lazer locks $S_T$, MagicBlock VRF (<50ms, 0 SOL) rolls the Golden Ticket bonus, and `MagicIntentBundleBuilder` settles atomically to L1. Open the live **Solana Explorer** tx showing Wallet A earning `>2x` Wallet B's payout with exact USDC conservation.

* **2:05–2:30 (Startup Unit Economics & Forge Plan):** *"At 20 players per room, Validator v1.0's 0.003 SOL session fee is just 0.30% of volume—ready for Solana Mainnet and MagicBlock Forge Epoch 02."*

* **Fallback:** Pre-recorded clean 1080p devnet video (`docs/demo_backup.mp4`) + local `mb-test-validator` mode if Devnet RPC lags.

## 13. JUDGE / VC RED-TEAM Q&A (8 HARD QUESTIONS)

1. **Q: Isn't this just GachaStock from Blitz v9?**
   *A:* No. GachaStock is a VRF lootbox + leverage box. TapeDuel is a sealed-state multiplayer conviction market where entry timing and live volatility ($\hat{\sigma}_t\sqrt{\tau}$) determine payout shares with zero house inventory risk.

2. **Q: Why does this need MagicBlock PER instead of commit-reveal on Solana L1?**
   *A:* Commit-reveal on L1 requires 2 transactions + gas per player, breaks during rapid early exits, and forces players to wait for a manual reveal phase (where losers grief by refusing to reveal). PER gives 0-fee 50ms actions and automatic TEE reveal at $t=T$.

3. **Q: What happens if a stock gaps +30% on earnings? Does the house go bankrupt?**
   *A:* Never. Invariant `I1` enforces $\sum P_i = (1-\phi)U_{\text{tot}}$ mathematically across every possible price move.

4. **Q: What if nobody picks the winning bucket?**
   *A:* When $W_{b^*} = 0$, the contract executes a `100%` refund with `0` protocol fee (verified in `refund_case` golden vector).

5. **Q: How do you survive Validator v1.0's `0.003 SOL` session fee?**
   *A:* We never open 1 ER session per solo user. One shared 60-second room pools `20 players × $10 = $200`, reducing `0.003 SOL` (\~`$0.60`) to `0.30%` of volume against a `3%` rake (`90%` gross margin).

6. **Q: What happens on weekends when US stock markets are closed?**
   *A:* On devnet/weekends, `adapters/oracle.rs` seamlessly switches to 24/7 tokenized-crypto/synthetic-equity feeds or Pyth Lazer 24/5 feeds, and clearly labels the feed source in the UI.

7. **Q: Doesn't MagicBlock PER rely on Intel TDX hardware trust?**
   *A:* Yes—we state that transparently in README Limitations. That is why every room is strictly bounded to `60 seconds` and capped collateral, settling back to Solana L1 immediately.

8. **Q: How do you handle legal/regulatory risk for a real startup?**
   *A:* Before mainnet scaling, we geo-block restricted jurisdictions, cap room sizes during MagicBlock Forge testing, and engage legal counsel on skill-competition vs. derivatives compliance.

## 14. KILL CONDITIONS, ENV VARS & DEFINITION OF DONE

### Kill Conditions

| ID | Check | Action if Triggered | 
| ----- | ----- | ----- | 
| **KC-1** | `ephemeral-rollups-sdk` `0.18` fails to compile or delegate to `devnet-tee.magicblock.app` after 2 hours | Drop PER ACLs to standard public ER (`devnet.magicblock.app`), use commit-hash fallback for bucket privacy, log in `DECISIONS.md`. | 
| **KC-2** | Conservation Invariant `I1` fails in any fuzz test | STOP ALL UI WORK immediately; fix `math.rs` until 10,000 fuzz runs pass. | 
| **KC-3** | Devnet `NVDAx` Pyth Lazer feed unavailable | Switch `adapters/oracle.rs` to live Devnet Pyth `SOL/USD` feed and label UI clearly. | 

### Environment Variables & Tool Versions

* **Versions:** Rust `1.82+`, Anchor `1.0.2`, Solana CLI `2.1+`, Node `20.18+` (or `24.10.0`), `@magicblock-labs/ephemeral-validator@1.1.1`.

* **`.env` Keys (never commit):** `NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com`, `NEXT_PUBLIC_ER_RPC=https://devnet.magicblock.app`, `NEXT_PUBLIC_TEE_RPC=https://devnet-tee.magicblock.app`, `NEXT_PUBLIC_PROGRAM_ID=<deployed_id>`, `NEXT_PUBLIC_USDC_MINT=<devnet_usdc_mint>`.

### Definition of Done (Tickable Checklist)

* \[ \] `cargo test` passes 5/5 golden vectors + 10,000 fuzz runs for `I1–I4`.

* \[ \] `npm run test:parity` passes 5/5 bit-identical vectors.

* \[ \] `npm run test:e2e-devnet` completes 1 full 60s round with 2 wallets + verified `CrossReadDenied` proof.

* \[ \] Single-screen Next.js app live on Vercel with Proof Panel and Explorer links.

* \[ \] `2.5-min` founder-on-camera demo video recorded (zero AI voiceover).

* \[ \] Submitted on `https://build.magicblock.app/` with connected wallet, public GitHub repo, live URL, demo video, and Proof-of-Work Program ID.

## 15. BOTTOM LINE

TapeDuel combines a genuinely distinct, overflow-safe trading equation (`VW-SCP`) with the exact multi-primitive stack (`PER + ER + VRF + Magic Actions`) that wins MagicBlock hackathons while remaining 100% solvent and economically viable under Validator v1.0 fees. Ship the single-screen 60-second devnet loop with two real wallets and a crisp founder-on-camera `CrossReadDenied` demo before Nov 27, then apply immediately to MagicBlock Forge Epoch 02.
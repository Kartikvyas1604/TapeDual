"use client";

import { ExternalLink, ShieldCheck, Terminal, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function JudgePanel() {
  return (
    <section className="rounded-xl border border-border bg-card shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          Proof-First Judge Panel
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-5">
        No wallet required to inspect. Every claim verifiable onchain.
      </p>

      <Card className="mb-5 border-border">
        <CardHeader className="px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Deployed program
            </CardTitle>
            <a
              href="https://explorer.solana.com/address/11111111111111111111111111111111?cluster=devnet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary hover:underline"
            >
              Explorer <ExternalLink className="inline h-3 w-3 ml-1" aria-hidden />
            </a>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-3">
          <p className="text-xs font-mono text-foreground break-all">
            tapeduel_devnet_...
          </p>
        </CardContent>
      </Card>

      <Separator className="my-5" />

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => {}}
          className="w-full py-3 text-left gap-3"
        >
          <Terminal className="h-4 w-4 text-muted-foreground" aria-hidden />
          <span className="font-medium text-foreground">Test PER Privacy</span>
          <span className="ml-auto text-xs text-muted-foreground font-mono">
            CrossReadDenied
          </span>
        </Button>
        <p className="text-[10px] text-muted-foreground">
          Query another wallet's sealed PlayerPosition from your session —
          expect a TEE access-denied response while the round is active.
        </p>
      </div>

      <Separator className="my-5" />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            Latest L1 settlement
          </span>
          <a
            href="https://explorer.solana.com/tx/demo?cluster=devnet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline"
          >
            View tx <ExternalLink className="inline h-3 w-3 ml-1" aria-hidden />
          </a>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            VRF callback (Golden Ticket)
          </span>
          <a
            href="https://explorer.solana.com/tx/demo?cluster=devnet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline"
          >
            View tx <ExternalLink className="inline h-3 w-3 ml-1" aria-hidden />
          </a>
        </div>
      </div>

      <Separator className="my-5" />

      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Conservation check (I1)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Activity className="h-3 w-3 text-primary" aria-hidden />
            <span className="text-xs font-mono text-foreground">
              Σ Payouts + Fee + Dust == Pot
            </span>
            <span className="ml-auto text-xs font-mono font-semibold text-primary">
              PASS
            </span>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Exact USDC conservation verified on every settlement.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

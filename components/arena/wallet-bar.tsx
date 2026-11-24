"use client";

import { Wallet, Key, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WalletBarProps {
  balance: string;
  connected: boolean;
  onConnect: () => void;
  onSessionKeys: () => void;
}

export function WalletBar({
  balance,
  connected,
  onConnect,
  onSessionKeys,
}: WalletBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8 border-b border-border bg-background/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
          <Wallet className="h-4 w-4 text-muted-foreground" aria-hidden />
          <div className="flex flex-col">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              USDC balance
            </p>
            <p className="text-sm font-mono tabular-nums font-semibold text-foreground">
              {balance}
            </p>
          </div>
        </div>

        {!connected ? (
          <Button
            size="sm"
            onClick={onConnect}
            className="flex items-center gap-2 px-3 py-2"
          >
            <Key className="h-3 w-3" aria-hidden />
            Connect wallet
          </Button>
        ) : (
          <Badge variant="secondary" className="h-6 px-2 text-xs">
            Connected
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onSessionKeys}
          disabled={!connected}
          className="flex items-center gap-2 px-3"
        >
          <RefreshCw className="h-3 w-3" aria-hidden />
          1-click Session Keys
        </Button>
        <span className="text-[10px] font-mono text-muted-foreground">
          {connected ? "0 SOL ER tx" : "Sign in to enable"}
        </span>
      </div>
    </div>
  );
}

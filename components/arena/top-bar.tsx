"use client";

import { Activity, Clock, TrendingUp, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  symbol: string;
  price: string;
  change: string;
  volatility: string;
  secondsLeft: number;
  sessionActive: boolean;
}

export function TopBar({
  symbol,
  price,
  change,
  volatility,
  secondsLeft,
  sessionActive,
}: TopBarProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const countdown = `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-20">
      <div className="flex flex-col gap-3 px-4 py-3 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-xs font-mono text-muted-foreground">
              TapeDuel · Sealed Conviction Arena
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              live
            </span>
            <Badge
              variant={sessionActive ? "default" : "secondary"}
              className={`h-6 px-2 text-xs font-medium ${
                sessionActive
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              {sessionActive ? "Gasless ER Session Active" : "Session Idle"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:gap-6 px-1">
          <div className="flex items-center gap-1 text-xs font-mono">
            <Wifi className="h-3 w-3 text-primary" aria-hidden />
            <span className="text-muted-foreground">PER connected</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-sm font-mono tabular-nums font-semibold text-foreground">
                {price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono font-semibold ${
                  change.startsWith("-")
                    ? "text-destructive"
                    : "text-primary"
                }`}
              >
                {change}
              </span>
              <TrendingUp className="h-3 w-3 text-primary" aria-hidden />
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Volatility</p>
              <p className="text-sm font-mono tabular-nums font-semibold text-foreground">
                {volatility} bps
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Round closes in
            </p>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-muted-foreground" aria-hidden />
              <span className="text-sm font-mono tabular-nums font-semibold text-foreground">
                {countdown}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

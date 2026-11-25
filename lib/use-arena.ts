"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// Mock live-data feed for the devnet arena demo.
// In production this connects to Pyth Lazer + MagicBlock ER via adapters.

type Bucket = "DOWN" | "FLAT" | "UP";

export interface ArenaState {
  symbol: string;
  price: string;
  change: string;
  volatility: string;
  secondsLeft: number;
  balance: string;
  connected: boolean;
  isLoading: boolean;
  position: { bucket: Bucket; stake: string } | null;
  onConnect: () => void;
  onSessionKeys: () => void;
  openBucketDialog: () => void;
  enterPosition: (bucket: Bucket, stake: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const STARTING_PRICE = 142.3;
const VOLATILITY_BASE = 84;

export function useArena(): ArenaState {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [price, setPrice] = useState(STARTING_PRICE.toFixed(2));
  const [volatility, setVolatility] = useState(VOLATILITY_BASE);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a live price + volatility feed (Pyth Lazer equivalent).
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((p) => {
        const current = parseFloat(p);
        const drift = (Math.random() - 0.5) * 0.6;
        return Math.max(1, current + drift).toFixed(2);
      });
      setVolatility(VOLATILITY_BASE + Math.floor(Math.random() * 40) - 20);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Resolve initial loading after the first price tick so the skeleton shows.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // 60-second round countdown.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((t) => (t <= 1 ? 60 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const change = useMemo(() => {
    const delta = ((parseFloat(price) - STARTING_PRICE) / STARTING_PRICE) * 100;
    return `${delta >= 0 ? "+" : ""}${delta.toFixed(2)}%`;
  }, [price]);

  const [position, setPosition] = useState<{ bucket: Bucket; stake: string } | null>(null);

  const balance = useMemo(() => "1,250.00", []);

  const onConnect = useCallback(() => setConnected(true), []);
  const onSessionKeys = useCallback(() => {
    setConnected(true);
  }, []);
  const openBucketDialog = useCallback(() => setIsDialogOpen(true), []);

  const enterPosition = useCallback((bucket: Bucket, stake: string) => {
    setPosition({ bucket, stake });
    setIsDialogOpen(false);
    toast.success("Position entered", {
      description: `${stake} USDC on ${bucket}`,
    });
  }, []);

  return {
    symbol: "NVDAx",
    price,
    change,
    volatility: volatility.toString(),
    secondsLeft,
    balance,
    connected,
    isLoading,
    position,
    onConnect,
    onSessionKeys,
    openBucketDialog,
    enterPosition,
    isDialogOpen,
    setIsDialogOpen,
  };
}

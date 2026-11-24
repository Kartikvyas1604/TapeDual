"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Bucket = "DOWN" | "FLAT" | "UP";

interface ConvictionButtonProps {
  bucket: Bucket;
  label: string;
  icon: React.ReactNode;
  onSelect: () => void;
  multiplier: string;
  decayed: boolean;
}

function ConvictionButton({
  bucket,
  label,
  icon,
  onSelect,
  multiplier,
  decayed,
}: ConvictionButtonProps) {
  return (
    <Button
      onClick={onSelect}
      variant="default"
      size="lg"
      className={`w-full py-6 text-left group relative overflow-hidden ${
        decayed
          ? "opacity-60 pointer-events-none"
          : "hover:bg-primary/90 hover:shadow-[0_0_20px_oklch(0.72_0.17_250/_0.35)]"
      }`}
    >
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10 flex items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              bucket === "DOWN"
                ? "border-destructive text-destructive"
                : bucket === "UP"
                ? "border-primary text-primary"
                : "border-border text-muted-foreground"
            }`}
          >
            {icon}
          </div>
          <div className="text-left">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {bucket}
            </p>
            <p className="text-lg font-semibold text-foreground">{label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Multiplier</p>
          <p className={`font-mono tabular-nums font-bold ${
            decayed ? "text-muted-foreground" : "text-foreground"
          }`}>
            {multiplier}
          </p>
        </div>
      </div>
    </Button>
  );
}

interface ConvictionButtonsProps {
  onSelect: (bucket: Bucket) => void;
}

export function ConvictionButtons({ onSelect }: ConvictionButtonsProps) {
  const buckets: Array<{
    bucket: Bucket;
    label: string;
    icon: React.ReactNode;
    multiplier: string;
    decayed: boolean;
  }> = [
    {
      bucket: "DOWN",
      label: "Price drops",
      icon: <ArrowDown className="h-4 w-4" aria-hidden />,
      multiplier: "0.88x",
      decayed: false,
    },
    {
      bucket: "FLAT",
      label: "Price holds",
      icon: <Minus className="h-4 w-4" aria-hidden />,
      multiplier: "0.92x",
      decayed: false,
    },
    {
      bucket: "UP",
      label: "Price rises",
      icon: <ArrowUp className="h-4 w-4" aria-hidden />,
      multiplier: "0.99x",
      decayed: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {buckets.map((b) => (
        <ConvictionButton
          key={b.bucket}
          {...b}
          onSelect={() => onSelect(b.bucket)}
        />
      ))}
    </div>
  );
}

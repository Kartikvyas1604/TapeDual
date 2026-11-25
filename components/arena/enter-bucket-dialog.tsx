"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Bucket = "DOWN" | "FLAT" | "UP";

interface EnterBucketDialogProps {
  onClose: () => void;
  onConfirm: (bucket: Bucket, stake: string) => void;
  isOpen: boolean;
  defaultBucket?: Bucket;
}

const BUCKETS: Array<{ value: Bucket; label: string }> = [
  { value: "DOWN", label: "DOWN" },
  { value: "FLAT", label: "FLAT" },
  { value: "UP", label: "UP" },
];

export function EnterBucketDialog({
  onClose,
  onConfirm,
  isOpen,
  defaultBucket = "UP",
}: EnterBucketDialogProps) {
  const [bucket, setBucket] = useState<Bucket>(defaultBucket);
  const [stake, setStake] = useState("10.00");
  const numericStake = parseFloat(stake);
  const validStake = !isNaN(numericStake) && numericStake >= 1 && numericStake <= 500;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none select-none data-[state=open]:bg-muted"
      >
        Enter bucket
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Enter conviction</DialogTitle>
          <DialogDescription>
            Stake USDC on a sealed directional bucket. Position is private
            inside the PER until round close.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 p-4">
          <div className="space-y-2">
            <Label htmlFor="bucket-select">Bucket</Label>
            <div className="grid grid-cols-3 gap-2">
              {BUCKETS.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBucket(b.value)}
                  className={`rounded-lg border py-3 text-sm font-medium transition-colors ${
                    bucket === b.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="stake-input">Stake (USDC)</Label>
            <Input
              id="stake-input"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              spellCheck={false}
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder="10.00"
              aria-describedby="stake-hint"
            />
            <p id="stake-hint" className="text-[10px] text-muted-foreground">
              Min $1 · Max $500 per entry
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Est. conviction weight
              </span>
              <span className="font-mono tabular-nums text-foreground">
                {numericStake.toFixed(2)}x base
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Weight decays as the round progresses — earlier entries carry more
              conviction.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Separator className="mb-4" />
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(bucket, stake)}
            disabled={!validStake}
            className="w-full"
          >
            Confirm entry <ArrowRight className="ml-2 h-3 w-3" aria-hidden />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { TopBar } from "@/components/arena/top-bar";
import { WalletBar } from "@/components/arena/wallet-bar";
import { CountdownRing } from "@/components/arena/countdown-ring";
import { PriceChart } from "@/components/arena/price-chart";
import { ConvictionButtons } from "@/components/arena/conviction-buttons";
import { JudgePanel } from "@/components/arena/judge-panel";
import { EnterBucketDialog } from "@/components/arena/enter-bucket-dialog";
import { useArena } from "@/lib/use-arena";
import { toast } from "sonner";

export default function ArenaPage() {
  const reduceMotion = useReducedMotion();
  const baseEnter = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
      };
  const {
    symbol,
    price,
    change,
    volatility,
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
  } = useArena();

  const [selectedBucket, setSelectedBucket] = useState<"DOWN" | "FLAT" | "UP">(
    "UP"
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar
        symbol={symbol}
        price={price}
        change={change}
        volatility={volatility}
        secondsLeft={secondsLeft}
        sessionActive={secondsLeft > 0}
      />
      <WalletBar
        balance={balance}
        connected={connected}
        onConnect={onConnect}
        onSessionKeys={onSessionKeys}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        <motion.div
          {...baseEnter}
          transition={{
            ...baseEnter.transition,
            duration: 0.4,
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          <motion.div
            {...baseEnter}
            transition={{
              ...baseEnter.transition,
              duration: 0.5,
              delay: 0.08,
            }}
            className="lg:col-span-8 space-y-6"
          >
            <section className="rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border/50">
                <h2 className="text-sm font-semibold text-foreground tracking-tight">
                  NVDAx / USDC
                </h2>
                <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <span className="flex -space-x-px">
                    <span className="px-1.5 rounded-tl-lg border border-border bg-muted/50 text-muted-foreground">
                      LIVE
                    </span>
                    <span className="px-1.5 rounded-tr-lg border border-l-0 text-primary">
                      PER
                    </span>
                  </span>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <PriceChart symbol={symbol} price={price} loading={isLoading} />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card shadow-sm p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Enter conviction
                  </p>
                  <h3 className="text-sm font-semibold text-foreground">
                    Choose your bucket
                  </h3>
                </div>
                <CountdownRing secondsLeft={secondsLeft} className="w-14 h-14" />
              </div>
              <ConvictionButtons
                onSelect={(bucket) => {
                  setSelectedBucket(bucket);
                  openBucketDialog();
                }}
              />
              {position && (
                <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-muted-foreground uppercase tracking-wider">
                      Your position
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-mono tabular-nums font-semibold text-foreground">
                        {position.stake} USDC
                      </span>
                      <span className="font-mono text-muted-foreground">
                        on {position.bucket}
                      </span>
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Sealed inside the PER until round close.
                  </p>
                </div>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                Positions are sealed inside a MagicBlock Private Ephemeral
                Rollup until round close. Early entry decays your conviction
                weight — act early.
              </p>
            </section>
          </motion.div>

          <motion.div
            {...baseEnter}
            transition={{
              ...baseEnter.transition,
              duration: 0.5,
              delay: 0.16,
            }}
            className="lg:col-span-4 space-y-6"
          >
            <JudgePanel />
          </motion.div>
        </motion.div>
      </main>

      <EnterBucketDialog
        isOpen={isDialogOpen}
        defaultBucket={selectedBucket}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={(bucket, stake) => enterPosition(bucket, stake)}
      />
    </div>
  );
}

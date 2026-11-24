"use client";

import { useEffect, useState } from "react";

import { PriceChartSkeleton } from "@/components/arena/states";

interface PriceChartProps {
  symbol: string;
  price: string;
  loading?: boolean;
}

export function PriceChart({ symbol, price, loading }: PriceChartProps) {
  if (loading) return <PriceChartSkeleton loading />;
  if (points.length === 0) return null;

  useEffect(() => {
    const base = parseFloat(price);
    const data: number[] = [];
    for (let i = 0; i < 40; i++) {
      data.push(base + (Math.sin(i / 4) * 1.2) + (Math.random() - 0.5) * 0.8);
    }
    setPoints(data);
  }, [price]);

  if (points.length === 0) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const width = 560;
  const height = 200;
  const padding = 24;

  const linePoints = points
    .map(
      (p, i) =>
        `${((i / (points.length - 1)) * (width - padding * 2) + padding).toFixed(1)},${(
          height -
          padding -
          ((p - min) / range) * (height - padding * 2)
        ).toFixed(1)}`
    )
    .join(" ");

  const areaPoints = [
    `0,${height - padding}`,
    ...points
      .map(
        (p, i) =>
          `${((i / (points.length - 1)) * (width - padding * 2) + padding).toFixed(1)},${(
            height -
            padding -
            ((p - min) / range) * (height - padding * 2)
          ).toFixed(1)}`
      ),
    `${width - padding},${height - padding}`,
  ].join(" ");

  const currentPrice = points[points.length - 1];
  const prevPrice = points[points.length - 2] ?? currentPrice;
  const isUp = currentPrice >= prevPrice;

  return (
    <div className="flex flex-col h-full">
      <svg
        width={width}
        height={height}
        className="block w-full h-[200px] mx-auto"
        role="img"
        aria-label={`${symbol} live price chart`}
      >
        <defs>
          <linearGradient id="price-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop
              stopColor="rgb(91 141 239 / 0.35)"
              offset="0%"
              className="dark:stop-[oklch(0.72_0.17_250/_0.35)]"
            />
            <stop stopColor="transparent" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d={areaPoints}
          fill="url(#price-gradient)"
          className="dark:fill-[oklch(0.72_0.17_250/_0.15)]"
        />
        <path
          d={linePoints}
          fill="none"
          stroke="primary"
          strokeWidth={2}
          strokeLinejoin="round"
          className="dark:stroke-[oklch(0.72_0.17_250)]"
        />
        <circle
          cx={width - padding}
          cy={height - padding - ((currentPrice - min) / range) * (height - padding * 2)}
          r={3}
          fill="primary"
          className="dark:fill-[oklch(0.72_0.17_250)]"
        />
      </svg>
      <div className="mt-3 flex items-center justify-between gap-3 px-2">
        <span className="text-[10px] font-mono text-muted-foreground">
          {symbol} · last 60 s
        </span>
        <span
          className={`text-xs font-mono tabular-nums font-semibold ${
            isUp ? "text-primary" : "text-destructive"
          }`}
        >
          {currentPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

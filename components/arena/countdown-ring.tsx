"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownRingProps {
  secondsLeft: number;
  totalSeconds?: number;
  className?: string;
}

export function CountdownRing({
  secondsLeft,
  totalSeconds = 60,
  className,
}: CountdownRingProps) {
  const [time, setTime] = useState(secondsLeft);

  useEffect(() => {
    setTime(secondsLeft);
  }, [secondsLeft]);

  const progress = Math.max(0, Math.min(1, time / totalSeconds));
  const strokeDasharray = 283; // circumference of r=45 circle
  const offset = strokeDasharray * (1 - progress);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        className="transform -rotate-90"
        width={100}
        height={100}
        viewBox="0 0 100 100"
        aria-label="Round countdown"
        role="timer"
        aria-valuenow={time}
        aria-valuemin={0}
        aria-valuemax={totalSeconds}
      >
        <circle
          cx={50}
          cy={50}
          r={45}
          stroke="border"
          strokeWidth={8}
          fill="none"
          className="text-muted-foreground"
        />
        <circle
          cx={50}
          cy={50}
          r={45}
          stroke="primary"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <Clock className="h-3 w-3 text-muted-foreground" aria-hidden />
        <span className="font-mono tabular-nums font-semibold text-foreground">
          {Math.floor(time / 60).toString().padStart(2, "0")}:{time
            .toString()
            .padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Zap, X } from "lucide-react";

const SALE_END = new Date("2026-06-03T23:59:59+05:00");

function getTimeLeft() {
  const diff = SALE_END.getTime() - Date.now();
  if (diff <= 0) return null;
  const h = Math.floor(diff / 1000 / 3600);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { h, m, s };
}

export function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (dismissed || !timeLeft) return null;

  return (
    <div className="relative bg-gradient-to-r from-[oklch(0.22_0.07_162)] via-[oklch(0.25_0.08_162)] to-[oklch(0.22_0.07_162)] text-ivory px-6 py-3 flex items-center justify-center gap-4 flex-wrap overflow-hidden">
      <div className="absolute inset-0 jaali-emerald opacity-10 pointer-events-none" />

      <div className="relative flex items-center gap-2.5">
        <Zap className="h-3.5 w-3.5 text-gold-warm flex-shrink-0" strokeWidth={1.5} fill="currentColor" />
        <p className="text-[11px] uppercase tracking-luxe text-gold-warm font-medium">
          Flash Sale — Up to 66% Off
        </p>
      </div>

      <div className="relative flex items-center gap-2 text-ivory">
        <p className="text-[10px] uppercase tracking-luxe text-ivory/60">Ends in</p>
        <div className="flex items-center gap-1.5">
          <Digit value={timeLeft.h} label="HRS" />
          <span className="text-gold-warm font-display text-lg leading-none pb-3">:</span>
          <Digit value={timeLeft.m} label="MIN" />
          <span className="text-gold-warm font-display text-lg leading-none pb-3">:</span>
          <Digit value={timeLeft.s} label="SEC" />
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="relative ml-2 text-ivory/40 hover:text-ivory transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-xl leading-none tabular-nums text-ivory min-w-[2ch] text-center">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[8px] uppercase tracking-widest text-ivory/40 mt-0.5">{label}</span>
    </div>
  );
}

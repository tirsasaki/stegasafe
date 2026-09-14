"use client";

import { formatBytes } from "@/lib/validation/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function CapacityIndicator({ used, maximum }: { used: number; maximum: number }) {
  const { language } = useLanguage();
  const percent = maximum ? Math.min(100, (used / maximum) * 100) : 100;
  const color = percent > 90 ? "bg-rose-500" : percent > 70 ? "bg-amber-500" : "bg-emerald-500";
  const label = language === "en"
    ? (percent > 90 ? "Almost full" : percent > 70 ? "Attention needed" : "Capacity available")
    : (percent > 90 ? "Hampir penuh" : percent > 70 ? "Perlu perhatian" : "Kapasitas aman");
  const aria = language === "en"
    ? `Capacity usage ${percent.toFixed(0)} percent, ${label}`
    : `Penggunaan kapasitas ${percent.toFixed(0)} persen, ${label}`;
  return (
    <div aria-label={aria}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-slate-500 dark:text-slate-400">{formatBytes(used)} / {formatBytes(maximum)} ({percent.toFixed(0)}%)</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className={`h-full rounded-full transition-all duration-300 ${color}`} style={{ width: `${percent}%` }} /></div>
    </div>
  );
}

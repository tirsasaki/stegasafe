"use client";

import type { ImageInfo } from "@/types/steganography";
import { formatBytes } from "@/lib/validation/image";
import { FileImage } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function ImagePreview({ image, label }: { image: ImageInfo; label?: string }) {
  const { language } = useLanguage();
  const fallback = language === "en" ? "Selected image" : "Gambar terpilih";
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex max-h-80 min-h-52 items-center justify-center bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0] p-3 dark:opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.url} alt={label ?? fallback} className="max-h-72 max-w-full rounded-lg object-contain" />
      </div>
      <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
        <span className="inline-flex min-w-0 items-center gap-2 font-medium"><FileImage className="size-4 shrink-0 text-indigo-500" /><span className="truncate">{image.name}</span></span>
        <span className="text-slate-500 dark:text-slate-400">{formatBytes(image.size)}</span>
        <span className="text-slate-500 dark:text-slate-400">{image.width} × {image.height} px</span>
      </figcaption>
    </figure>
  );
}

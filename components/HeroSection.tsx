"use client";

import { ArrowDown, ArrowRight, FileImage, KeyRound, LockKeyhole, MessageSquareText, ServerOff } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

function chooseMode(mode: "encode" | "decode") {
  window.dispatchEvent(new CustomEvent("stegasafe-mode", { detail: mode }));
}

const copy = {
  en: {
    eyebrow: "Privacy, directly on your device",
    title: "Hide Messages Inside Images",
    subtitle: "Protect and embed secret messages inside PNG images. Everything is processed directly on your device.",
    encode: "Start Hiding",
    decode: "Extract Message",
    local: "100% processed in your browser",
    noUpload: "No server uploads",
    encryption: "Optional encryption",
    message: "Message",
    png: "Protected PNG",
    explanation: "Tiny changes to color bits store data without being visible to the eye.",
    illustration: "Illustration of a message being embedded into an image",
  },
  id: {
    eyebrow: "Privasi langsung di perangkat Anda",
    title: "Sembunyikan Pesan di Dalam Gambar",
    subtitle: "Lindungi dan sisipkan pesan rahasia ke dalam gambar PNG. Semua diproses langsung di perangkat Anda.",
    encode: "Mulai Menyembunyikan",
    decode: "Ekstrak Pesan",
    local: "100% diproses di browser",
    noUpload: "Tanpa upload ke server",
    encryption: "Enkripsi opsional",
    message: "Pesan",
    png: "PNG aman",
    explanation: "Perubahan kecil pada bit warna menyimpan data tanpa terlihat oleh mata.",
    illustration: "Ilustrasi pesan dimasukkan ke gambar",
  },
};

export default function HeroSection() {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <section id="beranda" className="container-page grid items-center gap-10 pb-10 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:pb-14 lg:pt-24">
      <div className="max-w-3xl">
        <p className="eyebrow mb-4">{c.eyebrow}</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">{c.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{c.subtitle}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#alat" onClick={() => chooseMode("encode")} className="btn-primary">{c.encode} <ArrowDown className="size-4" /></a>
          <a href="#alat" onClick={() => chooseMode("decode")} className="btn-secondary">{c.decode} <ArrowRight className="size-4" /></a>
        </div>
        <div className="mt-7 flex flex-wrap gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900"><LockKeyhole className="size-3.5 text-indigo-600" />{c.local}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900"><ServerOff className="size-3.5 text-indigo-600" />{c.noUpload}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900"><KeyRound className="size-3.5 text-indigo-600" />{c.encryption}</span>
        </div>
      </div>
      <div className="card relative mx-auto w-full max-w-md overflow-hidden p-6 sm:p-8" aria-label={c.illustration}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-center dark:border-indigo-900 dark:bg-indigo-950/40"><MessageSquareText className="mx-auto size-9 text-indigo-600 dark:text-indigo-400" /><p className="mt-2 text-sm font-semibold">{c.message}</p><div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-indigo-200 dark:bg-indigo-800" /></div>
          <ArrowRight className="size-6 text-slate-400" />
          <div className="relative rounded-2xl border border-violet-100 bg-violet-50 p-5 text-center dark:border-violet-900 dark:bg-violet-950/30"><FileImage className="mx-auto size-9 text-violet-600 dark:text-violet-400" /><p className="mt-2 text-sm font-semibold">{c.png}</p><span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900"><LockKeyhole className="size-3.5" /></span></div>
        </div>
        <div className="mt-6 grid grid-cols-12 gap-1" aria-hidden="true">{Array.from({ length: 36 }, (_, index) => <span key={index} className={"aspect-square rounded-sm " + (index % 5 === 0 ? "bg-indigo-500" : index % 3 === 0 ? "bg-violet-300 dark:bg-violet-700" : "bg-slate-200 dark:bg-slate-700")} />)}</div>
        <p className="mt-5 text-center text-sm leading-6 text-slate-500 dark:text-slate-400">{c.explanation}</p>
      </div>
    </section>
  );
}

"use client";

import { ShieldCheck } from "lucide-react";
import { sectionIds, useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const year = new Date().getFullYear();
  const { language } = useLanguage();
  const en = language === "en";
  const ids = sectionIds[language];
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
      <div className="container-page grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl"><div className="flex items-center gap-2 font-bold"><ShieldCheck className="size-5 text-indigo-600" />StegaSafe</div><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{en ? "A browser-only PNG steganography tool. Use it only for lawful and responsible purposes." : "Alat steganografi PNG yang bekerja sepenuhnya di browser. Gunakan untuk tujuan yang sah dan bertanggung jawab."}</p></div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium" aria-label={en ? "Footer navigation" : "Navigasi footer"}>
          <a href={`#${ids.howItWorks}`} className="hover:text-indigo-600">{en ? "How It Works" : "Cara Kerja"}</a><a href={`#${ids.security}`} className="hover:text-indigo-600">{en ? "Security" : "Keamanan"}</a><a href={`#${ids.faq}`} className="hover:text-indigo-600">FAQ</a><a href={`#${ids.security}`} className="hover:text-indigo-600">{en ? "Privacy" : "Privasi"}</a>
        </nav>
      </div>
      <div className="container-page mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">© {year} StegaSafe.</div>
    </footer>
  );
}

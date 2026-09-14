"use client";

import { ImageIcon, Menu, Moon, ShieldCheck, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["Beranda", "#beranda"],
  ["Cara Kerja", "#cara-kerja"],
  ["Keamanan", "#keamanan"],
  ["FAQ", "#faq"],
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stegasafe-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = saved ? saved === "dark" : prefersDark;
    setDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("stegasafe-theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-slate-50/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#beranda" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          <span className="relative grid size-9 place-items-center rounded-xl bg-indigo-600 text-white">
            <ShieldCheck className="size-5" aria-hidden="true" />
            <ImageIcon className="absolute -bottom-0.5 -right-0.5 size-3 rounded bg-violet-600 p-0.5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">StegaSafe</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:text-indigo-400">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} className="btn-secondary size-10 min-h-10 px-0" aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="btn-secondary size-10 min-h-10 px-0 md:hidden" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Buka menu">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="container-page grid gap-1 border-t border-slate-200 py-3 md:hidden dark:border-slate-800" aria-label="Navigasi mobile">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-slate-900 dark:hover:text-indigo-300">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

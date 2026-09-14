"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "id";
export type SectionName = "home" | "tool" | "howItWorks" | "security" | "faq";

export const sectionIds: Record<Language, Record<SectionName, string>> = {
  en: {
    home: "home",
    tool: "tool",
    howItWorks: "how-it-works",
    security: "security",
    faq: "faq",
  },
  id: {
    home: "beranda",
    tool: "alat",
    howItWorks: "cara-kerja",
    security: "keamanan",
    faq: "faq",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function localizeCurrentHash(nextLanguage: Language) {
  const currentId = window.location.hash.slice(1);
  if (!currentId) return;

  const section = (Object.keys(sectionIds.en) as SectionName[]).find(
    (name) => sectionIds.en[name] === currentId || sectionIds.id[name] === currentId,
  );
  if (!section) return;

  const nextId = sectionIds[nextLanguage][section];
  if (nextId !== currentId) {
    window.history.replaceState(null, "", `#${nextId}`);
  }

  window.requestAnimationFrame(() => {
    document.getElementById(nextId)?.scrollIntoView();
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("stegasafe-language");
    const initialLanguage: Language = saved === "id" ? "id" : "en";
    setLanguageState(initialLanguage);
    localizeCurrentHash(initialLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(next: Language) {
    setLanguageState(next);
    localStorage.setItem("stegasafe-language", next);
    localizeCurrentHash(next);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "id" : "en"),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

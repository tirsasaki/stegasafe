"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "id";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("stegasafe-language");
    if (saved === "en" || saved === "id") setLanguageState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(next: Language) {
    setLanguageState(next);
    localStorage.setItem("stegasafe-language", next);
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

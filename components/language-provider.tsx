"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { languages, type Language } from "../app/flavours";

const storageKey = "raya-language";
const listeners = new Set<() => void>();
let currentLanguage: Language | undefined;

function getLanguage(): Language {
  if (currentLanguage === undefined) {
    currentLanguage = "en";
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (languages.includes(saved as Language)) currentLanguage = saved as Language;
    } catch {
      // Keep language selection usable when browser storage is unavailable.
    }
  }
  return currentLanguage;
}

function getServerLanguage(): Language {
  return "en";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function setLanguage(language: Language) {
  if (!languages.includes(language)) return;
  currentLanguage = language;
  try {
    window.localStorage.setItem(storageKey, language);
  } catch {
    // The in-memory selection still persists across client-side navigation.
  }
  listeners.forEach((listener) => listener());
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The server snapshot also supplies the first hydration render; storage is
  // read only on the client, without writing the default back on mount.
  const language = useSyncExternalStore(subscribe, getLanguage, getServerLanguage);
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

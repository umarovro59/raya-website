"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  heroCopy,
  languages,
  navigation,
  type Language,
} from "../app/flavours";
import { siteRoutes } from "./site-routes";

export function SiteHeader({
  language,
  menuOpen,
  onLanguageChange,
  onMenuToggle,
  onMenuClose,
}: {
  language: Language;
  menuOpen: boolean;
  onLanguageChange: (language: Language) => void;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}) {
  const pathname = usePathname();
  const links = navigation[language];

  useEffect(() => {
    onMenuClose();
  }, [pathname, onMenuClose]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMenuClose();
    };
    const desktop = window.matchMedia("(min-width: 801px)");
    const handleResize = () => {
      if (desktop.matches) onMenuClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleResize);
    };
  }, [menuOpen, onMenuClose]);

  return (
    <>
      <header className="site-header">
        <Link
          className="wordmark"
          href="/"
          aria-label="RAYA home"
          onClick={onMenuClose}
        >
          RAYA
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {links.map((link, index) => (
            <Link
              className={pathname === siteRoutes[index] ? "is-current" : ""}
              href={siteRoutes[index]}
              key={siteRoutes[index]}
              aria-current={pathname === siteRoutes[index] ? "page" : undefined}
            >
              {link}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <div className="language-switcher" aria-label="Select language">
            {languages.map((item) => (
              <button
                className={item === language ? "is-active" : ""}
                key={item}
                type="button"
                onClick={() => onLanguageChange(item)}
                aria-pressed={item === language}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="menu-button"
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? heroCopy[language].close : heroCopy[language].menu}
          </button>
        </div>
      </header>
      <div
        className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-navigation-links">
          {links.map((link, index) => (
            <Link
              className={pathname === siteRoutes[index] ? "is-current" : ""}
              href={siteRoutes[index]}
              key={siteRoutes[index]}
              onClick={onMenuClose}
              aria-current={pathname === siteRoutes[index] ? "page" : undefined}
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="mobile-language-switcher">
          {languages.map((item) => (
            <button
              className={item === language ? "is-active" : ""}
              key={item}
              type="button"
              onClick={() => onLanguageChange(item)}
              aria-pressed={item === language}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

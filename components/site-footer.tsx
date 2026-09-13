import Link from "next/link";
import { type MouseEvent } from "react";
import { navigation, type Language } from "../app/flavours";
import { siteRoutes } from "./site-routes";

export function SiteFooter({
  language,
  onLanguageChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const handleLanguageClick = (
    event: MouseEvent<HTMLButtonElement>,
    next: Language,
  ) => {
    event.preventDefault();
    onLanguageChange(next);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-brand">RAYA</div>
      <div className="site-footer-column">
        <span className="site-footer-label">
          {language === "ru"
            ? "НАВИГАЦИЯ"
            : language === "uz"
              ? "NAVIGATSIYA"
              : "NAVIGATION"}
        </span>
        <nav aria-label="Footer navigation">
          {navigation[language].map((label, index) => (
            <Link href={siteRoutes[index]} key={siteRoutes[index]}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="site-footer-column site-footer-note">
        <p>
          {language === "ru"
            ? "Произведено в Андижане, Узбекистан."
            : language === "uz"
              ? "Andijon, O'zbekistonda ishlab chiqarilgan."
              : "Made in Andijan, Uzbekistan."}
        </p>
        <div className="site-footer-languages" aria-label="Select language">
          {(["uz", "ru", "en"] as Language[]).map((item) => (
            <button
              className={item === language ? "is-active" : ""}
              key={item}
              type="button"
              onClick={(event) => handleLanguageClick(event, item)}
              aria-pressed={item === language}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        <small>UNOFFICIAL CONCEPT WEBSITE</small>
      </div>
    </footer>
  );
}

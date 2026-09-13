"use client";

import Image from "next/image";
import { startTransition, useCallback, useEffect, useState } from "react";
import { flavours, languages, type Language } from "../app/flavours";
import { siteContent, type SitePage } from "../app/site-content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const languageStorageKey = "raya-language";

function PlaceholderImage({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div
      className={`editorial-placeholder ${className}`}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}

function StoryPage({ copy }: { copy: Record<string, string> }) {
  return (
    <div className="brand-page story-page">
      <section className="brand-hero brand-hero-story">
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
      </section>
      <section className="story-origin brand-band">
        <div>
          <p className="brand-eyebrow">ORIGIN</p>
          <h2>{copy.origin}</h2>
        </div>
      </section>
      <section className="story-identity brand-band">
        <div className="identity-copy">
          <p className="brand-eyebrow">PRODUCT IDENTITY</p>
          <h2>{copy.identity}</h2>
        </div>
        <div className="identity-water">
          <p>{copy.water}</p>
        </div>
      </section>
      <section className="story-closing brand-band">
        <h2>{copy.closing}</h2>
      </section>
    </div>
  );
}

function IngredientsPage({
  copy,
  language,
}: {
  copy: Record<string, string>;
  language: Language;
}) {
  return (
    <div className="brand-page ingredients-page">
      <section className="brand-hero brand-hero-ingredients">
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
      </section>
      <section className="ingredient-rail">
        <article className="ingredient-feature ingredient-fruit">
          <h2>{copy.fruit}</h2>
          <p>{copy.fruitCopy}</p>
          <div className="ingredient-fruit-row">
            {flavours.map((flavour) => (
              <div className="ingredient-fruit-item" key={flavour.id}>
                <Image
                  src={flavour.image}
                  alt={flavour.name[language]}
                  width={180}
                  height={240}
                  unoptimized
                />
                <small>{flavour.name[language]}</small>
              </div>
            ))}
          </div>
        </article>
        <article className="ingredient-feature ingredient-fizz">
          <h2>{copy.fizz}</h2>
          <p>{copy.fizzCopy}</p>
        </article>
        <article className="ingredient-feature ingredient-water">
          <h2>{copy.water}</h2>
          <p>{copy.waterCopy}</p>
        </article>
      </section>
    </div>
  );
}

function LifestylePage({ copy }: { copy: Record<string, string> }) {
  return (
    <div className="brand-page lifestyle-page">
      <section className="brand-hero brand-hero-lifestyle">
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
      </section>
      <section className="lifestyle-image-wide">
        <PlaceholderImage label={copy.imageOne} className="placeholder-wide" />
      </section>
      <section className="lifestyle-statement brand-band">
        <h2>{copy.statement}</h2>
        <p>{copy.note}</p>
      </section>
      <section className="lifestyle-image-pair">
        <PlaceholderImage label={copy.imageTwo} className="placeholder-tall" />
        <PlaceholderImage
          label={copy.imageThree}
          className="placeholder-short"
        />
      </section>
    </div>
  );
}

function WhereToBuyPage({ copy }: { copy: Record<string, string> }) {
  return (
    <div className="brand-page where-page">
      <section className="brand-hero brand-hero-where">
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
      </section>
      <section className="locator-panel">
        <div className="locator-copy">
          <span className="brand-eyebrow">RAYA / LOCATOR</span>
          <h2>{copy.comingSoon}</h2>
          <p>{copy.note}</p>
        </div>
        <div className="locator-field" aria-label={copy.search}>
          {copy.search}
          <span>+</span>
        </div>
      </section>
      <section className="locator-product">
        <Image
          src="/images/cans/pomegranate.webp"
          alt="RAYA Pomegranate can"
          fill
          unoptimized
          sizes="(max-width: 700px) 80vw, 440px"
        />
      </section>
    </div>
  );
}

export function BrandPage({ page }: { page: SitePage }) {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = siteContent[language][page];

  useEffect(() => {
    const saved = window.localStorage.getItem(
      languageStorageKey,
    ) as Language | null;
    if (saved && languages.includes(saved)) {
      startTransition(() => setLanguage(saved));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  const handleMenuToggle = useCallback(() => setMenuOpen((open) => !open), []);
  const handleMenuClose = useCallback(() => setMenuOpen(false), []);
  const handleLanguageChange = useCallback((next: Language) => {
    setLanguage(next);
    setMenuOpen(false);
  }, []);

  return (
    <main className="brand-shell">
      <SiteHeader
        language={language}
        menuOpen={menuOpen}
        onLanguageChange={handleLanguageChange}
        onMenuToggle={handleMenuToggle}
        onMenuClose={handleMenuClose}
      />
      {page === "story" && <StoryPage copy={copy} />}
      {page === "ingredients" && (
        <IngredientsPage copy={copy} language={language} />
      )}
      {page === "lifestyle" && <LifestylePage copy={copy} />}
      {page === "whereToBuy" && <WhereToBuyPage copy={copy} />}
      <SiteFooter language={language} onLanguageChange={setLanguage} />
    </main>
  );
}

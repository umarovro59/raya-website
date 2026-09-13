"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import {
  flavours,
  heroCopy,
  languages,
  navigation,
  type FlavourId,
  type Language,
} from "./flavours";

const languageStorageKey = "raya-language";

function Header({
  language,
  menuOpen,
  onLanguageChange,
  onMenuToggle,
}: {
  language: Language;
  menuOpen: boolean;
  onLanguageChange: (language: Language) => void;
  onMenuToggle: () => void;
}) {
  const links = navigation[language];
  return (
    <header className="site-header">
      <a className="wordmark" href="#hero" aria-label="RAYA home">
        RAYA
      </a>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {links.map((link) => (
          <a href="#" key={link}>
            {link}
          </a>
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
  );
}

function MobileNavigation({
  language,
  open,
  onLanguageChange,
  onClose,
}: {
  language: Language;
  open: boolean;
  onLanguageChange: (language: Language) => void;
  onClose: () => void;
}) {
  return (
    <div
      className={`mobile-navigation ${open ? "is-open" : ""}`}
      id="mobile-navigation"
      aria-hidden={!open}
    >
      <div className="mobile-navigation-links">
        {navigation[language].map((link) => (
          <a href="#" key={link} onClick={onClose}>
            {link}
          </a>
        ))}
      </div>
      <div className="mobile-language-switcher">
        {languages.map((item) => (
          <button
            className={item === language ? "is-active" : ""}
            key={item}
            type="button"
            onClick={() => onLanguageChange(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCan({
  flavour,
  transitioning,
  initialAnimation,
  onTransitionEnd,
}: {
  flavour: (typeof flavours)[number];
  transitioning: boolean;
  initialAnimation: boolean;
  onTransitionEnd: () => void;
}) {
  return (
    <div
      className={`product-can ${initialAnimation ? "is-initial" : ""} ${transitioning ? "is-changing" : ""}`}
      onAnimationEnd={onTransitionEnd}
    >
      <Image
        src={flavour.image}
        alt={`RAYA ${flavour.name.en} can`}
        fill
        priority
        loading="eager"
        sizes="(max-width: 700px) 70vw, 460px"
      />
    </div>
  );
}

function MobileFlavourSequence({ language }: { language: Language }) {
  return (
    <div className="mobile-flavour-sequence">
      {flavours.map((flavour) => (
        <section
          className="mobile-flavour-panel"
          key={flavour.id}
          style={
            {
              "--panel-bg": flavour.background,
              "--panel-light": flavour.light,
              "--panel-text": flavour.textColor,
            } as React.CSSProperties
          }
        >
          <div className="mobile-panel-copy">
            <p>{flavour.name[language]}</p>
            <h2>{heroCopy[language].title}</h2>
            <span>{flavour.copy[language]}</span>
          </div>
          <div className="mobile-panel-product">
            <div className="mobile-panel-light" aria-hidden="true" />
            <Image
              src={flavour.image}
              alt={`RAYA ${flavour.name.en} can`}
              fill
              sizes="(max-width: 700px) 76vw, 0px"
            />
          </div>
          <div className="mobile-panel-lockup">
            <strong>{flavour.name[language]}</strong>
            <span>{flavour.copy[language]}</span>
            <small>330 ML</small>
          </div>
        </section>
      ))}
    </div>
  );
}

function FlavourSelector({
  activeId,
  onSelect,
  language,
}: {
  activeId: FlavourId;
  onSelect: (id: FlavourId) => void;
  language: Language;
}) {
  return (
    <nav className="flavour-selector" aria-label="Select flavour">
      {flavours.map((flavour) => (
        <button
          className={flavour.id === activeId ? "is-active" : ""}
          key={flavour.id}
          type="button"
          onClick={() => onSelect(flavour.id)}
        >
          {flavour.name[language]}
        </button>
      ))}
    </nav>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeId, setActiveId] = useState<FlavourId>("pomegranate");
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const activeFlavour =
    flavours.find((flavour) => flavour.id === activeId) ?? flavours[0];
  const copy = heroCopy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      languageStorageKey,
    ) as Language | null;
    if (savedLanguage && languages.includes(savedLanguage)) {
      startTransition(() => setLanguage(savedLanguage));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  useEffect(() => {
    const preloadImages = flavours.map((flavour) => {
      const image = new window.Image();
      image.src = flavour.image;
      return image.decode?.().catch(() => undefined);
    });
    return () => {
      preloadImages.length = 0;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectFlavour = (id: FlavourId) => {
    if (id === activeId) return;
    setTransitioning(true);
    setActiveId(id);
  };

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };

  return (
    <main
      className={`campaign ${transitioning ? "is-transitioning" : ""} ${hasScrolled ? "has-scrolled" : ""}`}
      id="hero"
      style={
        {
          "--flavour-bg": activeFlavour.background,
          "--flavour-light": activeFlavour.light,
          "--flavour-text": activeFlavour.textColor,
        } as React.CSSProperties
      }
    >
      <Header
        language={language}
        menuOpen={menuOpen}
        onLanguageChange={selectLanguage}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />
      <MobileNavigation
        language={language}
        open={menuOpen}
        onLanguageChange={selectLanguage}
        onClose={() => setMenuOpen(false)}
      />
      <section className="hero-content" aria-label="RAYA flavour campaign">
        <div className="copy-block">
          <p className="flavour-kicker">{activeFlavour.name[language]}</p>
          <h1 className={`hero-title language-${language}`}>{copy.title}</h1>
          <p className="hero-copy">{activeFlavour.copy[language]}</p>
        </div>
        <div className="product-scene">
          <div className="radial-light" aria-hidden="true" />
          <ProductCan
            flavour={activeFlavour}
            transitioning={transitioning}
            initialAnimation={initialAnimation}
            onTransitionEnd={() => {
              if (initialAnimation) setInitialAnimation(false);
              if (transitioning) setTransitioning(false);
            }}
          />
          <div className="contact-shadow" aria-hidden="true" />
        </div>
        <div className="flavour-lockup">
          <h2>{activeFlavour.name[language]}</h2>
          <p>{activeFlavour.copy[language]}</p>
          <span>330 ML</span>
        </div>
      </section>
      <MobileFlavourSequence language={language} />
      <FlavourSelector
        activeId={activeId}
        onSelect={selectFlavour}
        language={language}
      />
      <div className="scroll-cue" aria-hidden="true">
        <span>FLAVOURS ↓</span>
      </div>
    </main>
  );
}

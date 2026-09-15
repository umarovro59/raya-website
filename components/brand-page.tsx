"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { flavours, type Language } from "../app/flavours";
import { siteContent, type SitePage } from "../app/site-content";
import lifestyleStyles from "../app/lifestyle/lifestyle.module.css";
import heroStyles from "./editorial-hero.module.css";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

import { useLanguage } from "./language-provider";
import { useViewportReveal } from "./use-viewport-reveal";

function StoryPage({ copy }: { copy: Record<string, string> }) {
  return (
    <div className="brand-page story-page">
      <section className={`brand-hero brand-hero-story ${heroStyles.entrance}`}>
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
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
      <section className={`brand-hero ${heroStyles.hero} ${heroStyles.ingredients} ${heroStyles.entrance}`}>
        <div className={heroStyles.copy}>
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
        </div>
        <div className={heroStyles.image}>
          <Image
            src="/images/ingredients/234cc859-8599-49fe-baac-29729e84dacc.png"
            alt={copy.fruit}
            fill
            sizes="(max-width: 800px) 92vw, 45vw"
            loading="eager"
          />
        </div>
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

const lifestylePhotos = [
  { file: "677496ed-0b12-44a8-97e5-648d207846b0.png", width: 1672, height: 941, alt: "RAYA Mojito, Blackberry, Pear, Apple and Malt" },
  { file: "Pomegranate.png", width: 1122, height: 1402, alt: "RAYA Pomegranate" },
  { file: "68b7d857-5f0e-4ea0-bec2-07f85e6d92ae.png", width: 1122, height: 1402, alt: "RAYA Blackberry" },
  { file: "702f390b-23d7-422b-862f-deeb71a68a15.png", width: 1254, height: 1254, alt: "RAYA Pear & Pomegranate" },
  { file: "AppleandBarley.png", width: 1122, height: 1402, alt: "RAYA Apple and Malt" },
  { file: "c6ec8247-f444-43fc-820a-698e85376e8b.png", width: 1086, height: 1448, alt: "RAYA Apple and Malt, Blackberry & Pomegranate" },
  { file: "f93be947-6d79-4678-b1dc-8eb3e938d715.png", width: 1122, height: 1402, alt: "RAYA Pomegranate & Pear" },
];

function LifestylePage({ copy }: { copy: Record<string, string> }) {
  return (
    <div className={`brand-page lifestyle-page ${lifestyleStyles.page}`}>
      <section className={`brand-hero ${heroStyles.hero} ${heroStyles.lifestyle} ${heroStyles.entrance}`}>
        <div className={heroStyles.copy}>
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
        </div>
        <div className={heroStyles.image}>
          <Image
            src="/images/lifestyle/AppleandBarley.png"
            alt="RAYA Apple and Malt"
            fill
            sizes="(max-width: 800px) 83vw, 37vw"
            loading="eager"
          />
        </div>
      </section>
      <section className={lifestyleStyles.collage} aria-label={copy.eyebrow}>
        {lifestylePhotos.map((photo, index) => (
          <div className={lifestyleStyles.photo} key={photo.file}>
            <Image
              src={`/images/lifestyle/${photo.file}`}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={index === 0
                ? "(max-width: 800px) 92vw, 54vw"
                : "(max-width: 800px) 86vw, 32vw"}
              loading={index === 0 ? "eager" : "lazy"}
              data-reveal
            />
          </div>
        ))}
        <p className={lifestyleStyles.caption} data-reveal>{copy.caption}</p>
        <h2 className={lifestyleStyles.statement} data-reveal>{copy.statement}</h2>
      </section>
    </div>
  );
}

function WhereToBuyPage({ copy }: { copy: Record<string, string> }) {
  return (
    <div className="brand-page where-page">
      <section className={`brand-hero brand-hero-where ${heroStyles.entrance}`}>
        <p className="brand-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="brand-intro">{copy.intro}</p>
      </section>
      <section className={`availability-panel ${heroStyles.entrance}`}>
        <p className="brand-eyebrow" data-reveal>{copy.availability}</p>
        <h2 data-reveal>{copy.availabilityTitle}</h2>
        <p className="availability-note" data-reveal>{copy.note}</p>
      </section>
    </div>
  );
}

export function BrandPage({ page }: { page: SitePage }) {
  const revealRef = useViewportReveal(page);
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = siteContent[language][page];

  const handleMenuToggle = useCallback(() => setMenuOpen((open) => !open), []);
  const handleMenuClose = useCallback(() => setMenuOpen(false), []);
  const handleLanguageChange = useCallback((next: Language) => {
    setLanguage(next);
  }, [setLanguage]);

  return (
    <main className="brand-shell" ref={revealRef}>
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
      <SiteFooter language={language} onLanguageChange={handleLanguageChange} />
    </main>
  );
}

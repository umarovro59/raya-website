"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  flavours,
  heroCopy,
  type FlavourId,
  type Language,
} from "./flavours";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

import { useLanguage } from "../components/language-provider";

function ProductCan({
  flavour,
  transitionPhase,
  initialAnimation,
  onInitialAnimationEnd,
  onProductOut,
  onProductIn,
  onProductReady,
}: {
  flavour: (typeof flavours)[number];
  transitionPhase: "idle" | "waiting" | "out" | "swap" | "in";
  initialAnimation: boolean;
  onInitialAnimationEnd: () => void;
  onProductOut: () => void;
  onProductIn: () => void;
  onProductReady: (id: FlavourId) => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isWobbling, setIsWobbling] = useState(false);
  const reportImageReady = useCallback(
    async (image: HTMLImageElement) => {
      const source = image.currentSrc || image.src;

      try {
        if (image.decode) await image.decode();
      } catch {
        if (!image.complete || image.naturalWidth === 0) return;
      }

      if (
        imageRef.current === image &&
        (image.currentSrc || image.src) === source
      ) {
        onProductReady(flavour.id);
      }
    },
    [flavour.id, onProductReady],
  );

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      void reportImageReady(image);
    }
  }, [reportImageReady]);

  return (
    <div
      className={`product-visual ${initialAnimation ? "is-initial" : ""} product-visual-${transitionPhase}`}
      onAnimationEnd={(event) => {
        if (event.animationName === "product-reveal") onInitialAnimationEnd();
      }}
      onTransitionEnd={(event) => {
        if (
          event.target === event.currentTarget &&
          event.propertyName === "opacity"
        ) {
          if (transitionPhase === "out") onProductOut();
          if (transitionPhase === "in") onProductIn();
        }
      }}
    >
      <div
        className={`product-can ${initialAnimation ? "is-initial" : ""} product-can-${transitionPhase} ${isWobbling ? "is-wobbling" : ""}`}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") setIsWobbling(true);
        }}
        onAnimationEnd={(event) => {
          if (event.animationName === "can-wobble") setIsWobbling(false);
        }}
      >
        <Image
          ref={imageRef}
          src={flavour.image}
          alt={`RAYA ${flavour.name.en} can`}
          fill
          priority
          unoptimized
          decoding="async"
          onLoad={(event) => void reportImageReady(event.currentTarget)}
        />
      </div>
    </div>
  );
}

function MobileCan({
  flavour,
  canZoomed,
}: {
  flavour: (typeof flavours)[number];
  canZoomed: boolean;
}) {
  const [isWobbling, setIsWobbling] = useState(false);

  return (
    <div
      className={`mobile-can-interaction ${isWobbling ? "is-wobbling" : ""}`}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") setIsWobbling(true);
      }}
      onAnimationEnd={(event) => {
        if (event.animationName === "can-wobble") setIsWobbling(false);
      }}
    >
      <Image
        className={`mobile-panel-can ${canZoomed ? "is-zoomed" : ""}`}
        src={flavour.image}
        alt={`RAYA ${flavour.name.en} can`}
        fill
        unoptimized
        loading={flavour.id === "pomegranate" ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

function MobileFlavourSequence({
  language,
  canZoomed,
}: {
  language: Language;
  canZoomed: boolean;
}) {
  return (
    <div className="mobile-flavour-sequence">
      {flavours.map((flavour) => (
        <section
          className="mobile-flavour-panel"
          data-flavour={flavour.id}
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
            <MobileCan flavour={flavour} canZoomed={canZoomed} />
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
  const { language, setLanguage } = useLanguage();
  const [activeId, setActiveId] = useState<FlavourId>("pomegranate");
  const [displayedFlavourId, setDisplayedFlavourId] =
    useState<FlavourId>("pomegranate");
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<
    "idle" | "waiting" | "out" | "swap" | "in"
  >("idle");
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileCanZoomed, setMobileCanZoomed] = useState(false);
  const [backgroundBaseId, setBackgroundBaseId] =
    useState<FlavourId>("pomegranate");
  const [backgroundTransitioning, setBackgroundTransitioning] = useState(false);
  const readyFlavoursRef = useRef<Set<FlavourId>>(new Set(["pomegranate"]));
  const activeIdRef = useRef<FlavourId>("pomegranate");
  const mobileCanZoomedRef = useRef(false);
  const [readyVersion, setReadyVersion] = useState(0);
  const [displayedImageReadyId, setDisplayedImageReadyId] =
    useState<FlavourId | null>("pomegranate");
  const activeFlavour =
    flavours.find((flavour) => flavour.id === activeId) ?? flavours[0];
  const displayedFlavour =
    flavours.find((flavour) => flavour.id === displayedFlavourId) ??
    flavours[0];
  const backgroundBaseFlavour =
    flavours.find((flavour) => flavour.id === backgroundBaseId) ?? flavours[0];
  const copy = heroCopy[language];

  useEffect(() => {
    let cancelled = false;
    const preloadFlavours = window.matchMedia("(min-width: 801px)").matches
      ? flavours
      : flavours.slice(0, 2);
    const preloadImages = preloadFlavours.map(async (flavour) => {
      const image = new window.Image();
      image.decoding = "async";
      image.fetchPriority = flavour.id === "pomegranate" ? "high" : "low";
      image.src = flavour.image;
      try {
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () =>
            reject(new Error(`Failed to load ${flavour.id}`));
        });
        if (image.decode) await image.decode();
        if (!cancelled) {
          readyFlavoursRef.current.add(flavour.id);
          setReadyVersion((version) => version + 1);
        }
      } catch {
        return;
      }
    });
    return () => {
      cancelled = true;
      void Promise.allSettled(preloadImages);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 28) return;

      setHasScrolled(true);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMobileCanZoom = () => {
      if (window.innerWidth > 800) return;
      const scrollY = window.scrollY;
      if (!mobileCanZoomedRef.current && scrollY > 16) {
        mobileCanZoomedRef.current = true;
        setMobileCanZoomed(true);
      } else if (mobileCanZoomedRef.current && scrollY <= 2) {
        mobileCanZoomedRef.current = false;
        setMobileCanZoomed(false);
      }
    };
    window.addEventListener("scroll", handleMobileCanZoom, { passive: true });
    handleMobileCanZoom();
    return () => window.removeEventListener("scroll", handleMobileCanZoom);
  }, []);

  const selectFlavour = (id: FlavourId) => {
    if (id === activeId) return;
    setInitialAnimation(false);
    activeIdRef.current = id;
    setBackgroundBaseId(activeId);
    setBackgroundTransitioning(true);
    setActiveId(id);
    if (transitionPhase === "idle" || transitionPhase === "waiting") {
      if (id === displayedFlavourId) setTransitionPhase("idle");
      else if (readyFlavoursRef.current.has(id)) setTransitionPhase("out");
      else setTransitionPhase("waiting");
    }
  };

  useEffect(() => {
    if (transitionPhase === "idle" || transitionPhase === "waiting") {
      if (
        activeId !== displayedFlavourId &&
        readyFlavoursRef.current.has(activeId)
      ) {
        setTransitionPhase("out");
      }
      return;
    }
    if (transitionPhase !== "swap") return;
    // Stay fully hidden while the latest selection loads, including clicks
    // received during OUT or SWAP. Never return to visible WAITING after OUT.
    if (activeId !== displayedFlavourId) {
      if (readyFlavoursRef.current.has(activeId)) {
        setDisplayedImageReadyId(null);
        setDisplayedFlavourId(activeId);
      }
      return;
    }
    if (displayedImageReadyId !== displayedFlavourId) return;
    const frame = window.requestAnimationFrame(() => setTransitionPhase("in"));
    return () => window.cancelAnimationFrame(frame);
  }, [
    activeId,
    displayedFlavourId,
    displayedImageReadyId,
    readyVersion,
    transitionPhase,
  ]);

  const handleProductReady = useCallback((id: FlavourId) => {
    setDisplayedImageReadyId(id);
  }, []);

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <main
      className={`campaign ${hasScrolled ? "has-scrolled" : ""}`}
      id="hero"
      style={
        {
          "--flavour-bg": activeFlavour.background,
          "--flavour-bg-base": backgroundBaseFlavour.background,
          "--flavour-light": activeFlavour.light,
          "--flavour-text": activeFlavour.textColor,
        } as React.CSSProperties
      }
    >
      <div
        className={`campaign-background ${backgroundTransitioning ? "is-transitioning" : ""}`}
        style={
          {
            "--flavour-bg-next": activeFlavour.background,
          } as React.CSSProperties
        }
        onTransitionEnd={(event) => {
          if (event.propertyName === "opacity") {
            setBackgroundBaseId(activeIdRef.current);
            setBackgroundTransitioning(false);
          }
        }}
        aria-hidden="true"
      />
      <SiteHeader
        language={language}
        menuOpen={menuOpen}
        onLanguageChange={selectLanguage}
        onMenuToggle={toggleMenu}
        onMenuClose={closeMenu}
      />
      <section className="hero-content" aria-label="RAYA flavour campaign">
        <div className="copy-block">
          <p className="flavour-kicker">{activeFlavour.name[language]}</p>
          <h1 className={`hero-title language-${language}`}>{copy.title}</h1>
          <p className="hero-copy">{activeFlavour.copy[language]}</p>
        </div>
        <div className="product-scene">
          <ProductCan
            flavour={displayedFlavour}
            transitionPhase={transitionPhase}
            initialAnimation={initialAnimation}
            onInitialAnimationEnd={() => setInitialAnimation(false)}
            onProductOut={() => setTransitionPhase("swap")}
            onProductIn={() => setTransitionPhase("idle")}
            onProductReady={handleProductReady}
          />
          <div className="contact-shadow" aria-hidden="true" />
        </div>
        <div className="flavour-lockup">
          <h2>{activeFlavour.name[language]}</h2>
          <p>{activeFlavour.copy[language]}</p>
          <span>330 ML</span>
        </div>
      </section>
      <MobileFlavourSequence language={language} canZoomed={mobileCanZoomed} />
      <FlavourSelector
        activeId={activeId}
        onSelect={selectFlavour}
        language={language}
      />
      <div className="scroll-cue" aria-hidden="true">
        <span>FLAVOURS ↓</span>
      </div>
      <SiteFooter language={language} onLanguageChange={selectLanguage} />
    </main>
  );
}

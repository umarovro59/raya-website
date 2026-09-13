export type Language = "uz" | "ru" | "en";

export const languages: Language[] = ["uz", "ru", "en"];

export type FlavourId =
  | "pomegranate"
  | "pear"
  | "blackberry"
  | "mojito"
  | "apple-malt";

type LocalizedText = Record<Language, string>;

export type Flavour = {
  id: FlavourId;
  image: string;
  background: string;
  light: string;
  textColor: string;
  name: LocalizedText;
  copy: LocalizedText;
};

export const flavours: Flavour[] = [
  {
    id: "pomegranate",
    image: "/images/cans/pomegranate.webp",
    background: "#B72C29",
    light: "#E45A48",
    textColor: "#FFF7F1",
    name: { uz: "ANOR", ru: "ГРАНАТ", en: "POMEGRANATE" },
    copy: {
      uz: "Yorqin. Shirali. Gazlangan.",
      ru: "Яркий. Сочный. Газированный.",
      en: "Bright. Juicy. Sparkling.",
    },
  },
  {
    id: "pear",
    image: "/images/cans/pear.webp",
    background: "#D5DF70",
    light: "#EEF2A8",
    textColor: "#19200F",
    name: { uz: "NOK", ru: "ГРУША", en: "PEAR" },
    copy: {
      uz: "Yangi. Shirali. Gazlangan.",
      ru: "Свежий. Сочный. Газированный.",
      en: "Fresh. Juicy. Sparkling.",
    },
  },
  {
    id: "blackberry",
    image: "/images/cans/blackberry.webp",
    background: "#422346",
    light: "#754A77",
    textColor: "#FBF5FA",
    name: { uz: "MAYMUNJON", ru: "ЕЖЕВИКА", en: "BLACKBERRY" },
    copy: {
      uz: "Chuqur. Rezavor. Gazlangan.",
      ru: "Насыщенный. Ягодный. Газированный.",
      en: "Deep. Berry. Sparkling.",
    },
  },
  {
    id: "mojito",
    image: "/images/cans/mojito.webp",
    background: "#A9C94B",
    light: "#D4E882",
    textColor: "#17210E",
    name: { uz: "MOJITO", ru: "МОХИТО", en: "MOJITO" },
    copy: {
      uz: "Yangi. Nordon. Gazlangan.",
      ru: "Свежий. Цитрусовый. Газированный.",
      en: "Fresh. Zesty. Sparkling.",
    },
  },
  {
    id: "apple-malt",
    image: "/images/cans/apple-malt.webp",
    background: "#C49A4C",
    light: "#E1C478",
    textColor: "#20180D",
    name: { uz: "OLMA VA MALT", ru: "ЯБЛОКО И СОЛОД", en: "APPLE & MALT" },
    copy: {
      uz: "Yumshoq. Tetiktiruvchi. Gazlangan.",
      ru: "Мягкий. Освежающий. Газированный.",
      en: "Smooth. Refreshing. Sparkling.",
    },
  },
];

export const navigation: Record<Language, string[]> = {
  uz: [
    "TA'MLAR",
    "BIZ HAQIMIZDA",
    "TARKIB",
    "HAYOT TARZI",
    "QAYERDAN SOTIB OLISH",
  ],
  ru: ["ВКУСЫ", "О БРЕНДЕ", "СОСТАВ", "СТИЛЬ ЖИЗНИ", "ГДЕ КУПИТЬ"],
  en: ["FLAVOURS", "OUR STORY", "INGREDIENTS", "LIFESTYLE", "WHERE TO BUY"],
};

export const heroCopy: Record<
  Language,
  { title: string; menu: string; close: string }
> = {
  uz: { title: "MEVA TA'MINI HIS QIL.", menu: "MENYU", close: "YOPISH" },
  ru: { title: "ВКУС ФРУКТА.", menu: "МЕНЮ", close: "ЗАКРЫТЬ" },
  en: { title: "TASTE THE FRUIT.", menu: "MENU", close: "CLOSE" },
};

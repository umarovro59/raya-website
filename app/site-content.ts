import type { Language } from "./flavours";

export type SitePage = "story" | "ingredients" | "lifestyle" | "whereToBuy";

type Localized<T> = Record<Language, T>;

export const siteContent: Localized<Record<SitePage, Record<string, string>>> =
  {
    en: {
      story: {
        eyebrow: "OUR STORY",
        title: "BORN IN\nANDIJAN.",
        intro: "RAYA is a sparkling drink made in Andijan, Uzbekistan.",
        identity: "FRUIT.\nFIZZ.\nRAYA.",
        water: "Made with Zam Zam water.",
        closing: "FROM ANDIJAN\nTO EVERY MOMENT.",
      },
      ingredients: {
        eyebrow: "INGREDIENTS",
        title: "FRUIT.\nFIZZ.\nWATER.",
        intro:
          "The character of RAYA starts with a bright fruit flavour and a clean sparkling lift.",
        fruit: "FRUIT FLAVOURS",
        fizz: "SPARKLING REFRESHMENT",
        water: "MADE WITH ZAM ZAM WATER",
        fruitCopy:
          "Five distinct flavour directions, made for different moments.",
        fizzCopy: "A sparkling drink with a crisp, lively finish.",
        waterCopy: "A simple part of what makes RAYA, RAYA.",
      },
      lifestyle: {
        eyebrow: "LIFESTYLE",
        title: "MADE FOR\nTHE MOMENT.",
        intro: "A cold can, a bright table, a reason to stay a little longer.",
        imageOne: "LIFESTYLE IMAGE",
        imageTwo: "LIFESTYLE IMAGE",
        imageThree: "LIFESTYLE IMAGE",
        statement: "BRING THE\nFLAVOUR.",
        note: "Campaign photography coming soon.",
      },
      whereToBuy: {
        eyebrow: "WHERE TO BUY",
        title: "FIND\nYOUR RAYA.",
        intro: "Choose your flavour. Find RAYA near you.",
        search: "SEARCH LOCATION",
        comingSoon: "STORE LOCATOR COMING SOON",
        note: "We are preparing the next way to find your flavour.",
      },
    },
    ru: {
      story: {
        eyebrow: "О БРЕНДЕ",
        title: "РОЖДЁН В\nАНДИЖАНЕ.",
        intro:
          "RAYA — газированный напиток, произведённый в Андижане, Узбекистан.",
        identity: "ФРУКТ.\nИСКРА.\nRAYA.",
        water: "Сделано на воде Zam Zam.",
        closing: "ИЗ АНДИЖАНА\nВ КАЖДЫЙ МОМЕНТ.",
      },
      ingredients: {
        eyebrow: "СОСТАВ",
        title: "ФРУКТ.\nИСКРА.\nВОДА.",
        intro:
          "Характер RAYA начинается с яркого фруктового вкуса и лёгкой газированной свежести.",
        fruit: "ФРУКТОВЫЕ ВКУСЫ",
        fizz: "ГАЗИРОВАННАЯ СВЕЖЕСТЬ",
        water: "СДЕЛАНО НА ВОДЕ ZAM ZAM",
        fruitCopy: "Пять разных вкусовых направлений для разных моментов.",
        fizzCopy: "Газированный напиток с чистым, живым послевкусием.",
        waterCopy: "Часть того, что делает RAYA именно RAYA.",
      },
      lifestyle: {
        eyebrow: "СТИЛЬ ЖИЗНИ",
        title: "СОЗДАН ДЛЯ\nМОМЕНТА.",
        intro: "Холодная банка, яркий стол и повод остаться ещё немного.",
        imageOne: "ФОТО СТИЛЯ",
        imageTwo: "ФОТО СТИЛЯ",
        imageThree: "ФОТО СТИЛЯ",
        statement: "ДОБАВЬ\nВКУС.",
        note: "Фотографии кампании появятся позже.",
      },
      whereToBuy: {
        eyebrow: "ГДЕ КУПИТЬ",
        title: "НАЙДИ\nСВОЮ RAYA.",
        intro: "Выберите вкус. Найдите RAYA рядом с собой.",
        search: "ПОИСК МЕСТА",
        comingSoon: "ПОИСК МАГАЗИНА СКОРО",
        note: "Мы готовим следующий способ найти свой вкус.",
      },
    },
    uz: {
      story: {
        eyebrow: "BIZ HAQIMIZDA",
        title: "ANDIJONDA\nTUG'ILGAN.",
        intro:
          "RAYA — O'zbekistonning Andijon shahrida ishlab chiqarilgan gazlangan ichimlik.",
        identity: "MEVA.\nGAZ.\nRAYA.",
        water: "Zam Zam suvi bilan tayyorlangan.",
        closing: "ANDIJONDAN\nHAR BIR LAHZAGA.",
      },
      ingredients: {
        eyebrow: "TARKIB",
        title: "MEVA.\nGAZ.\nSUV.",
        intro:
          "RAYA xarakteri yorqin meva ta'mi va yengil gazlangan yangilikdan boshlanadi.",
        fruit: "MEVA TA'MLARI",
        fizz: "GAZLANGAN YANGILIK",
        water: "ZAM ZAM SUVI BILAN",
        fruitCopy: "Turli lahzalar uchun besh xil ta'm yo'nalishi.",
        fizzCopy: "Toza va jonli yakunga ega gazlangan ichimlik.",
        waterCopy: "RAYAni RAYA qiladigan oddiy qism.",
      },
      lifestyle: {
        eyebrow: "HAYOT TARZI",
        title: "LAHZALAR\nUCHUN.",
        intro:
          "Sovuq banka, yorqin dasturxon va yana biroz qolish uchun sabab.",
        imageOne: "HAYOT TARZI",
        imageTwo: "HAYOT TARZI",
        imageThree: "HAYOT TARZI",
        statement: "TA'MNI\nOLIB KEL.",
        note: "Kampaniya fotosuratlari tez orada tayyorlanadi.",
      },
      whereToBuy: {
        eyebrow: "QAYERDAN SOTIB OLISH",
        title: "O'Z\nRAYANGNI TOP.",
        intro: "Ta'mni tanlang. RAYAni o'zingizga yaqin joydan toping.",
        search: "JOYNI QIDIRISH",
        comingSoon: "DO'KON QIDIRUVI TEZ ORADA",
        note: "Ta'mingizni topishning keyingi usulini tayyorlayapmiz.",
      },
    },
  };

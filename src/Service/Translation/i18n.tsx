import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationKo from "./translation.ko.json";
import translationEn from "./translation.en.json";

const supportedLanguages: string[] = ["en", "ko"];

const resource = {
  ko: {
    translation: translationKo,
  },
  en: {
    translation: translationEn,
  },
};
i18n.use(initReactI18next).init({
  resources: resource,
  lng: "en",

  debug: true,
  keySeparator: false,
  interpolation: { escapeValue: false },
});

let language = localStorage.getItem("language") ?? supportedLanguages[0];
//default language is english
i18n.changeLanguage(language);

export default i18n;

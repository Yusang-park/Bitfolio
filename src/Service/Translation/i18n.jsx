import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationKo from "./translation.ko.json";
import translationEn from "./translation.en.json";

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

//default language is english, but it will change korean immediately for korean user
i18n.changeLanguage("ko");

export default i18n;

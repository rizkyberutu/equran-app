import "server-only";

const dictionaries = {
  id: () => import("./locales/id.json").then((module) => module.default),
  en: () => import("./locales/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: "id" | "en") => {
  return dictionaries[locale]();
};

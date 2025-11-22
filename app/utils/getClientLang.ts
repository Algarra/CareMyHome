import { locales } from "./Fixtures";

export const getClientLang = (): string => {
  const path = typeof window !== "undefined" ? window?.location?.pathname : "";
  let actualLang = null;

  for (const lang of locales) {
    if (path === `/${lang}` || path.startsWith(`/${lang}/`)) actualLang = lang;
  }

  return actualLang ?? "en";
};

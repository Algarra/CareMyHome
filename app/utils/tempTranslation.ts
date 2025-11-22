import enTranslations from "../../messages/en.json";
// import esTranslations from "../../messages/es.json";
// import deTranslations from "../../messages/de.json";
// import frTranslations from "../../messages/fr.json";
import { locales } from "./Fixtures";

export type TranslationT = (
  path: Path<typeof enTranslations>,
  replacements?: { [key: string]: string }
) => any;

type Path<T> = T extends Array<any>
  ? // @ts-ignore
    `${number}` | `${number}.${Path<T[number]>}`
  : T extends object
  ? {
      [P in keyof T]: (P & string) | `${P & string}.${Path<T[P]>}`;
    }[keyof T]
  : never;

function t(path: Path<typeof enTranslations>, locale?: string) {
  switch (locale) {
    case "es":
      return (
        path
          .split(".")
          .reduce((res: any, prop) => res?.[prop], enTranslations) ?? path
      );
    case "de":
      return (
        path
          .split(".")
          .reduce((res: any, prop) => res?.[prop], enTranslations) ?? path
      );
    case "fr":
      return (
        path
          .split(".")
          .reduce((res: any, prop) => res?.[prop], enTranslations) ?? path
      );
    default:
      return (
        path
          .split(".")
          .reduce((res: any, prop) => res?.[prop], enTranslations) ?? path
      );
  }
}

export const getLocale = () => {
  if (typeof window === "undefined") return "en";
  const pathname = window.location.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  return pathnameLocale ?? "en";
};

const replaceKeys = (
  translation: string,
  replacements: { [key: string]: string }
) => {
  let translationReplaces = translation;
  Object.keys(replacements).forEach((key) => {
    translationReplaces = translationReplaces.replaceAll(
      "${" + key + "}",
      replacements[key]
    );
  });
  return translationReplaces;
};

export const localizedT =
  (locale: string | undefined): TranslationT =>
  (
    path: Path<typeof enTranslations>,
    replacements?: { [key: string]: string }
  ) =>
    replacements ? replaceKeys(t(path, locale), replacements) : t(path, locale);

export const translationWithVariables = (
  translation: string,
  variables: { [key: string]: string }
) => {
  let modifiedTranslation = translation;
  Object.entries(variables).forEach(([key, value]) => {
    modifiedTranslation = modifiedTranslation.replace(`{:${key}}`, value);
  });
  return modifiedTranslation;
};

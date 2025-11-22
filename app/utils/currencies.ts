import { Currency } from "../types/currencyExchanges";
export const currencySymbols: { [key in Currency]: string } = {
  AUD: "A$",
  CAD: "C$",
  CHF: "fr",
  EUR: "€",
  GBP: "£",
  HKD: "H$",
  JPY: "¥",
  USD: "$",
  COP: "Col$",
};

export const currencies = [
  "AUD",
  "CAD",
  "CHF",
  "EUR",
  "GBP",
  "HKD",
  "JPY",
  "USD",
];

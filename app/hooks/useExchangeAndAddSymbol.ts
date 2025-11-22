import {
  calculatePricePerNight,
  currencyExchange,
  CalculatePriceParams,
} from "@algarra/roomsolvers-utils";
import { Currency } from "../types/currencyExchanges";
import { useUserStore } from "../zustand/user";
import { currencySymbols } from "../utils/currencies";

type GetCurrencyStringParams = CalculatePriceParams & {
  currency: Currency;
  expectedCurrency: Currency;
  toFixed?: number;
  amount?: number;
};

export const useExchangeAndAddSymbol = () => {
  const exchangeRates = useUserStore((state) => state.currenciesExchanges);

  const getCurrencyString = ({
    currency,
    expectedCurrency,
    dates,
    defaultDayPrice,
    defaultPrice,
    units,
    pricesByUnits,
    pricesByTimeRange,
    toFixed = 2,
    amount,
    conditionalDiscounts,
    persons,
    extraPerUnitAndPerson,
  }: GetCurrencyStringParams) => {
    if (expectedCurrency === "USD")
      return `${currencySymbols[expectedCurrency]}
    ${currencyExchange({
      defaultValue: {
        amount:
          amount ??
          calculatePricePerNight({
            defaultDayPrice,
            dates,
            pricesByTimeRange,
            defaultPrice,
            units,
            pricesByUnits,
            conditionalDiscounts,
            persons,
            extraPerUnitAndPerson,
          }),
        currency,
      },
      expectedCurrency,
      exchangeRates,
    }).toFixed(toFixed)}`;

    return `${currencyExchange({
      defaultValue: {
        amount:
          amount ??
          calculatePricePerNight({
            defaultDayPrice,
            dates,
            pricesByTimeRange,
            defaultPrice,
            units,
            conditionalDiscounts,
            pricesByUnits,
            persons,
            extraPerUnitAndPerson,
          }),
        currency,
      },
      expectedCurrency,
      exchangeRates,
    }).toFixed(toFixed)} ${currencySymbols[expectedCurrency]}`;
  };

  return { getCurrencyString };
};

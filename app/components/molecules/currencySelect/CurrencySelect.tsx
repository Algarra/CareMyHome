"use client";
import { FC, useEffect } from "react";
import { Select } from "../../atoms/select";
import { useUserStore } from "../../../zustand/user";
import { CurrencyExchanges } from "../../../types/currencyExchanges";
import { tshirtSizes } from "../../theme/tshirtSizes";
// import { useRouter } from "next/navigation";

type CurrencySelectProps = {
  dropdownSide?: "left" | "right";
};

const curreciesOptions = [
  "USD",
  "EUR",
  "CAD",
  "CHF",
  "GBP",
  "JPY",
  "HKD",
  "AUD",
];

export const CurrencySelect: FC<CurrencySelectProps> = ({ dropdownSide }) => {
  const currencySelected = useUserStore((state) => state.currencySelected);

  const setCurrencySelected = useUserStore(
    (state) => state.setCurrencySelected
  );
  const handleLangChange = (currency: any) => {
    localStorage.setItem("selectedCurrency", currency);
    setCurrencySelected(currency);
  };

  useEffect(() => {
    const savedSelection = localStorage.getItem("selectedCurrency");
    if (savedSelection)
      setCurrencySelected(savedSelection as keyof CurrencyExchanges);
  }, []);

  return (
    <Select
      placeholder="Lang"
      handleOnChange={handleLangChange}
      options={curreciesOptions.map((opt) => ({ label: opt, key: opt }))}
      value={currencySelected}
      removeEdge
      button={{
        buttonClasses: " px-1 py-1",
        size: tshirtSizes.EXTRA_SMALL,
        name: "Language selector",
      }}
      dropdownSide={dropdownSide}
      textButton
    />
  );
};

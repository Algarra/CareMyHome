"use client";
import { useCartStore } from "@/app/zustand/cart";
import {
  calculatePricePerNight,
  currencyExchange,
} from "@algarra/roomsolvers-utils";
import { useEffect, useMemo, useRef } from "react";
import { OutlinedButton } from "../../atoms/buttons/outlinedButton";
import { tshirtSizes } from "../../theme/tshirtSizes";
import { Colors } from "../../theme/colors";
import { useUserStore } from "@/app/zustand/user";
import { currencySymbols } from "@/app/utils/currencies";
import { blurHashToDataURL } from "@/utils/blurhashtodataurl";
import { useExchangeAndAddSymbol } from "@/app/hooks/useExchangeAndAddSymbol";
import { VisaIcon } from "../../theme/icons/Visa";
import { MasterCardIcon } from "../../theme/icons/MasterCard";
import { SslIcon } from "../../theme/icons/Ssl";
import { TranslationT, localizedT } from "@/app/utils";
import { getClientLang } from "@/app/utils/getClientLang";
import { PeopleIcon } from "../../theme/icons/People";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "@/utils/image";

const getListOfPersons = (minPersons: number, maxPersons: number) => {
  const list = [];
  for (let i = minPersons; i <= maxPersons; i++) {
    list.push(i);
  }
  return list;
};

const PersonsSelector = ({
  minPersons,
  maxPersons,
  persons,
  t,
  itemIndex,
}: {
  persons: number;
  minPersons: number;
  maxPersons: number;
  t: TranslationT;
  itemIndex: number;
}) => {
  const updateItemPersons = useCartStore((state) => state.updateItemPersons);

  const numbersList = useMemo(
    () => getListOfPersons(minPersons, maxPersons),
    [minPersons, maxPersons]
  );

  return (
    <div className="relative">
      <select
        aria-label={t("/host.selectQuantity")}
        value={persons}
        onChange={(e) => {
          updateItemPersons(Number(e.target.value), itemIndex);
        }}
        className="py-2 px-1 relative border border-neutral-200 focus:outline-none dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white"
      >
        {numbersList.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <span className=" text-white absolute -top-2 -right-1 ">
        <PeopleIcon size={3} />
      </span>
    </div>
  );
};

export const Cart = () => {
  const t = localizedT(getClientLang());
  const { replace } = useRouter();
  const buttonCLicked = useRef(false);
  const { getCurrencyString } = useExchangeAndAddSymbol();
  const open = useCartStore((state) => state.open);
  const items = useCartStore((state) => state.items);
  const removeItemByIndex = useCartStore((state) => state.removeItemByIndex);
  const expectedCurrency = useUserStore((state) => state.currencySelected);
  const exchangeRates = useUserStore((state) => state.currenciesExchanges);
  const setOpen = useCartStore((state) => state.setOpen);
  const setItemsFromLocalStorage = useCartStore(
    (state) => state.setItemsFromLocalStorage
  );

  const totalPrice = items.reduce((accumulator, item) => {
    return (
      accumulator +
      currencyExchange({
        defaultValue: {
          amount: calculatePricePerNight({
            defaultDayPrice: item.defaultDayPrice,
            dates: item.dates,
            pricesByTimeRange: item.pricesByTimeRange,
            defaultPrice: item.defaultPrice,
            units: item.units,
            pricesByUnits: item.pricesByUnits,
            conditionalDiscounts: item.conditionalDiscounts,
            persons: item.persons,
            extraPerUnitAndPerson: item.extraPerUnitAndPerson,
          }),
          currency: item.product.currency,
        },
        expectedCurrency,
        exchangeRates,
      })
    );
  }, 0);
  const taxesAmount = totalPrice - totalPrice / 1.21;

  const handleCloseCart = () => {
    if (!buttonCLicked.current) setOpen(false);
    else buttonCLicked.current = false;
  };

  const handleOpenCart = () => {
    buttonCLicked.current = true;
    setOpen(!open);
  };

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("CART_ITEMS") ?? "[]");
    setItemsFromLocalStorage(savedItems);

    window.addEventListener("click", handleCloseCart);
    window.addEventListener("cartButtonClick", handleOpenCart);

    return () => {
      window.removeEventListener("click", handleCloseCart);
      window.removeEventListener("cartButtonClick", handleOpenCart);
    };
  }, []);

  if (!open) return null;
  return (
    <div className="w-full fixed z-40 right-0 top-16 h-full ">
      <div
        className="flex items-end  overflow-auto max-h-[calc(100dvh-50px)] h-full lg:flex-row flex-col justify-end"
        id="cart"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="lg:w-1/2 w-full lg:px-8 lg:py-2 shadow-[0_0_10px_theme('colors.neutral.600')] py-4 bg-white dark:bg-neutral-800 overflow-y-hidden overflow-x-hidden lg:h-screen h-full"
        >
          <div className=" overflow-auto max-h-[calc(100dvh-290px)] lg:mt-14 lg:max-h-full h-full lg:h-full px-5 text-center ">
            {items.map((item, itemIndex) => {
              return (
                <div
                  key={`${item.product._id}-${item.dates?.startDate}-${item.dates?.endDate}`}
                  className="md:flex items-strech py-8 lg:py-8 border-t border-neutral-50"
                >
                  <Link className="flex" href={item.path ?? ""}></Link>

                  <div
                    onClick={() => {
                      replace(item.path ?? "");
                      setOpen(false);
                    }}
                    className=" relative flex w-full md:w-1/3 h-40 cursor-pointer "
                  >
                    <Image
                      src={item.product.images[0].url}
                      alt="Black Leather Bag"
                      placeholder="blur"
                      blurDataURL={blurHashToDataURL(
                        item.product.images[0].encoded
                      )}
                      fill
                      className=" object-cover h-40 w-full md:w-1/3 "
                    />
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <div className="flex justify-between w-full pt-1">
                      <Link
                        onClick={() => setOpen(false)}
                        href={item.path ?? ""}
                      >
                        <p className="text-base text-left font-black leading-none text-neutral-800 dark:text-white">
                          {item.product.title}
                        </p>
                      </Link>
                      {!!item.persons && (
                        <PersonsSelector
                          t={t}
                          persons={item.persons}
                          minPersons={item.product.minPersons}
                          maxPersons={item.product.maxPersons}
                          itemIndex={itemIndex}
                        />
                      )}
                    </div>
                    <p className="text-xs line-clamp-4 leading-3 text-neutral-600 dark:text-white pt-2">
                      {item.product.description}
                    </p>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex ">
                        <p
                          onClick={() => removeItemByIndex(itemIndex)}
                          className="text-xs leading-3 underline text-red-500 cursor-pointer"
                        >
                          {t("components.cart.remove")}
                        </p>
                      </div>
                      <p className="text-base font-black leading-none text-neutral-800 dark:text-white">
                        {getCurrencyString({
                          expectedCurrency,
                          currency: item.product.currency,
                          defaultDayPrice: item.defaultDayPrice,
                          dates: item.dates,
                          pricesByTimeRange: item.pricesByTimeRange,
                          defaultPrice: item.defaultPrice,
                          units: item.units,
                          pricesByUnits: item.pricesByUnits,
                          conditionalDiscounts: item.conditionalDiscounts,
                          persons: item.persons,
                          extraPerUnitAndPerson: item.extraPerUnitAndPerson,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {!items.length && (
              <h2 className=" text-white text-xl mt-16 mb-10 ">
                {t("components.cart.empty")}
              </h2>
            )}
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="lg:w-96 w-full bg-neutral-100 dark:bg-neutral-900 h-fit py-4 lg:h-full lg:justify-between "
        >
          <div className=" relative flex flex-col lg:px-8 px-4 lg:py-10 py-3 lg:h-full lg:justify-between ">
            <div>
              <div className="flex dark:text-white justify-between ">
                <p className="lg:text-4xl text-xl font-black leading-9 text-neutral-800 dark:text-white">
                  {t("components.cart.summary")}
                </p>
                <div className=" absolute top-2 right-4 flex gap-1">
                  <VisaIcon color={Colors.BLUE} />
                  <MasterCardIcon />
                  <span className="mt-[2px]">
                    <SslIcon size={4} />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5 lg:pt-16">
                <p className="text-base leading-none text-neutral-800 dark:text-white">
                  {t("components.cart.subTotal")}
                </p>
                <p className="text-base leading-none text-neutral-800 dark:text-white">
                  {expectedCurrency === "USD"
                    ? currencySymbols[expectedCurrency]
                    : ""}
                  {(totalPrice - taxesAmount).toFixed(2)}
                  {expectedCurrency !== "USD"
                    ? currencySymbols[expectedCurrency]
                    : ""}
                </p>
              </div>
              <div className="flex items-center justify-between pt-1 lg:pt-5">
                <p className="text-base leading-none text-neutral-800 dark:text-white">
                  {t("components.cart.tax")}
                </p>
                <p className="text-base leading-none text-neutral-800 dark:text-white">
                  {expectedCurrency === "USD"
                    ? currencySymbols[expectedCurrency]
                    : ""}
                  {taxesAmount.toFixed(2)}
                  {expectedCurrency !== "USD"
                    ? currencySymbols[expectedCurrency]
                    : ""}
                </p>
              </div>
              <div>
                <div className="flex items-center pb-2 pt-1 lg:pb-6 justify-between lg:pt-5">
                  <p className="text-2xl leading-normal text-neutral-800 dark:text-white">
                    {t("components.cart.total")}
                  </p>
                  <p className="text-2xl font-bold leading-normal text-right text-neutral-800 dark:text-white">
                    {expectedCurrency === "USD"
                      ? currencySymbols[expectedCurrency]
                      : ""}
                    {totalPrice.toFixed(2)}
                    {expectedCurrency !== "USD"
                      ? currencySymbols[expectedCurrency]
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <OutlinedButton
              onClick={handleCloseCart}
              href={`${t("localePath")}/checkout`}
              disabled={!items.length}
              buttonClasses=" w-full lg:mt-auto "
              innerSpanClasses="w-full"
              size={tshirtSizes.EXTRA_LARGE}
              color={Colors.GREEN}
            >
              {t("components.cart.checkout")}
            </OutlinedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

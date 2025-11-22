import { TranslationT } from "../../../utils";

export const navbarMenuLinks = (t: TranslationT) => [
  { link: t("localePath") + "/", text: t("layout.navbar.home") },
  // {
  //   text: t("layout.navbar.search"),
  //   submenuLinks: [
  //     { link: "#", text: t("layout.navbar.buyAHouse") },
  //     { link: "#", text: t("layout.navbar.buyAnApartment") },
  //     { link: "#", text: t("layout.navbar.buyARoom") },
  //     { link: "#", text: t("layout.navbar.rentAHouse") },
  //     { link: "#", text: t("layout.navbar.rentAnApartment") },
  //     { link: "#", text: t("layout.navbar.resntARoom") },
  //   ],
  // },
  { link: t("localePath") + "/search", text: t("layout.navbar.search") },
  // {
  //   link: t("layout.navbar.discountsLink"),
  //   text: t("layout.navbar.discounts"),
  // },
  {
    link: t("localePath") + "/forum",
    text: t("layout.navbar.forum"),
  },
  // { link: "#", text: t("layout.navbar.aboutUs") },
  { link: t("localePath") + "/blog", text: t("layout.navbar.blog") },
];

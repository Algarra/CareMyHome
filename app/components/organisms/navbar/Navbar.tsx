"use client";
import Link from "next/link";
import { FC, useRef } from "react";
import { localizedT } from "../../../utils";
import { LoginButtons } from "../../molecules/loginButtons";
import { LanguageSelect } from "../../molecules/languageSelect";

type NavbarProps = {
  actualLocale: string;
};

export const Navbar: FC<NavbarProps> = ({ actualLocale }) => {
  const t = localizedT(actualLocale);
  const navbar = useRef<HTMLDivElement>(null);

  return (
    <nav
      id="top-navbar"
      ref={navbar}
      className={` backdrop-blur-md max-w-[100vw] min-h-[65px] fixed z-30 top-0 w-full `}
    >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto py-3 px-2 md:px-3">
        <Link href={t("localePath") + "/"} className="flex items-center group">
          <span className="-mt-1 text-amber-500 transition-colors duration-100 ">
            {/* <RoomIcon size={8} /> */}
          </span>

          <span className=" group-hover:text-amber-400 transition-colors duration-100  max-[340px]:hidden self-center ml-2 sm:text-xl text-md font-semibold whitespace-nowrap text-slate-700 dark:text-white">
            CareMyHome
          </span>
        </Link>
        <div className="flex items-center lg:order-2 ">
          {/* <CartButton /> */}
          <div className=" flex gap-2">
            {/* <CurrencySelect /> */}
            <LanguageSelect actualLocale={t("actualLocale")} />
          </div>

          <LoginButtons actualLocale={t("actualLocale")} />

          {/* <MobileMenuButton /> */}
        </div>
        {/* <NavbarMenu links={navbarMenuLinks(t)} actualLocale={t('actualLocale')} /> */}
      </div>
    </nav>
  );
};

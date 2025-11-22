import Link from "next/link";
import { TextButton } from "../../atoms/buttons/textButton";
import { Title, titleSize } from "../../atoms/title/";

import { TranslationT } from "../../../utils";
import { RoomIcon } from "../../theme/icons/Room";
import { FacebookIcon } from "../../theme/icons/Facebook";
import { InstagramIcon } from "../../theme/icons/Instagram";
import { XIcon } from "../../theme/icons/X";

export const Footer = ({ t }: { t: TranslationT }) => {
  return (
    <footer className="p-4 h-fit w-full bg-white/90 sm:p-6 dark:bg-neutral-900/90">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href={`${t("localePath")}/`}
              className="flex items-center group"
              title="Home page"
            >
              <span className="-mt-1 text-amber-500 transition-colors duration-100 ">
                <RoomIcon size={8} />
              </span>

              <span className=" group-hover:text-amber-400 self-center pt-1 ml-2 text-2xl font-semibold whitespace-nowrap text-neutral-700 dark:text-white">
                CareMyHome
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {[
              // {
              //   title: "User",
              //   listItems: [
              //     { link: "/profile", text: "Profile" },
              //     // { link: "/", text: "Discord" },
              //   ],
              // },
              {
                title: t("layout.footer.searchTitle"),
                listItems: [
                  {
                    link: `${t("localePath")}/search`,
                    text: t("layout.footer.search"),
                  },
                  // {
                  //   link: t("layout.footer.discountsLink"),
                  //   text: t("layout.footer.discounts"),
                  // },
                ],
              },
              {
                title: t("layout.footer.resourcesTitle"),
                listItems: [
                  {
                    link: `${t("localePath")}/blog`,
                    text: t("layout.footer.blog"),
                  },
                  {
                    link: `${t("localePath")}/login`,
                    text: t("layout.footer.loginLabel"),
                  },
                  {
                    link: `${t("localePath")}/cookies-policy`,
                    text: t("layout.footer.cookies"),
                  },
                  {
                    link: `${t("localePath")}/privacy-policy`,
                    text: t("layout.footer.privacyPolicy"),
                  },
                  {
                    link: `${t("localePath")}/terms-conditions`,
                    text: t("layout.footer.termsConditions"),
                  },
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <Title
                  size={titleSize.H3}
                  titleClasses=" text-neutral-900 dark:text-neutral-100 uppercase mb-3"
                >
                  {section.title}
                </Title>
                <ul className="list-none dark:text-neutral-200">
                  {section.listItems.map((item) => (
                    <li key={section.title + item.text}>
                      <Link href={item.link} title={item.text}>
                        <TextButton buttonClasses="pl-0 m-0">
                          {item.text}
                        </TextButton>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-neutral-200 sm:mx-auto dark:border-neutral-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-neutral-600 sm:text-center dark:text-neutral-400">
            © 2023{" "}
            <Link href="/" className="hover:underline" title="CareMyHome™">
              CareMyHome™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link
              href="https://www.facebook.com/profile.php?id=61552565477443"
              aria-label="Facebook"
              title="Facebook"
              className=" text-neutral-700 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.instagram.com/roomsolversapp/"
              aria-label="Instagram"
              title="Instagram"
              className=" text-neutral-700 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://twitter.com/roomsolvers"
              aria-label="Twitter"
              title="Twitter"
              className=" text-neutral-700 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <XIcon size={4} />
            </Link>
            {/* <Link href="#" aria-label="Github">
              <GithubIcon size={4} />
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

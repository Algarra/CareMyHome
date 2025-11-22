"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

export const CookieModal = () => {
  const [addCookies, setAddCookies] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("cookiesAccepted") === "true") setAddCookies(true);
    else setShowCookiesModal(true);
  }, []);

  const initialPath = useMemo(() => pathname, []);

  useEffect(() => {
    if (pathname !== initialPath && !addCookies) {
      localStorage.setItem("cookiesAccepted", "true");
      setAddCookies(true);
      setShowCookiesModal(false);
    }
  }, [pathname]);

  if (!showCookiesModal)
    return (
      <>
        {addCookies && (
          <>
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-ZHDTG4JTTT"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-BKT16G6X53');
              `}
            </Script>
          </>
        )}
      </>
    );
  return (
    <section
      className={`w-full p-5 lg:px-24 fixed z-50 bottom-0 bg-neutral-600`}
    >
      <div className="md:flex items-center -mx-3">
        <div className="md:flex-1 px-3 mb-5 md:mb-0">
          <p className="text-center md:text-left text-white text-xs leading-tight md:pr-12">
            {`We, along with our selected partners and related companies, use cookies and similar technologies to enhance your browsing
						experience as described in our Cookies Policy. By continuing to browse this website, you consent to the use of these
						technologies. You can learn more about how we use cookies and adjust your cookie preferences in the 'learn more' button.`}
          </p>
        </div>
        <div className="px-3 text-center">
          <Link
            title="cookies policy"
            href="https://www.mountainbikescanada.com/cookies-policy"
          >
            <button className="py-2 sm:px-8 px-4 bg-neutral-800 hover:bg-neutral-900 text-white rounded font-bold text-sm shadow-xl mr-3">
              Cookies policy
            </button>
          </Link>
          <button
            onClick={() => {
              localStorage.setItem("cookiesAccepted", "true");
              setAddCookies(true);
              setShowCookiesModal(false);
            }}
            className="py-2 sm:px-8 px-4 bg-amber-400 hover:bg-amber-500 text-black rounded font-bold text-sm shadow-xl"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </section>
  );
};

import Image from "next/image";
import { TranslationT } from "../../../utils";
import { TopSectionStyles } from "../homeTopSection/TopSectionStyles";
import { TextButton } from "../../atoms/buttons/textButton";
import Link from "next/link";

export const HeroSection = ({ t }: { t: TranslationT }) => {
  return (
    <>
      <TopSectionStyles />
      <section className="relative w-full min-h-[80vh] flex items-center">
        <div className="flex relative max-w-screen-xl z-10 flex-wrap w-full pt-20 lg:pt-0 box-border mx-auto gap-8 xl:gap-0 justify-between px-4">
          <div className="place-self-center w-full lg:w-1/2 py-8 lg:py-16">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Smart Care for Your Home
            </h1>
            <p className="max-w-2xl mb-6 font-light text-neutral-500 lg:mb-8 md:text-lg lg:text-xl dark:text-neutral-400">
              Professional maintenance, cleaning, and gardening services enhanced by state-of-the-art home automation. Experience the future of home care.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#services">
                <button className="px-6 py-3 text-base font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-900">
                  Explore Services
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-6 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2940&auto=format&fit=crop"
            alt="Smart Home"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>
    </>
  );
};

import { TranslationT } from "../../../utils";
import { StartSearching } from "./StartSearching";
import MapPinsManager from "./MapPinsManager";
import { blurHashToDataURL } from "@/utils/blurhashtodataurl";
import { TopSectionStyles } from "./TopSectionStyles";
import Image from "@/utils/image";

export const HomeTopSection = ({ t }: { t: TranslationT }) => {
  return (
    <>
      <TopSectionStyles />

      <section className="relative w-full ">
        <div className="flex relative max-w-screen-xl z-10 flex-wrap w-full pt-10 lg:pt-0 box-border mx-auto gap-8 xl:gap-0 justify-between  ">
          <div className=" place-self-center pl-3 w-full lg:w-[calc(50%-2rem)] lg:pl-10  py-8 lg:py-16 ">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              title
            </h1>
            <p className="max-w-2xl mb-6 font-light text-neutral-500 lg:mb-8 md:text-lg lg:text-xl dark:text-neutral-400 ">
              text
            </p>
            <div className="flex flex-wrap">
              <StartSearching actualLocale={t("actualLocale")} />
            </div>
          </div>
          <div className=" flex flex-wrap relative mt-3 lg:mt-0 w-full lg:w-[50%] overflow-hidden min-h-[450px] ">
            <span className="group">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/home-images%2Fhouse-pin.webp?alt=media&token=aa0ae94c-18b8-4272-bf21-2145f8e3b3fc"
                alt="Interactive map"
                width={30}
                height={30}
                sizes="20vw"
                quality={60}
                priority
                className=" absolute image-pin group-hover:animate-none z-10 h-14 w-14 top-32 left-10 group-hover:w-20 group-hover:h-20 transition-all duration-75 group-hover:left-8 group-hover:top-28"
              />
              <div
                role="tooltip"
                className="absolute max-w-[130px] tooltip-right top-28 left-28 inline-block px-3 py-2 group-hover:z-20 text-sm font-medium text-white bg-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 tooltip "
              >
                pin1
              </div>
            </span>
            <span className="group">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/home-images%2Fnature-pin.webp?alt=media&token=c54ddfc5-5fd8-48fe-8cf7-5bae391570d8"
                alt="Interactive map"
                width={30}
                height={30}
                sizes="20vw"
                quality={60}
                priority
                className=" absolute image-pin group-hover:animate-none z-10 h-14 w-14 bottom-14 left-[100px] group-hover:w-20 group-hover:h-20 transition-all duration-75 group-hover:left-[88px] group-hover:bottom-14"
              />
              <div
                role="tooltip"
                className="absolute max-w-[150px] tooltip-top bottom-36 left-[53px] inline-block px-3 py-2 group-hover:z-20 text-sm font-medium text-white bg-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 tooltip "
              >
                pin2
              </div>
            </span>
            <span className="group">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/home-images%2Foffice-pin.webp?alt=media&token=360af237-37c9-4ac9-8255-3bd0e4a8aca7"
                alt="Interactive map"
                width={30}
                height={30}
                priority
                sizes="20vw"
                quality={60}
                className=" absolute image-pin group-hover:animate-none z-10 h-14 w-14 top-14 right-32 group-hover:w-20 group-hover:h-20 transition-all duration-75 group-hover:right-[116px] group-hover:top-8"
              />
              <div
                role="tooltip"
                className="absolute max-w-[150px] tooltip-bottom top-[120px] right-[82px] inline-block px-3 py-2 group-hover:z-20 text-sm font-medium text-white bg-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 tooltip "
              >
                pin3
              </div>
            </span>
            <span className="group">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/home-images%2Frestaurant-pin.webp?alt=media&token=da6eb255-4153-40dc-a3eb-44be55763d3f"
                alt="Interactive map"
                width={30}
                height={30}
                sizes="20vw"
                quality={60}
                priority
                className=" absolute image-pin group-hover:animate-none z-10 h-14 w-14 bottom-14 right-3 group-hover:w-20 group-hover:h-20 transition-all duration-75 group-hover:right-0 "
              />
              <div
                role="tooltip"
                className="absolute max-w-[130px] tooltip-left bottom-20 right-[82px] inline-block px-3 py-2 group-hover:z-20 text-sm font-medium text-white bg-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 tooltip "
              >
                pin4
              </div>
            </span>
            <MapPinsManager />
          </div>
        </div>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/rooms-app-f32cb.appspot.com/o/home-images%2Fmap.webp?alt=media&token=0010341a-c90c-42ed-9d82-f319a6b4d58b"
          alt="Interactive map"
          fill
          placeholder="blur"
          blurDataURL={blurHashToDataURL(
            "QkMaR]ayRjofayofWBj[ay~qxut7Rjj[fQt7WBayRjRjRjt7ayofWBj[j["
          )}
          priority
          sizes="70vw"
          quality={9}
          className=" object-cover homeMapTransparency opacity-85 absolute z-0 top-0 w-full h-full pt-[40%] lg:pt-0 lg:pl-[40%] "
        />
      </section>
    </>
  );
};

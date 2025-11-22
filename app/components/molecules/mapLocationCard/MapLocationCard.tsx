"use client";
import Image from "@/utils/image";
import { FC, memo, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import Link from "next/link";
import { Spinner } from "../../atoms/spinner";
import { Title, titleSize } from "../../atoms/title";
import { OutlinedButton } from "../../atoms/buttons/outlinedButton";
import { blurHashToDataURL } from "@/utils/blurhashtodataurl";
import { TextButton } from "../../atoms/buttons/textButton";
import { tshirtSizes } from "../../theme/tshirtSizes";
import { CrossIcon } from "../../theme/icons/Cross";
import { EdgeLeftIcon } from "../../theme/icons/EdgeLeft";
import { EdgeRightIcon } from "../../theme/icons/EdgeRight";

type sliderImage = {
  alt: string;
  src: string | StaticImport;
  width: number;
  height: number;
  title?: string;
  encoded: string;
};

export type MapLocationCardProps = {
  imageList: sliderImage[];
  title: string;
  path: string;
  actualLoacale: string;
};

export const MapLocationCard: FC<MapLocationCardProps> = memo(
  ({ imageList, title, path }: MapLocationCardProps) => {
    const [sliderPosition, setSliderosition] = useState(0);
    // const t = localizedT(actualLoacale);

    return (
      <>
        <style>
          {`
            .leaflet-popup-close-button {
              display: none;
            }
          `}
        </style>
        <div className=" flex flex-wrap h-fit relative transition-all bg-white/50 rounded-lg shadow backdrop-blur-sm ">
          <TextButton
            size={tshirtSizes.EXTRA_SMALL}
            buttonClasses=" absolute -top-6 -right-5 z-10 "
            onClick={() => {
              document.dispatchEvent(new Event("RS-close-map-popups"));
            }}
          >
            <span className=" bg-slate-50/90 hover:bg-slate-50/50 -m-1 p-2 rounded-full text-black ">
              <CrossIcon size={2} />
            </span>
          </TextButton>
          {!!imageList.length && (
            <div className="flex relative h-[12em] -m-[2px] w-[calc(100%+4px)] ">
              {imageList.length > 1 && (
                <>
                  <span
                    onClick={() => {
                      setSliderosition((prev) => {
                        if (prev) return prev - 1;
                        else return imageList.length - 1;
                      });
                    }}
                    className=" z-10 absolute rounded-full bg-neutral-100/90 hover:bg-neutral-100/50 cursor-pointer top-16 -left-3 p-2 "
                  >
                    <EdgeLeftIcon size={2} />
                  </span>
                  <span
                    onClick={() => {
                      setSliderosition((prev) => {
                        if (prev + 1 === imageList.length) return 0;
                        else return prev + 1;
                      });
                    }}
                    className=" z-10 absolute rounded-full bg-neutral-100/90 hover:bg-neutral-100/50 cursor-pointer top-16 -right-3 p-2 "
                  >
                    <EdgeRightIcon size={2} />
                  </span>
                </>
              )}
              <span className=" m-auto">
                <Spinner size={10} />
              </span>

              {imageList.map((image, index) => (
                <Image
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  itemProp="image"
                  blurDataURL={blurHashToDataURL(image.encoded)}
                  placeholder="blur"
                  fill
                  className={` rounded-t-lg object-cover w-full h-full 
            ${index === sliderPosition ? "" : "hidden"} `}
                  sizes="20vw"
                />
              ))}
            </div>
          )}
          <div
            className={` w-full h-full p-2 flex-col transition-all flex justify-between`}
          >
            <Link href={`${path}`}>
              <Title
                size={titleSize.H3}
                titleClasses="font-bold tracking-tight text-neutral-900 text-sm md:text-sm mb-2 pb-0 line-clamp-3 "
              >
                {title}
              </Title>
            </Link>
            <div className=" w-full justify-end flex">
              <Link title="property link" href={path}>
                <OutlinedButton size={tshirtSizes.EXTRA_SMALL}>
                  Check it
                </OutlinedButton>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
);

MapLocationCard.displayName = "MapLocationCard";

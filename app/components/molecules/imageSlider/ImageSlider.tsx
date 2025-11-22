"use client";
import Image from "@/utils/image";
import { FC, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Spinner } from "../../atoms/spinner";
import { blurHashToDataURL } from "@/utils/blurhashtodataurl";
import { v4 as uuidv4 } from "uuid";
import { EdgeLeftIcon } from "../../theme/icons/EdgeLeft";
import { EdgeRightIcon } from "../../theme/icons/EdgeRight";

type sliderImage = {
  alt: string;
  src: string | StaticImport;
  title?: string;
  blurDataURL?: string;
};

export type ImageSliderProps = {
  imageList: sliderImage[];
  forcePosition?: number;
  onSliderPositionChange?: (position: number) => void;
  cover?: boolean;
  imagePriority?: boolean;
  sizes?: string;
  quality?: number;
};

export const ImageSlider: FC<ImageSliderProps> = ({
  imageList,
  forcePosition,
  onSliderPositionChange,
  cover,
  imagePriority = false,
  sizes = "",
  quality = 100,
}) => {
  const [sliderPosition, setSliderosition] = useState(0);
  const touchStartRef = useRef(0);
  const sliderId = useMemo(() => uuidv4(), []);
  const touchEndRef = useRef(0);

  const moveSliderRight = () => {
    setSliderosition((prev) => {
      let newPosition = prev;
      if (prev + 1 === imageList.length) newPosition = 0;
      else newPosition = prev + 1;

      if (onSliderPositionChange) onSliderPositionChange(newPosition);
      return newPosition;
    });
  };

  const moveSliderLeft = () => {
    setSliderosition((prev) => {
      let newPosition = prev;
      if (prev) newPosition = prev - 1;
      else newPosition = imageList.length - 1;

      if (onSliderPositionChange) onSliderPositionChange(newPosition);
      return newPosition;
    });
  };

  useEffect(() => {
    if (forcePosition !== undefined && imageList.length >= forcePosition) {
      setSliderosition(forcePosition);
      if (onSliderPositionChange) onSliderPositionChange(forcePosition);
    }
  }, [forcePosition, imageList.length, onSliderPositionChange]);

  return (
    <div className="relative flex h-full w-full rounded-lg bg-neutral-200 dark:bg-neutral-800 ">
      {imageList.length > 1 && (
        <>
          <span
            onClick={moveSliderLeft}
            className=" z-10 absolute rounded-full bg-neutral-100/90 hover:bg-neutral-100/50 cursor-pointer top-2/4 left-3 p-2 text-black "
          >
            <EdgeLeftIcon size={2} />
          </span>
          <span
            onClick={moveSliderRight}
            className=" z-10 absolute rounded-full bg-neutral-100/90 hover:bg-neutral-100/50 cursor-pointer top-2/4 right-3 p-2 text-black "
          >
            <EdgeRightIcon size={2} />
          </span>
        </>
      )}
      <span className=" m-auto">
        <Spinner size={10} />
      </span>

      {imageList.map((image, index) => (
        <Fragment key={`${sliderId}-${image.src}-${index}`}>
          <Image
            src={`${
              image.blurDataURL
                ? blurHashToDataURL(image.blurDataURL)
                : image.src
            }`}
            alt={`${image.alt} bg`}
            title={`${image.title} bg`}
            fill
            className={` relative object-cover w-full h-full 
        ${index === sliderPosition ? "" : "hidden"} ${
              image.blurDataURL ? "" : "blur-sm opacity-50"
            } `}
          />
          <Image
            src={image.src}
            alt={image.alt}
            onTouchStart={(e) =>
              (touchStartRef.current = e.targetTouches[0].clientX)
            }
            onTouchMove={(e) =>
              (touchEndRef.current = e.targetTouches[0].clientX)
            }
            onTouchEnd={() => {
              if (touchStartRef.current - touchEndRef.current > 150)
                moveSliderRight();

              if (touchStartRef.current - touchEndRef.current < -150)
                moveSliderLeft();
            }}
            title={image.title}
            itemProp="image"
            blurDataURL={blurHashToDataURL(image.blurDataURL)}
            placeholder={image.blurDataURL ? "blur" : undefined}
            priority={
              imagePriority ? Math.abs(sliderPosition - index) < 2 : false
            }
            fill
            sizes={sizes}
            quality={quality}
            className={` relative ${
              cover ? " object-cover " : " object-contain "
            } w-full h-full 
        ${index === sliderPosition ? "" : "hidden"} `}
          />
        </Fragment>
      ))}
    </div>
  );
};

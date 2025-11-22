"use client";
import NextImage, { StaticImageData } from "next/image";
import { FC } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type ResponsiveImageProps = Parameters<typeof NextImage>[0] & {
  src?: string | StaticImageData | StaticImport; // image url
  alt: string; // Alt text for accessibility
  blurDataURL?: string; // BlurHash for the low-quality placeholder
  height?: number; // Height of the image
  width?: number; // Width of the image
  sizes?: string; // Sizes attribute for responsive images
};

export const breakpoints = [480, 768, 1024, 1600, 1920];
const Image: FC<ResponsiveImageProps> = ({
  src,
  alt,
  blurDataURL,
  height,
  width,
  layout,
  style,
  ...props
}) => {
  // Custom loader to dynamically generate image URLs
  const customLoader = ({ src, width }: { src: string; width: number }) => {
    // Find the closest breakpoint
    const closestBreakpoint = breakpoints.reduce((prev, curr) =>
      Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
    );

    return src.replace(/-\d+\.webp/, `-${closestBreakpoint}.webp`);
  };

  if (!src) return null;

  return (
    <NextImage
      loader={
        typeof src === "string" && src.includes("{{size}}")
          ? customLoader
          : undefined
      }
      src={
        typeof src === "string"
          ? src.replace("{{size}}", `${breakpoints[breakpoints.length - 1]}`)
          : src
      } // Default to largest size
      alt={alt}
      style={
        typeof src === "string" &&
        src.includes("{{size}}") &&
        !layout &&
        !props.fill
          ? { width: "100%", height: "auto" }
          : style
      }
      width={width ?? undefined} // Default width: largest breakpoint
      height={height ?? undefined} // Example aspect ratio (16:9)
      placeholder={blurDataURL && src ? "blur" : undefined} // Use blur placeholder if blurHash is provided
      blurDataURL={blurDataURL ?? undefined} // Use blurHash as base64 data
      {...props}
    />
  );
};

export default Image;

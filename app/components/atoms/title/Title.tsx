import { ReactNode } from "react";
import { titleSize } from "./utils";
import { twMerge } from "tailwind-merge";

export const Title = ({
  children,
  size,
  titleClasses,
}: {
  children: ReactNode;
  titleClasses?: string;
  size: titleSize;
}) => {
  switch (size) {
    case titleSize.H1:
      return (
        <h1 className={twMerge(`mb-6 text-3xl md:text-6xl `, titleClasses)}>
          {children}
        </h1>
      );

    case titleSize.H2:
      return (
        <h2 className={twMerge(`mb-6 text-2xl md:text-4xl `, titleClasses)}>
          {children}
        </h2>
      );

    case titleSize.H3:
      return (
        <h3 className={twMerge(`mb-5 text-xl md:text-2xl `, titleClasses)}>
          {children}
        </h3>
      );

    case titleSize.H4:
      return (
        <h4 className={twMerge(`mb-4 text-lg md:text-xl `, titleClasses)}>
          {children}
        </h4>
      );

    case titleSize.H5:
      return (
        <h5 className={twMerge(`mb-4 text-lg md:text-xl `, titleClasses)}>
          {children}
        </h5>
      );

    case titleSize.H6:
      return (
        <h6 className={twMerge(`mb-3 text-lg md:text-xl `, titleClasses)}>
          {children}
        </h6>
      );

    default:
      return <></>;
  }
};

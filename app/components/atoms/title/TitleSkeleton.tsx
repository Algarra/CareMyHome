import { titleSkeletonWidth, titleSize } from "./utils";

export const TitleSkeleton = ({
  size,
  width,
  titleClasses,
}: {
  size: titleSize;
  width: keyof typeof titleSkeletonWidth;
  titleClasses?: string;
}) => {
  switch (size) {
    case titleSize.H1:
      return (
        <div className={`${titleSkeletonWidth[width]}`}>
          <h1
            className={` ${titleClasses} text-6xl text-transparent animate-pulse bg-neutral-300 rounded-full dark:bg-neutral-700 w-full mb-6`}
          >
            |
          </h1>
        </div>
      );

    case titleSize.H2:
      return (
        <div className={`${titleSkeletonWidth[width]}`}>
          <h2
            className={` ${titleClasses} mb-6 text-transparent animate-pulse text-4xl bg-neutral-300 rounded-full dark:bg-neutral-700 w-full `}
          >
            |
          </h2>
        </div>
      );

    case titleSize.H3:
      return (
        <div className={`${titleSkeletonWidth[width]}`}>
          <h3
            className={` ${titleClasses} mb-6 text-transparent animate-pulse text-xl bg-neutral-300 rounded-full dark:bg-neutral-700 w-full `}
          >
            |
          </h3>
        </div>
      );

    case titleSize.H4:
      return (
        <div className={`${titleSkeletonWidth[width]}`}>
          <h4
            className={` ${titleClasses} mb-6 text-transparent animate-pulse text-xl bg-neutral-300 rounded-full dark:bg-neutral-700 w-full `}
          >
            |
          </h4>
        </div>
      );

    case titleSize.H5:
      return (
        <div className={`${titleSkeletonWidth[width]}`}>
          <h5
            className={` ${titleClasses} mb-6 text-transparent animate-pulse text-xl bg-neutral-300 rounded-full dark:bg-neutral-700 w-full `}
          >
            |
          </h5>
        </div>
      );

    case titleSize.H6:
      return (
        <div className={`${titleSkeletonWidth[width]}`}>
          <h6
            className={` ${titleClasses} mb-6 text-transparent animate-pulse text-xl bg-neutral-300 rounded-full dark:bg-neutral-700 w-full `}
          >
            |
          </h6>
        </div>
      );

    default:
      return <></>;
  }
};

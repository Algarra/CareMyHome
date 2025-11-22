import { twMerge } from "tailwind-merge";
import { textSkeletonWidth } from "./utils/skeletonWidth";

export const TextSkeleton = ({
  width,
  lines = 1,
  textClasses,
}: {
  width: keyof typeof textSkeletonWidth;
  lines?: number;
  textClasses?: string;
}) => {
  const injectableLines = [];
  for (let i = 0; i < lines; i++) {
    injectableLines.push({});
  }
  return (
    <div className={`${textSkeletonWidth[width]}`}>
      {injectableLines.map((l, index) => (
        <p
          key={index}
          className={twMerge(
            ` mb-1 text-transparent animate-pulse bg-neutral-300 rounded-full dark:bg-neutral-700 ${textSkeletonWidth["100%"]} `,
            textClasses
          )}
        >
          |
        </p>
      ))}
    </div>
  );
};

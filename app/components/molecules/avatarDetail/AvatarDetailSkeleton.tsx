import { FC } from "react";
import { twMerge } from "tailwind-merge";

type AvatarDetailProps = {
  imageWrapperClasses?: string;
};

export const AvatarDetailSkeleton: FC<AvatarDetailProps> = ({
  imageWrapperClasses,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <span
        className={twMerge(
          ` w-10 h-10 rounded-full bg-neutral-300 dark:bg-neutral-600 overflow-hidden relative animate-pulse `,
          imageWrapperClasses
        )}
      ></span>
    </div>
  );
};

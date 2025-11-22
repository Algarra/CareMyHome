import { FC } from "react";

type OwnProps = {
  label?: string;
};
export const InputSkeleton: FC<OwnProps> = ({ label }) => {
  return (
    <div>
      {label && (
        <div className=" animate-pulse px-2 text-transparent w-fit block mb-2 text-sm font-medium bg-neutral-300 rounded-lg dark:bg-neutral-600 ">
          {label}
        </div>
      )}
      <div className=" animate-pulse w-full h-10 bg-neutral-200 rounded-lg dark:bg-neutral-700"></div>
    </div>
  );
};

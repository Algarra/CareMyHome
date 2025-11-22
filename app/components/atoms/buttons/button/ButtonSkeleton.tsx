import { ComponentProps, FC, ReactNode } from "react";
import { ButtonSizes } from "./utils";
import { twMerge } from "tailwind-merge";
import { tshirtSizes } from "../../../theme/tshirtSizes";

export const ButtonSkeleton: FC<{
  size?: tshirtSizes;
  children: ReactNode;
  buttonClasses?: ComponentProps<"button">["className"];
}> = ({ size = tshirtSizes.BASE, children, buttonClasses }) => {
  return (
    <div
      className={twMerge(
        ` ${ButtonSizes[size]} 
       bg-neutral-300 dark:bg-neutral-700 animate-pulse font-medium rounded-lg text-sm text-center w-fit `,
        buttonClasses
      )}
    >
      <span className=" invisible">{children}</span>
    </div>
  );
};

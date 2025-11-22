import { ReactNode } from "react";
import { PopoverPosition } from "./utils";

export const Popover = ({
  children,
  popoverContent,
  position = PopoverPosition.TOP_LEFT,
}: {
  children: ReactNode;
  popoverContent: ReactNode;
  position?: PopoverPosition;
}) => {
  return (
    <>
      <div className=" relative group/popover ">
        {children}
        <div
          className={` ${position} absolute m-1 -z-10 group-hover/popover:z-10 group-hover/popover:opacity-90 opacity-0 inline-block w-fit text-sm text-neutral-500 transition-opacity duration-300 bg-white border border-neutral-200 rounded-lg shadow-sm  dark:text-neutral-400 dark:bg-neutral-800 dark:border-neutral-600`}
        >
          <div className="p-2">{popoverContent}</div>
        </div>
      </div>
    </>
  );
};

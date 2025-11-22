"use client";
import { ReactNode, useState } from "react";
import { EdgeDownIcon } from "../../theme/icons/EdgeDown";
import { EdgeUpIcon } from "../../theme/icons/EdgeUp";

export const Acordion = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) => {
  const [show, setShow] = useState(defaultOpen);

  return (
    <div className=" py-2 w-full " data-accordion="collapse">
      <button
        onClick={() => setShow(!show)}
        className={`flex items-center justify-between w-full p-5 font-medium text-left text-neutral-500 border 
    ${show ? "border-b-0" : " rounded-b-xl"}
     border-neutral-200 rounded-t-xl dark:border-neutral-700 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800`}
      >
        <span>{title}</span>
        {show ? <EdgeDownIcon size={2} /> : <EdgeUpIcon size={2} />}
      </button>
      <div className={` ${!show && "hidden"}`}>
        <div className="p-4 w-full flex flex-wrap border rounded-b-xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
};

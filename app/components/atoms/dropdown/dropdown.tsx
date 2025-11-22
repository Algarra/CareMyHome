"use client";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { OptionalButtonLink } from "../utils";
import { DropdownPosition } from "./utils";

export const Dropdown: FC<{
  children: ReactNode;
  options: { label: string; onCLick?: () => void; href?: string }[];
  extraButton?: { label: string; onCLick?: () => void; href?: string };
  position?: DropdownPosition;
}> = ({
  children,
  options,
  extraButton,
  position = DropdownPosition.TOP_LEFT,
}) => {
  const [open, setOpen] = useState(false);
  const clickedRef = useRef(false);

  const handleClick = () => {
    if (!clickedRef.current) {
      setOpen(false);
    }
    clickedRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  return (
    <div className=" relative">
      <div
        onClick={() => {
          clickedRef.current = true;
          setOpen(!open);
        }}
      >
        {children}
      </div>

      <div
        className={`z-10 absolute ${
          open ? "" : "hidden"
        } ${position} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {options.map((opt, indx) => (
            <li
              key={`${opt.label}-${indx}`}
              onClick={opt.onCLick}
              className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <OptionalButtonLink href={opt.href}>
                {opt.label}
              </OptionalButtonLink>
            </li>
          ))}
        </ul>

        {extraButton && (
          <div className="py-2" onClick={extraButton.onCLick}>
            <OptionalButtonLink href={extraButton.href}>
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                {extraButton.label}
              </div>
            </OptionalButtonLink>
          </div>
        )}
      </div>
    </div>
  );
};

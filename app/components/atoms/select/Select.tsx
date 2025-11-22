"use client";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchIcon } from "../../theme/icons/Search";
import { Button } from "../buttons/button";
import { TextButton } from "../buttons/textButton";
import { twMerge } from "tailwind-merge";
import { tshirtSizes } from "../../theme/tshirtSizes";
import { Colors } from "../../theme/colors";
import { EdgeUpIcon } from "../../theme/icons/EdgeUp";
import { EdgeDownIcon } from "../../theme/icons/EdgeDown";

type SelectProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  options: { label: string; key: string | number }[];
  multipleSelection?: boolean;
  handleOnChange: (value: string | number | (string | number)[]) => void;
  value: string | number | (string | number)[];
  placeholder?: string;
  label?: string;
  wrapperClasses?: string;
  hasError?: boolean;
  searcher?: boolean;
  children?: ReactNode;
  removeEdge?: boolean;
  required?: boolean;
  button?: {
    buttonClasses?: string;
    size?: tshirtSizes;
    color?: Colors | undefined;
    name?: string;
  };
  fitDropdownSize?: boolean;
  dropdownSide?: "left" | "right";
  textButton?: boolean;
};

export const Select: FC<SelectProps> = ({
  options,
  multipleSelection = false,
  handleOnChange,
  value,
  placeholder,
  label,
  wrapperClasses,
  hasError,
  searcher = false,
  removeEdge = false,
  button,
  children,
  fitDropdownSize = false,
  required,
  dropdownSide = "right",
  textButton = false,
  ...restOfProps
}) => {
  const internalClickBlock = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openDirection = useRef<
    | "popover_top-left"
    | "popover_top-right"
    | "popover_bottom-left"
    | "popover_bottom-right"
  >("popover_bottom-left");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const handleItemClicked = (newValue: string | number) => {
    if (multipleSelection) {
      if (Array.isArray(value)) {
        if (value.includes(newValue)) {
          const newArray = [...value];
          const index = newArray.indexOf(newValue);
          if (index !== -1) newArray.splice(index, 1);
          handleOnChange(newArray);
        } else {
          handleOnChange([...value, newValue]);
        }
      } else {
        console.error(
          "Multiple selection enabled and selectd is not an array. Add an array as selected to use the multiple selection option."
        );
      }
    } else {
      handleOnChange(newValue);
    }
  };

  const getSelectedString = () => {
    let selectdString = placeholder ?? "";

    if (value)
      if (Array.isArray(value)) {
        if (value.length) {
          selectdString = value
            .map((slct) => options.find((opt) => opt.key === slct)!.label)
            .join(", ");
        }
      } else {
        selectdString = options.find((opt) => opt.key === value)!.label;
      }

    return selectdString;
  };

  const handleOpenDirection = () => {
    if (buttonRef?.current)
      if (
        window.innerHeight - buttonRef.current.getBoundingClientRect().bottom <
        options.length * 32 + 24
      ) {
        openDirection.current =
          dropdownSide === "left" ? "popover_top-left" : "popover_top-right";
      } else {
        openDirection.current =
          dropdownSide === "left"
            ? "popover_bottom-left"
            : "popover_bottom-right";
      }
  };

  const closeManager = () => {
    if (!internalClickBlock.current) {
      setOpen(false);
    }
    internalClickBlock.current = false;
  };

  useEffect(() => {
    window.addEventListener("click", closeManager);
    return () => window.removeEventListener("click", closeManager);
  }, []);

  const buttonProps = {
    ...restOfProps,
    onClick: () => {
      internalClickBlock.current = true;
      handleOpenDirection();
      setOpen(!open);
    },
    buttonClasses: twMerge(
      `flex max-w-full w-full justify-between h-full `,
      button?.buttonClasses
    ),
    size: button?.size,
    name: button?.name,
    buttonRef,
    color: hasError ? Colors.RED : button?.color,
  };

  const buttonContent = (
    <>
      {children ?? (
        <span
          className=" truncate "
          dangerouslySetInnerHTML={{ __html: getSelectedString() }}
        />
      )}
      {!removeEdge && (
        <span className=" flex ml-2 my-auto">
          {open ? <EdgeUpIcon size={2} /> : <EdgeDownIcon size={2} />}
        </span>
      )}
    </>
  );

  return (
    <div className={twMerge(" relative h-fit ", wrapperClasses)}>
      <div className=" relative ">
        {label && (
          <label
            onClick={() => {
              internalClickBlock.current = true;
              handleOpenDirection();
              setOpen(!open);
            }}
            className={`block mb-2 text-sm font-medium 
          ${
            hasError
              ? "text-red-700 dark:text-red-300"
              : open
              ? "text-blue-700 dark:text-blue-300"
              : "text-neutral-900 dark:text-white"
          }
           `}
          >
            {label}
            {required && "*"}
          </label>
        )}
        {textButton ? (
          <TextButton {...buttonProps}>{buttonContent}</TextButton>
        ) : (
          <Button {...buttonProps}>{buttonContent}</Button>
        )}

        <div
          id="dropdownSearch"
          ref={listRef}
          className={`
        ${fitDropdownSize ? " w-full " : " w-fit "}
        ${open ? "" : " hidden "}
        z-10 bg-white rounded-lg shadow absolute dark:bg-neutral-700
         ${openDirection.current}
         `}
        >
          {searcher && (
            <div className="px-3 pt-3" onClick={(e) => e.stopPropagation()}>
              <label htmlFor="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400 ">
                  <SearchIcon size={4} color={Colors.SLATE} />
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="block w-full p-2 pl-10 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </div>
          )}
          <ul className="flex flex-col gap-1 h-fit max-h-44 px-3 py-3 overflow-y-auto text-sm text-neutral-700 dark:text-neutral-200 shadow-xl">
            {options
              .filter(({ label }) =>
                label.toLowerCase().includes(filter.toLowerCase())
              )
              .map((option, index) => {
                let isItemSelected = false;
                if (value === option.key) isItemSelected = true;
                if (Array.isArray(value) && value.includes(option.key))
                  isItemSelected = true;

                return (
                  <li key={`${option.key}-${index}`}>
                    <div
                      onClick={() => {
                        handleItemClicked(option.key);
                        if (!multipleSelection) setOpen(false);
                      }}
                      className={`flex items-center cursor-pointer pl-2 h-8 rounded active:bg-neutral-500 
                    ${
                      isItemSelected
                        ? " bg-neutral-100 dark:bg-neutral-600"
                        : ""
                    }
                     hover:bg-neutral-200 dark:hover:bg-neutral-500`}
                    >
                      {multipleSelection && (
                        <input
                          id="checkbox-item-11"
                          type="checkbox"
                          onChange={() => {}}
                          checked={isItemSelected}
                          className="w-4 h-4 cursor-pointer text-blue-600 bg-neutral-100 border-neutral-300 rounded dark:bg-neutral-600 dark:border-neutral-500"
                        />
                      )}
                      <label
                        className="w-full truncate cursor-pointer py-2 mx-2 text-sm font-medium text-neutral-900 rounded dark:text-neutral-300"
                        dangerouslySetInnerHTML={{ __html: option.label }}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

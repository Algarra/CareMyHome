"use client";
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  inputColorsClasses,
  inputErrorClasses,
  labelInputColorsClasses,
} from "./utils";
import { twMerge } from "tailwind-merge";
import { Colors } from "../../theme/colors";

type OwnProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  type?: HTMLInputTypeAttribute;
  color?: Colors;
  hasError?: boolean;
  focusControl?: boolean;
  wrapperClasses?: React.ComponentProps<"div">["className"];
  inputClasses?: React.ComponentProps<"input">["className"];
  handleOnChange?: ChangeEventHandler<HTMLInputElement>;
  inputRef?: RefObject<HTMLInputElement>;
};

export const Input: FC<OwnProps> = ({
  label,
  wrapperClasses,
  inputClasses,
  focusControl,
  color = Colors.BLUE,
  hasError,
  handleOnChange,
  type = "text",
  inputRef,
  ...restOfProps
}) => {
  const internInputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(!!focusControl);

  useEffect(() => {
    if (typeof focusControl !== "undefined") setFocus(focusControl);
  }, [focusControl]);

  return (
    <div
      onBlur={() => {
        if (typeof focusControl === "undefined") setFocus(false);
      }}
      onFocus={() => {
        if (typeof focusControl === "undefined") setFocus(true);
      }}
      className={twMerge(" w-full relative ", wrapperClasses)}
    >
      {label && (
        <label
          onClick={() => {
            inputRef?.current?.focus();
            internInputRef.current?.focus();
          }}
          className={`block mb-2 cursor-text text-sm font-medium transition-all duration-200
          ${
            focus
              ? labelInputColorsClasses[hasError ? Colors.RED : color]
              : hasError
              ? labelInputColorsClasses[Colors.RED]
              : "text-gray-900 dark:text-white"
          }
           `}
        >
          {label}
          {restOfProps.required && "*"}
        </label>
      )}
      {restOfProps.maxLength && (
        <span
          className={`
        ${
          focus
            ? labelInputColorsClasses[hasError ? Colors.RED : color]
            : hasError
            ? labelInputColorsClasses[Colors.RED]
            : "text-gray-900 dark:text-white/50 "
        }
        absolute top-2 text-xs right-2 `}
        >
          {(restOfProps?.value as string).length} / {restOfProps.maxLength}
        </span>
      )}
      <input
        type={type}
        ref={inputRef}
        onInputCapture={handleOnChange}
        onInput={handleOnChange}
        onChange={handleOnChange}
        onBlur={() => {
          if (typeof focusControl === "undefined") setFocus(false);
        }}
        className={twMerge(
          `${
            hasError
              ? inputErrorClasses
              : "bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white "
          } 
            ${inputColorsClasses[hasError ? Colors.RED : color]}
            shadow-sm transition-all remove-arrow duration-200 text-base disabled:opacity-60 outline-none border rounded-lg ring-0 dark:bg-gray-700 block w-full p-2 m-0 dark:shadow-sm-light
          `,
          inputClasses
        )}
        {...restOfProps}
      />
    </div>
  );
};

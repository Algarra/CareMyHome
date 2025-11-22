import {
  ButtonHTMLAttributes,
  ComponentProps,
  DetailedHTMLProps,
  FC,
  ReactNode,
  RefObject,
} from "react";
import { Colors } from "../../../theme/colors";
import { ButtonSizes, buttonColorsClasses } from "./utils";
import { OptionalButtonLink } from "../../utils";
import { twMerge } from "tailwind-merge";
import { tshirtSizes } from "../../../theme/tshirtSizes";

type OwnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: Colors;
  size?: tshirtSizes;
  href?: string;
  children: ReactNode;
  buttonClasses?: ComponentProps<"button">["className"];
  borderAnimation?: boolean;
  buttonRef?: RefObject<HTMLButtonElement | null>;
};

export const Button: FC<OwnProps> = ({
  color = Colors.BLUE,
  size = tshirtSizes.BASE,
  borderAnimation = false,
  children,
  buttonClasses,
  buttonRef = undefined,
  href,
  ...restOfProps
}) => {
  return (
    <OptionalButtonLink href={href}>
      <button
        type="button"
        className={twMerge(
          ` 
      ${ButtonSizes[size]} 
      text-white bg-gradient-to-r 
      ${
        restOfProps.disabled
          ? "from-gray-500 via-gray-500 to-gray-500 text-gray-300 dark:text-black"
          : buttonColorsClasses[color]
      } 
      ${!restOfProps.disabled && "hover:opacity-80 active:opacity-90 "}
       focus:outline-none ring-0 font-medium rounded-md text-sm text-center 
      ${
        borderAnimation &&
        "relative before:dark:border-gray-100/70 after:dark:border-gray-100/70 before:border-gray-900/70 after:border-gray-900/70 before:rounded-br-md after:rounded-tl-md before:absolute before:bottom-0 before:right-0 before:h-4 before:w-4 before:border-b before:border-r before:transition-all before:duration-300 before:ease-in-out after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:border-t after:border-l after:transition-all after:duration-300 after:ease-in-out "
      } `,
          buttonClasses
        )}
        ref={buttonRef}
        {...restOfProps}
      >
        {children}
      </button>
    </OptionalButtonLink>
  );
};

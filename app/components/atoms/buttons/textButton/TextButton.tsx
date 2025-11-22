import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
  RefObject,
} from "react";
import { Colors } from "../../../theme/colors";
import {
  TextButtonSizes,
  textButtonColorsClasses,
  textButtonHighlightedClasses,
} from "./utils";
import { OptionalButtonLink } from "../../utils";
import { twMerge } from "tailwind-merge";
import { tshirtSizes } from "../../../theme/tshirtSizes";

export type TextButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: Colors;
  size?: tshirtSizes;
  children: ReactNode;
  buttonClasses?: React.ComponentProps<"button">["className"];
  highlighted?: boolean;
  borderAnimation?: boolean;
  href?: string;
  buttonRef?: RefObject<HTMLButtonElement | null>;
  blank?: boolean;
};

export const TextButton: FC<TextButtonProps> = ({
  color = Colors.BLUE,
  size = tshirtSizes.BASE,
  borderAnimation = false,
  children,
  buttonClasses,
  highlighted,
  href,
  buttonRef = undefined,
  blank,
  ...restOfProps
}) => {
  return (
    <OptionalButtonLink href={href} blank={!!blank}>
      <button
        type="button"
        ref={buttonRef}
        className={twMerge(
          `${TextButtonSizes[size]} 
            ${
              highlighted
                ? textButtonHighlightedClasses[color]
                : `${textButtonColorsClasses[color]} text-neutral-800 dark:text-neutral-300`
            }
            relative flex items-center text-left hover:underline ring-0 font-medium text-sm transition-all 
            ${
              borderAnimation &&
              "before:dark:border-neutral-100/70 after:dark:border-neutral-100/70 before:border-neutral-900/70 after:border-neutral-900/70 before:rounded-br-md after:rounded-tl-md before:absolute before:bottom-0 before:right-0 before:h-4 before:w-4 before:border-b before:border-r before:transition-all before:duration-300 before:ease-in-out after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:border-t after:border-l after:transition-all after:duration-300 after:ease-in-out hover:before:h-[100%] hover:before:w-[100%] hover:after:h-[100%] hover:after:w-[100%]"
            }
          `,
          buttonClasses
        )}
        {...restOfProps}
      >
        {children}
      </button>
    </OptionalButtonLink>
  );
};

import { FC, MouseEventHandler, ReactNode } from "react";
import { alertColorsClasses } from "./utils";
import { Colors } from "../../theme/colors";
import { InfoIcon } from "../../theme/icons/Info";
import { CrossIcon } from "../../theme/icons/Cross";

type OwnProps = {
  children: ReactNode;
  color?: keyof typeof alertColorsClasses;
  handleAlertClose: MouseEventHandler<HTMLButtonElement>;
};

export const Alert: FC<OwnProps> = ({
  children,
  color = Colors.VIOLET,
  handleAlertClose,
}) => {
  return (
    <div
      id="alert-border-1"
      className={` ${alertColorsClasses[color]}
       flex items-center p-4 mb-4 border-t-4 dark:bg-neutral-800 `}
      role="alert"
    >
      <InfoIcon size={4} />
      <div className="ml-3 text-sm font-medium">{children}</div>
      <button
        type="button"
        className=" ml-2 -mx-1.5 -my-1.5 bg-white-50 rounded-lg focus:ring-2 p-1.5 hover:bg-white-200 hover:bg-opacity-20 b inline-flex items-center justify-center h-8 w-8 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        data-dismiss-target="#alert-border-1"
        aria-label="Close"
        onClick={handleAlertClose}
      >
        <span className="sr-only">Close</span>
        <CrossIcon size={3} />
      </button>
    </div>
  );
};

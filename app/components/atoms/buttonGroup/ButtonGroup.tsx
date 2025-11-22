import { FC, Fragment, MouseEventHandler, ReactNode } from "react";
import { OptionalButtonLink } from "../utils";

type ButtonGroupProps = {
  buttons: {
    content: ReactNode;
    href?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  }[];
};

export const ButtonGroup: FC<ButtonGroupProps> = ({ buttons }) => {
  const displayedButtons = [...buttons];
  const firstItem = displayedButtons.splice(0, 1)[0];
  const lastItem = displayedButtons.splice(-1)[0];
  const restOfItems = [...displayedButtons];
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <OptionalButtonLink href={firstItem.href}>
        <button
          type="button"
          onClick={firstItem.handleClick}
          className="px-4 py-2 text-sm font-medium text-neutral-900 bg-transparent border border-neutral-900 rounded-l-lg hover:bg-neutral-900 hover:text-white focus:z-10 focus:bg-neutral-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          {firstItem.content}
        </button>
      </OptionalButtonLink>

      {restOfItems.map((item, index) => (
        <Fragment key={`restOfItems-${buttons.length}-${index}`}>
          <OptionalButtonLink href={item.href}>
            <button
              type="button"
              onClick={item.handleClick}
              className={`px-4 py-2 text-sm font-medium text-neutral-900 bg-transparent 
              ${index !== 0 ? " border-l " : ""}
               border-t border-b border-neutral-900 hover:bg-neutral-900 hover:text-white focus:z-10 focus:bg-neutral-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700`}
            >
              {item.content}
            </button>
          </OptionalButtonLink>
        </Fragment>
      ))}

      <OptionalButtonLink href={lastItem.href}>
        <button
          type="button"
          onClick={lastItem.handleClick}
          className="px-4 py-2 text-sm font-medium text-neutral-900 bg-transparent border border-neutral-900 rounded-r-md hover:bg-neutral-900 hover:text-white focus:z-10 focus:bg-neutral-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          {lastItem.content}
        </button>
      </OptionalButtonLink>
    </div>
  );
};

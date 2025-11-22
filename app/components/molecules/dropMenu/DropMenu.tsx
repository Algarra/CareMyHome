import Link from "next/link";
import { TextButton } from "../../atoms/buttons/textButton";
import { tshirtSizes } from "../../theme/tshirtSizes";

export const DropMenu = ({
  open,
  links,
}: {
  open: boolean;
  links: { link: string; text: string }[];
}) => {
  return (
    <div
      className={`absolute z-30 grid 
      ${open ? "" : "hidden"}
       w-[95vw] md:w-auto text-sm bg-white border border-neutral-100 rounded-lg shadow-md dark:border-neutral-700  dark:bg-neutral-700`}
    >
      <div className="p-4 pb-0 flex w-full  text-neutral-900 md:pb-4 dark:text-white">
        <ul className="flex flex-col w-full flex-wrap h-60 md:h-36 ">
          {links.map((route) => (
            <li key={`${route.link}+${route.text}`}>
              <Link href={route.link} aria-current="page">
                <TextButton size={tshirtSizes.SMALL}>{route.text}</TextButton>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

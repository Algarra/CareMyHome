import { TranslationT } from "@/app/utils";
import Link from "next/link";

export const Pagination = ({
  searchParams,
  numberOfPages,
  path,
  t,
  scroll = true,
}: {
  searchParams: { [key: string]: string | undefined };
  numberOfPages: number;
  path: string;
  t: TranslationT;
  scroll?: boolean;
}) => {
  const pageButtons = [];
  for (let index = 0; index < numberOfPages; index++) {
    pageButtons.push(index);
  }
  const actualPage = Number(searchParams?.page ?? "1");

  const getNewSearchParams = (newPage: number) => {
    const newSearchParams = { ...searchParams };
    newSearchParams.page = newPage.toString();
    let newSearchParamsString = "";

    Object.keys(newSearchParams).forEach((SPkey, index) => {
      if (!index) {
        newSearchParamsString = newSearchParamsString + "?";
      } else {
        newSearchParamsString = newSearchParamsString + "&";
      }
      newSearchParamsString =
        newSearchParamsString + `${SPkey}=${newSearchParams[SPkey]}`;
    });
    return newSearchParamsString;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <Link
            href={
              path +
              getNewSearchParams(
                actualPage && actualPage > 1 ? (actualPage ?? 1) - 1 : 1
              )
            }
            replace
            scroll={scroll}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral-500 bg-white border border-e-0 border-neutral-300 rounded-s-lg hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            {t("components.pagination.previous")}
          </Link>
        </li>
        {pageButtons.map((page) => (
          <li key={`${actualPage}-${page}`}>
            <Link
              href={path + getNewSearchParams(page + 1)}
              replace
              scroll={scroll}
              className={` ${
                page === actualPage - 1
                  ? " text-amber-600 dark:text-amber-500 hover:text-amber-700 "
                  : " text-neutral-500 hover:text-neutral-700 dark:hover:text-white dark:text-neutral-400"
              }
               flex items-center justify-center px-3 h-8 leading-tight bg-white border border-neutral-300 hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 `}
            >
              {page + 1}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={
              path +
              getNewSearchParams(
                actualPage && actualPage === numberOfPages
                  ? numberOfPages
                  : actualPage + 1
              )
            }
            replace
            scroll={scroll}
            className="flex items-center justify-center px-3 h-8 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-e-lg hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            {t("components.pagination.next")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

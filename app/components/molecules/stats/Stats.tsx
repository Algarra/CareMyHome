import { twMerge } from "tailwind-merge";

const colsGrid = [
  "",
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-2 sm:grid-cols-3",
  "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
];

export const Stats = ({
  items,
  valueClasses,
}: {
  items: { value: string | number; label: string }[];
  valueClasses?: string;
}) => {
  const colsLength = items.length < 6 ? items.length : 5;
  return (
    <dl
      className={`grid gap-6 mt-1 w-full text-gray-900 ${colsGrid[colsLength]} dark:text-white`}
    >
      {items.map((itm) => (
        <div
          key={itm.label}
          className="flex flex-col items-center justify-center"
        >
          <dt
            className={twMerge(
              " text-center mb-2 text-3xl md:text-4xl font-extrabold",
              valueClasses
            )}
          >
            {itm.value}
          </dt>
          <dd className="font-light text-center text-gray-700 dark:text-gray-300">
            {itm.label}
          </dd>
        </div>
      ))}
    </dl>
  );
};

import { ReactNode } from "react";
import InifiniteList from "./InfiniteList";

export const InfiniteHorizontal = ({ items }: { items: ReactNode[] }) => {
  return (
    <div className=" group w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <InifiniteList />

      <ul className="flex items-center justify-center md:justify-start gap-2 mx-1 animate-infinite-scroll ">
        {items.map((item, index) => (
          <li key={`1-${index}`}>{item}</li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start gap-2 mx-1 animate-infinite-scroll ">
        {items.map((item, index) => (
          <li key={`2-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

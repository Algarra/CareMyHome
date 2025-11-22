"use client";
import { useRef } from "react";

const InifiniteList = () => {
  const divRef = useRef<HTMLDivElement>(null);

  setInterval(function () {
    const uls = divRef.current?.parentNode?.querySelectorAll("ul");
    if (!uls) return;
    const ul = uls?.length > 1 ? uls[1] : uls[0];
    if (!ul) return;
    ul.insertAdjacentHTML("afterend", ul.outerHTML);
    if (uls?.length > 2) uls[uls?.length - 3].classList.add("hidden");
  }, 25000);

  setInterval(function () {
    const uls = divRef.current?.parentNode?.querySelectorAll("ul");
    if (uls?.[0]?.classList?.contains("hidden")) {
      uls?.[0].remove();
    }
  }, 25000);

  return <div ref={divRef}></div>;
};

export default InifiniteList;

import { ReactNode } from "react";

export const Blockquote = ({ children }: { children: ReactNode }) => {
  return (
    <blockquote className="p-4 my-4 border-l-4 border-neutral-300 bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-800">
      <p className="text-xl italic font-medium leading-relaxed text-neutral-900 dark:text-white">
        {children}
      </p>
    </blockquote>
  );
};

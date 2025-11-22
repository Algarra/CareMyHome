import { FC, ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export const BadgeSkeleton: FC<BadgeProps> = ({ children }) => {
  return (
    <span
      className={`bg-neutral-300 dark:bg-neutral-700 animate-pulse text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}
    >
      {children}
    </span>
  );
};

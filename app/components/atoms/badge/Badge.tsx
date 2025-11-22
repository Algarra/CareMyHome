import { FC, ReactNode } from "react";
import { badgeColorsClasses } from "./utils/BadgeColors";
import { Colors } from "../../theme/colors";

type BadgeProps = {
  color?: Colors;
  children: ReactNode;
};

export const Badge: FC<BadgeProps> = ({ color = Colors.BLUE, children }) => {
  return (
    <span
      className={`${badgeColorsClasses[color]} 
     text-xs font-medium mr-2 px-2.5 py-0.5 rounded h-5 `}
    >
      {children}
    </span>
  );
};

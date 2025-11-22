import { Colors } from "../colors";
import { iconColorClasses, iconSizes } from "./utils";

export const BathroomIcon = ({
  size = 5,
  color,
}: {
  size?: number;
  color?: Colors;
}) => {
  return (
    <svg
      className={` ${iconSizes[size]} ${color ? iconColorClasses[color] : ""} `}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path d="M25,18H7c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2h18c1.1,0,2,0.9,2,2v0C27,17.1,26.1,18,25,18z" />
      <path d="M25,18c0,5-4,9-9,9s-9-4-9-9" />
      <polyline points="21.7,25 23,31 9,31 10.3,25 " />
      <path d="M24,14H8V5c0-2.2,1.8-4,4-4h8c2.2,0,4,1.8,4,4V14z" />
      <line x1="12" y1="5" x2="14" y2="5" />
    </svg>
  );
};

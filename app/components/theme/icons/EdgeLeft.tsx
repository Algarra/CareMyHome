import { Colors } from "../colors";
import { iconColorClasses, iconSizes } from "./utils";

export const EdgeLeftIcon = ({
  size = 5,
  color,
}: {
  size?: number;
  color?: Colors;
}) => (
  <svg
    className={` ${iconSizes[size]} ${color ? iconColorClasses[color] : ""} `}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 8 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
    />
  </svg>
);

import { Colors } from "../colors";
import { iconColorClasses, iconSizes } from "./utils";

export const GripIcon = ({
  size = 5,
  color,
}: {
  size?: number;
  color?: Colors;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={` ${iconSizes[size]} ${color ? iconColorClasses[color] : ""} `}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 9a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 6a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7-6a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 6a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7-6a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 6a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
    />
  </svg>
);

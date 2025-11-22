import { Colors } from "../colors";
import { iconColorClasses, iconSizes } from "./utils";

export const BoxIcon = ({
  size = 5,
  color,
}: {
  size?: number;
  color?: Colors;
}) => (
  <svg
    className={` ${iconSizes[size]} ${color ? iconColorClasses[color] : ""} `}
    viewBox="0 0 50 50"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 6h44v5h-44zm3 7v33h38v-33h-38zm26 9h-15v-3h15v3z" />
  </svg>
);

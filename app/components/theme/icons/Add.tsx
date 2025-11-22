import { Colors } from "../colors";
import { iconSizes, iconColorClasses } from "./utils";

export const AddIcon = ({
  size = 5,
  color,
}: {
  size?: number;
  color?: Colors;
}) => (
  <svg
    className={` ${iconSizes[size]} ${color ? iconColorClasses[color] : ""} `}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="4 4 18 18"
  >
    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
  </svg>
);

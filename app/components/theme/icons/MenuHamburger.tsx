import { Colors } from "../colors";
import { iconColorClasses, iconSizes } from "./utils";

export const MenuHamburgerIcon = ({
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
    viewBox="0 0 17 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1h15M1 7h15M1 13h15"
    />
  </svg>
);

import { Colors } from "../colors";
import { iconColorClasses, iconSizes } from "./utils";

export const DrawCross1 = ({
  size = 5,
  color,
}: {
  size?: number;
  color?: Colors;
}) => (
  <svg
    className={` ${iconSizes[size]} ${color ? iconColorClasses[color] : ""} `}
    viewBox="0 0 76 91"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.0267 12.5325C24.7144 28.2487 41.0129 42.0246 63.2182 50.3385"
      stroke="currentColor"
      stroke-linecap="round"
    />
    <path
      d="M75.0549 1C47.4266 28.2411 25.2228 59.8195 1 90.0087"
      stroke="currentColor"
      stroke-linecap="round"
    />
  </svg>
);

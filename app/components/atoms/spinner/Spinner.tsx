import { Colors } from "../../theme/colors";
import { SpinnerIcon } from "../../theme/icons/Spinner";

export const Spinner = ({
  size = 4,
  color = Colors.AMBER,
}: {
  size?: number;
  color?: Colors;
}) => {
  return (
    <div role="status">
      <SpinnerIcon size={size} color={color} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

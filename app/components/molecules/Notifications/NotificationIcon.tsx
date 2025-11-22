import { CheckIcon } from "../../theme/icons/Check";
import { AlertIcon } from "../../theme/icons/Alert";
import { NotificationOptions } from "@/app/types/notification";

export const NotificationIcon = ({ type }: { type: string }) => {
  if (type === NotificationOptions.SUCCESS) return <CheckIcon />;
  if (type === NotificationOptions.ALERT) return <AlertIcon />;
  return <AlertIcon />;
};

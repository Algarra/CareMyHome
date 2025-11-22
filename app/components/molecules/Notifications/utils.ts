import { NotificationOptions } from "@/app/types/notification";

export const getNotificationColor = (type: string) => {
  if (type === NotificationOptions.SUCCESS)
    return " from-lime-900/90 to-neutral-900/50 ";
  if (type === NotificationOptions.ALERT)
    return " from-orange-900 to-neutral-900 ";
  return " from-red-900 to-neutral-900 ";
};

export const getNotificationTextColor = (type: string) => {
  if (type === NotificationOptions.SUCCESS) return "text-green-200";
  if (type === NotificationOptions.ALERT) return "text-orange-200";
  return "text-red-200";
};

export const getNotificationBgColor = (type: string) => {
  if (type === NotificationOptions.SUCCESS) return "bg-green-500";
  if (type === NotificationOptions.ALERT) return "bg-orange-500";
  return "bg-red-500";
};

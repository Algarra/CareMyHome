export enum NotificationOptions {
  SUCCESS = "success",
  ERROR = "error",
  ALERT = "alert",
}

export type Notification = {
  type: NotificationOptions;
  message: string;
  seconds?: number;
};

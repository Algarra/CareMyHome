"use client";
import { useEffect, useRef, useState } from "react";
import {
  getNotificationBgColor,
  getNotificationColor,
  getNotificationTextColor,
} from "./utils";
import { NotificationIcon } from "./NotificationIcon";
import { useNotificationsStore } from "../../../zustand/notifications";
import { NotificationOptions } from "@/app/types/notification";
import { CrossIcon } from "../../theme/icons/Cross";

export const Notifications = () => {
  const { notification, setNotification } = useNotificationsStore();
  const [show, setShow] = useState(false);
  const seconds = notification.seconds ?? 4;

  const update = useRef<number>(0);

  useEffect(() => {
    const close = () => {
      if (update.current - new Date().getTime() < -(seconds * 1000)) {
        setShow(false);
        setTimeout(() => {
          setNotification({ type: NotificationOptions.ERROR, message: "" });
        }, 200);
      } else {
        setTemporalText();
      }
    };
    const setTemporalText = () => {
      setShow(true);
      setTimeout(() => {
        close();
      }, seconds * 1000);
    };

    if (notification.message) {
      update.current = new Date().getTime();
      setTemporalText();
    }
  }, [notification, seconds, setNotification]);

  if (!notification.message) return null;
  return (
    <div
      className={` 
      ${show && notification.message ? "right-2 md:right-5" : "-right-[100%]"}
      ${getNotificationColor(notification.type)}
      fixed ring-1 ring-neutral-200/20 z-50 top-20 transition-all flex items-center p-4 mb-4 w-[90%] max-w-xs rounded-lg shadow text-neutral-300 bg-gradient-to-t`}
    >
      <div
        className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg 
        ${getNotificationTextColor(notification.type)}
        ${getNotificationBgColor(notification.type)} `}
      >
        <NotificationIcon type={notification.type} />
      </div>
      <div className="ml-3 text-sm font-normal">{notification.message}</div>
      {typeof seconds !== "number" && (
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-neutral-400 hover:text-neutral-900 rounded-lg focus:ring-2 focus:ring-neutral-300 p-1.5 hover:bg-neutral-100 inline-flex h-8 w-8 dark:text-neutral-500 dark:hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <CrossIcon />
        </button>
      )}
    </div>
  );
};

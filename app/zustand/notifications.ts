'use client';
import { create } from 'zustand';
import { Notification, NotificationOptions } from '../types/notification';

export const useNotificationsStore = create<{
	notification: Notification;
	setNotification: (notification: Notification) => void;
}>(set => ({
	notification: {
		type: NotificationOptions.ERROR,
		message: '',
	},
	setNotification: (notification: Notification) => {
		set(state => {
			if (state.notification.type !== notification.type || state.notification.message !== notification.message) {
				return { notification };
			}
			return state; // Avoid unnecessary re-renders
		});
	},
}));

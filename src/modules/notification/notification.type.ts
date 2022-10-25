export enum NotificationInject {
  NOTIFICATION_QUEUE = 'NotificationQueue',
}

export type Notification = {
  data?: Record<string, any>;
  email?: string;
  userId?: number;
};

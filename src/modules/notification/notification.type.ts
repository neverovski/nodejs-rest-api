export enum NotificationInject {
  NOTIFICATION_QUEUE = 'NotificationQueue',
}

export type ForgotPassword = {
  email?: string;
  token: string;
};

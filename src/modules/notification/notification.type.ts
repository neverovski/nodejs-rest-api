import { TemplateType } from '@lib';

export enum NotificationInject {
  NOTIFICATION_SERVICE = 'NotificationService',
}

export type Notification = {
  data?: Record<string, any>;
  email?: string;
  template: TemplateType;
};

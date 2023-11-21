import { TemplatePath } from '@common/enums';

export type NotificationMethod = {
  email?: string | null;
  phone?: string | null;
};

export type NotificationParams = {
  data?: Record<string, any>;
  template: TemplatePath;
};

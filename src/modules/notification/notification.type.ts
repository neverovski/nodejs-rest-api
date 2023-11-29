import { TemplateOption } from '@common/types';

export type NotificationMethod = {
  email?: string | null;
  phone?: string | null;
};

export type NotificationParams = Pick<TemplateOption, 'data' | 'templatePath'>;

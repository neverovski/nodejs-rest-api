import { TemplatePath } from '@common/enums';

export type TemplateOption = {
  data?: Record<string, any>;
  isHTML?: boolean;
  isLayout?: boolean;
  templatePath: TemplatePath;
};

export type TemplateResponse = {
  html?: string;
  markdown: string;
  subject?: string;
};

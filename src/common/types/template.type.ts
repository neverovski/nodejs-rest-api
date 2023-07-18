export type TemplateOption = {
  data?: Record<string, any>;
  isHTML?: boolean;
  isLayout?: boolean;
  template: string;
};

export type TemplateResponse = {
  html?: string;
  markdown: string;
  subject?: string;
};

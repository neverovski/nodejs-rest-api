export enum TemplateType {
  EMAIL_VERIFICATION = 'auth/email-verification',
  PASSWORD_CHANGED = 'user/password-changed',
  PASSWORD_RESET = 'auth/password-reset',
  REGISTRATION = 'user/registration',
}

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

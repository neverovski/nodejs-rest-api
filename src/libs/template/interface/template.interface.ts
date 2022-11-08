import { TemplateOption, TemplateResponse } from '../template.type';

export interface ITemplate {
  getMessage(options: TemplateOption): Promise<TemplateResponse>;
}

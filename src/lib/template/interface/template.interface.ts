import { TemplateRequest, TemplateResponse } from '../template.type';

export interface ITemplate {
  getMessage(options: TemplateRequest): Promise<TemplateResponse>;
}

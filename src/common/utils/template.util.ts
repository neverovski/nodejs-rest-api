import fs from 'fs/promises';
import { resolve } from 'path';

import { marked } from 'marked';
import { decorator as MemDecorator } from 'mem';
import * as Mustache from 'mustache';

import { FOLDER_TEMPLATE, LAYOUT_NAME } from '@common/constants';
import { TemplateOption, TemplateResponse } from '@common/types';

export class TemplateUtil {
  static async getMessage(options: TemplateOption): Promise<TemplateResponse> {
    const template = await this.getTemplateByName(options.template);

    const markdownRaw = Mustache.render(template, options.data);

    const subject = this.getSubjectFromMarkdown(markdownRaw);
    const markdown = this.transformMarkdown(markdownRaw, { subject });
    const html = await this.convertMarkdownToHtml(markdownRaw, options);

    return { markdown, subject, html };
  }

  @MemDecorator()
  protected static async getTemplateByName(name: string) {
    if (!name.endsWith('.html')) {
      name = `${name}.md`;
    }

    return fs.readFile(resolve(FOLDER_TEMPLATE, name), 'utf8');
  }

  private static async convertMarkdownToHtml(
    markdown: string,
    options: TemplateOption,
  ) {
    const layout = await this.getTemplateByName(LAYOUT_NAME);

    if (options.isHTML && options.isLayout) {
      return Mustache.render(layout, { content: marked(markdown) });
    }

    if (options.isHTML) {
      return marked(markdown);
    }

    return '';
  }

  private static getSubjectFromMarkdown(markdown: string) {
    if (markdown && markdown.startsWith('#')) {
      return markdown.split('\n', 1)?.[0]?.replace('#', '').trim() || '';
    }

    return '';
  }

  private static transformMarkdown(
    markdown: string,
    { subject }: Pick<TemplateResponse, 'subject'>,
  ) {
    if (subject) {
      return markdown.replace(`# ${subject}`, '').trim();
    }

    return markdown;
  }
}

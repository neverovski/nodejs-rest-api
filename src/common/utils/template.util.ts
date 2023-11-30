import fs from 'node:fs/promises';
import { resolve } from 'node:path';

import { marked } from 'marked';
import { decorator as MemDecorator } from 'mem';
import * as Mustache from 'mustache';

import { FOLDER_TEMPLATE_NAME, LAYOUT_PATH } from '@common/constants';
import { TemplateOption, TemplateResponse } from '@common/types';

export class TemplateUtil {
  static async getMessage(options: TemplateOption): Promise<TemplateResponse> {
    const template = await this.getTemplateByPath(options.templatePath);

    const markdownRaw = Mustache.render(template, options.data);

    const subject = this.getSubjectFromMarkdown(markdownRaw);
    const markdown = this.transformMarkdown(markdownRaw, { subject });
    const html = await this.convertMarkdownToHtml(markdownRaw, options);

    return { markdown, subject, html };
  }

  @MemDecorator()
  protected static async getTemplateByPath(path: string) {
    if (!path.endsWith('.html')) {
      path = `${path}.md`;
    }

    return fs.readFile(resolve(FOLDER_TEMPLATE_NAME, path), 'utf8');
  }

  private static async convertMarkdownToHtml(
    markdown: string,
    options: TemplateOption,
  ) {
    const layout = await this.getTemplateByPath(LAYOUT_PATH);

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

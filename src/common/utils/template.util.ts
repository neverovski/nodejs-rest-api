/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import fs from 'fs/promises';
import { resolve } from 'path';

import { marked } from 'marked';
import mem from 'mem';
import * as Mustache from 'mustache';

import { FOLDER_TEMPLATE, LAYOUT_NAME } from '@common/constants';
import { TemplateOption, TemplateResponse } from '@common/types';

//FIXME:
export class TemplateUtil {
  private static readonly readTemplate = mem(
    TemplateUtil.readTemplateUnMemoized,
  );

  static async getMessage(options: TemplateOption): Promise<TemplateResponse> {
    const layout = await this.readTemplate(LAYOUT_NAME);
    const template = await this.readTemplate(options.template);

    let markdown = Mustache.render(template, options.data);
    let html = '';
    let subject = '';

    if (options.isHTML && options.isLayout) {
      html = Mustache.render(layout, { content: marked(markdown) });
    } else if (options.isHTML) {
      html = marked(markdown);
    }

    if (markdown && markdown.startsWith('#')) {
      subject = markdown.split('\n', 1)?.[0]?.replace('#', '').trim() || '';

      if (subject) {
        markdown = markdown.replace(`# ${subject}`, '');
      }
    }

    return { markdown, subject, html };
  }

  private static async readTemplateUnMemoized(name: string) {
    if (!name.endsWith('.html')) name = `${name}.md`;

    return fs.readFile(resolve(FOLDER_TEMPLATE, name), 'utf8');
  }
}

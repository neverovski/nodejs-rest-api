/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument */
import { promises as fs } from 'fs';
import { join } from 'path';

import { marked } from 'marked';
import mem from 'mem';
import * as Mustache from 'mustache';

import { TemplateRequest, TemplateResponse } from '@utils';

export default (() => {
  const readTemplateUnMemoized = async (name: string) => {
    if (!name.endsWith('.html')) name = `${name}.md`;

    return fs.readFile(join('.', 'src', 'templates', name), 'utf8');
  };

  const readTemplate = mem(readTemplateUnMemoized);

  const getMessage = async (
    options: TemplateRequest,
  ): Promise<TemplateResponse> => {
    const layout = await readTemplate('layout.html');
    const template = await readTemplate(options.template);

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
  };

  return { getMessage };
})();

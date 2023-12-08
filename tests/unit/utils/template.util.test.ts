import * as fs from 'node:fs/promises';
import { resolve } from 'node:path';

import { marked } from 'marked';
import Mustache from 'mustache';

import { FOLDER_TEMPLATE_NAME } from '@common/constants';
import { TemplatePath } from '@common/enums';
import { TemplateUtil } from '@common/utils/template.util';

jest.mock('node:fs/promises');
jest.mock('mustache');
jest.mock('marked');

describe('TemplateUtil', () => {
  const templatePath = 'test' as TemplatePath;
  const fullPath = resolve(FOLDER_TEMPLATE_NAME, `${templatePath}.md`);
  const template = '# Test\nThis is a test template {{ key }}.';

  const subject = 'Test';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get message - markdown and html (with layout)', async () => {
    const data = { key: 'value' };

    const options = { templatePath, data, isHTML: true, isLayout: true };
    const markdownRaw = '# Test\nThis is a test template value.';
    const markdown = 'This is a test template value.';
    const html = '<h1>Test</h1><p>This is a test template value.</p>';

    (fs.readFile as jest.Mock).mockResolvedValue(template);
    (Mustache.render as jest.Mock)
      .mockReturnValueOnce(markdownRaw)
      .mockReturnValueOnce(html);
    (marked as unknown as jest.Mock).mockReturnValue(html);

    const result = await TemplateUtil.getMessage(options);

    expect(result).toEqual({ markdown, subject, html });
    expect(fs.readFile).toHaveBeenCalledWith(fullPath, 'utf8');
    expect(Mustache.render).toHaveBeenCalledWith(template, data);
    expect(Mustache.render).toHaveBeenCalledWith(expect.any(String), {
      content: html,
    });
    expect(marked).toHaveBeenCalledWith(markdownRaw);
  });

  it('should get message - markdown and html (without layout)', async () => {
    const data = { key: 'value' };

    const options = { templatePath, data, isHTML: true };
    const markdownRaw = '# Test\nThis is a test template value.';
    const markdown = 'This is a test template value.';
    const html = '<h1>Test</h1><p>This is a test template value.</p>';

    (fs.readFile as jest.Mock).mockResolvedValue(template);
    (Mustache.render as jest.Mock)
      .mockReturnValueOnce(markdownRaw)
      .mockReturnValueOnce(html);
    (marked as unknown as jest.Mock).mockReturnValue(html);

    const result = await TemplateUtil.getMessage(options);

    expect(result).toEqual({ markdown, subject, html });
    expect(Mustache.render).toHaveBeenCalledWith(template, data);
    expect(marked).toHaveBeenCalledWith(markdownRaw);
  });

  it('should get message - markdown', async () => {
    const data = { key: 'value' };

    const options = { templatePath, data };
    const markdownRaw = '# Test\nThis is a test template value.';
    const markdown = 'This is a test template value.';

    (fs.readFile as jest.Mock).mockResolvedValue(template);
    (Mustache.render as jest.Mock).mockReturnValueOnce(markdownRaw);

    const result = await TemplateUtil.getMessage(options);

    expect(result).toEqual({ markdown, subject, html: '' });
    expect(Mustache.render).toHaveBeenCalledWith(template, data);
  });
});

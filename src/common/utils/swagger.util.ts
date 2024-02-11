import { resolve } from 'path';

import swaggerJsdoc, { Options } from 'swagger-jsdoc';

import { author, description, version } from '../../../package.json';

export class SwaggerUtil {
  private static get options(): Options {
    return {
      definition: {
        openapi: '3.0.3',
        info: {
          title: 'Node.js Rest API  - OpenAPI 3.0',
          version,
          description,
          contact: author,
        },
      },
      apis: [
        resolve('swagger.yaml'),
        resolve('src/modules/*/*.controller{.ts,.js}'),
        resolve('src/modules/*/*.yaml'),
      ],
    };
  }

  static spec() {
    return swaggerJsdoc(this.options);
  }
}

import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';

import { JsonSchemaOptions } from '@common/types';
import { ValidateMiddleware } from '@middleware/validate.middleware';

describe('ValidateMiddleware', () => {
  let middleware: ValidateMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    middleware = new ValidateMiddleware();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('schema.params', () => {
    it('should call next function if validation passes', async () => {
      const schemas: JsonSchemaOptions = {
        params: { type: 'object', properties: { id: { type: 'integer' } } },
      };

      mockRequest.params = { id: '1' };

      await Promise.resolve(
        middleware.handler(schemas)(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction,
        ),
      );

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should respond with UnprocessableEntityException if validation fails', async () => {
      const schemas: JsonSchemaOptions = {
        params: { type: 'object', properties: { id: { type: 'integer' } } },
      };

      mockRequest.params = { id: 'invalid' };

      await Promise.resolve(
        middleware.handler(schemas)(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction,
        ),
      );

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: expect.objectContaining({
          message: [{ key: 'id', value: 'Must be integer' }],
        }),
      });
    });
  });

  describe('schema.query', () => {
    it('should call next function if validation passes', async () => {
      const schemas: JsonSchemaOptions = {
        query: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: {
              type: 'string',
            },
          },
          required: ['name'],
        },
      };

      mockRequest.query = { name: 'Test' };

      await Promise.resolve(
        middleware.handler(schemas)(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction,
        ),
      );

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should respond with UnprocessableEntityException if validation fails', async () => {
      const schemas: JsonSchemaOptions = {
        query: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: {
              type: 'string',
            },
          },
          required: ['name'],
        },
      };

      mockRequest.query = { age: '12' };

      await Promise.resolve(
        middleware.handler(schemas)(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction,
        ),
      );

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: expect.objectContaining({
          message: [
            // eslint-disable-next-line quotes
            { key: 'name', value: "Must have required property 'name'" },
            { key: 'age', value: 'Must NOT have additional properties' },
          ],
        }),
      });
    });
  });

  describe('schema.body', () => {
    it('should call next function if validation passes', async () => {
      const schemas: JsonSchemaOptions = {
        body: {
          type: 'object',
          additionalProperties: false,
          properties: {
            firstName: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
            },
          },
          required: ['firstName'],
        },
      };

      mockRequest.body = { firstName: 'Dmitry' };

      await Promise.resolve(
        middleware.handler(schemas)(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction,
        ),
      );

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should respond with UnprocessableEntityException if validation fails', async () => {
      const schemas: JsonSchemaOptions = {
        body: {
          type: 'object',
          additionalProperties: false,
          properties: {
            firstName: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
            },
          },
          required: ['firstName'],
        },
      };

      mockRequest.body = { firstName: 'D.' };

      await Promise.resolve(
        middleware.handler(schemas)(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction,
        ),
      );

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: expect.objectContaining({
          message: [
            {
              key: 'firstName',
              value: 'Must NOT have fewer than 3 characters',
            },
          ],
        }),
      });
    });
  });
});

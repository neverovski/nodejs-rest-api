import ContextMiddleware from './context.middleware';
import InitMiddleware from './init.middleware';
import LoggerMiddleware from './logger.middleware';
// import MetricsMiddleware from './metrics.middleware';

export { default as AsyncMiddleware } from './async.middleware';
export { default as AuthMiddleware } from './auth.middleware';
export { default as ErrorMiddleware } from './error.middleware';
export { default as ValidateMiddleware } from './validate.middleware';

export default [InitMiddleware, ContextMiddleware, LoggerMiddleware];

import InitMiddleware from './init.middleware';
import LoggerMiddleware from './logger.middleware';
// import PrometheusMiddleware from './prometheus.middleware';

export { default as AsyncMiddleware } from './async.middleware';
export { default as AuthMiddleware } from './auth.middleware';
export { default as ErrorMiddleware } from './error.middleware';
export { default as UserAgentMiddleware } from './user-agent.middleware';
export { default as ValidateMiddleware } from './validate.middleware';

export default [InitMiddleware, LoggerMiddleware];

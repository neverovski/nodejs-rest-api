export const SETTING_PINO = {
  errorLikeObjectKeys: ['err', 'error'],
};

export const PRETTY_PRINT = {
  ...SETTING_PINO,
  colorize: true,
  singleLine: true,
  levelFirst: false,
  // eslint-disable-next-line quotes
  translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
  messageFormat:
    '{if req.headers.x-correlation-id}{req.headers.x-correlation-id} {end}{if context}[{context}] {end}{msg}',
  ignore: 'pid,hostname,context,req,res.headers',
};

export const LOGGER_SEARCH_INDEX = 'logs';

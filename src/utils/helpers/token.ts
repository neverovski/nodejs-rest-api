import { IncomingHttpHeaders } from 'http';

import { COOKIE_ACCESS_TOKEN, TokenType } from '@utils';

export const getFromHeader = (headers: IncomingHttpHeaders): string | null => {
  const authorization = headers.authorization || headers.Authorization;

  if (
    authorization &&
    typeof authorization === 'string' &&
    authorization.startsWith(`${TokenType.BEARER} `)
  ) {
    return authorization.split(`${TokenType.BEARER} `)[1] || null;
  }

  return null;
};

export const getFromCookies = (
  cookies?: any,
  tokenType = COOKIE_ACCESS_TOKEN,
): string | null => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  return cookies?.[tokenType] || null;
};

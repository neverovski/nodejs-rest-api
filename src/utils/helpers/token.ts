import { IncomingHttpHeaders } from 'http';

import { TokenType } from '../utility-types';

export default (() => {
  const getFromHeader = (headers: IncomingHttpHeaders): string | null => {
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

  const getFromCookies = (cookies: any): string | null => {
    const { accessToken } = cookies as { accessToken: string };

    return accessToken || null;
  };

  return { getFromHeader, getFromCookies };
})();

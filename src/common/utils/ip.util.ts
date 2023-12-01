import { Request } from 'express';

export class IpUtil {
  static getIp<T extends Partial<Request>>(req: T): string | null {
    const ips =
      req?.headers?.['cf-connecting-ip'] ||
      req?.headers?.['x-real-ip'] ||
      req?.headers?.['x-forwarded-for'] ||
      req?.ip ||
      '';

    return Array.isArray(ips)
      ? ips?.[0]?.trim() || null
      : ips?.split(',')?.[0]?.trim() || null;
  }
}

import { InternalServerErrorException } from '@common/exceptions';

export class RequestUtil {
  static async get<T>(url: string, config?: RequestInit): Promise<T> {
    return RequestUtil.buildQuery<T>(url, config);
  }

  static async post<T>(
    url: string,
    data: any,
    config?: RequestInit,
  ): Promise<T> {
    const body = JSON.stringify(data);

    return RequestUtil.buildQuery<T>(url, {
      method: 'POST',
      body,
      ...config,
    });
  }

  private static async buildQuery<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...config,
      });

      if (res.ok) {
        return (await res.json()) as T;
      }

      throw new InternalServerErrorException();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}

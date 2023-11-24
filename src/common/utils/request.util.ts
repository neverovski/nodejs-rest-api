export class RequestUtil {
  static async get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.buildJsonQuery<T>(url, config);
  }

  static async post<T, V = any>(
    url: string,
    data: V,
    config?: RequestInit,
  ): Promise<T> {
    const body = JSON.stringify(data);

    return this.buildJsonQuery<T>(url, {
      method: 'POST',
      body,
      ...config,
    });
  }

  private static async buildJsonQuery<T>(
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

      return await res.text().then((text) => {
        throw new Error(text);
      });
    } catch (err) {
      throw err;
    }
  }
}

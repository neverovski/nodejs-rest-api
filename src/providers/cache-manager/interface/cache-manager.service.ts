export interface ICacheManagerService {
  clearByPattern(key: string): Promise<void>;
  del(key: string): Promise<void>;
  get<T>(key?: string): Promise<T | null>;
  getKeysByPattern(key: string): Promise<string[]>;
  set<T>(key: string, data: T, ttl?: number): Promise<void>;
}

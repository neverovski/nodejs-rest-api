export interface IRedisConfig {
  clusterModeEnabled?: boolean;
  host: string;
  password?: string;
  port: number;
  queuePrefix: string;
  tls?: boolean;
  username?: string;
}

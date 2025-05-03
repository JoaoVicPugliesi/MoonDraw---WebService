export interface IRateLimiterProvider {
  set(key: string, value: string): Promise<void>
  get(key: string): Promise<string | null>;
  incr(key: string): Promise<number>;
  expire(key: string, ttl: number): Promise<any>;
  exists(key: string): Promise<number>;
  ttl(key: string): Promise<number>;
}

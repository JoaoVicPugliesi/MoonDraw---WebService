export interface IRateLimiterProvider {
  get(key: string): Promise<string | null>;
  incr(key: string): Promise<number>;
  expire(key: string, ttl: number): Promise<any>;
}

import { redis } from '@api/redis/redis';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';

export class IRateLimiterProviderRedisImpl implements IRateLimiterProvider {

  async get(key: string): Promise<string | null> {
    return await redis.get(key);
  }

  async incr(key: string): Promise<number> {
    return await redis.incr(key);
  }

  async expire(key: string, ttl: number): Promise<any> {
    return await redis.expire(key, ttl);
  }
}

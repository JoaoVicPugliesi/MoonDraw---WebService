import { redis } from '@api/redis/redis';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';

export class IRateLimiterProviderRedisImpl implements IRateLimiterProvider {

  async set(key: string, value: string): Promise<void> {
    await redis.set(key, value)
  }
  async get(key: string): Promise<string | null> {
    return await redis.get(key);
  }

  async incr(key: string): Promise<number> {
    return await redis.incr(key);
  }

  async expire(key: string, ttl: number): Promise<any> {
    return await redis.expire(key, ttl);
  }
  
  async exists(key: string): Promise<number> {
    return await redis.exists(key);
  }

  async ttl(key: string): Promise<number> {
    return await redis.ttl(key)
  }
}

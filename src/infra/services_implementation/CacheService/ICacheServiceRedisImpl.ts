import { ICacheService, ISetOptions } from '@domain/services/ICacheService';
import { SetOptions } from 'redis';
import { cache } from '../../../../apis/redis/redis';

export class ICacheServiceRedisImpl implements ICacheService {
  async set(key: string, value: string, options?: ISetOptions): Promise<void> {
    await cache.set(key, value, options as SetOptions);
  }
  async get(key: string): Promise<string | null> {
    const element: string | null = await cache.get(key);

    return element;
  }

  async ttl(key: string): Promise<number> {
    return await cache.ttl(key);
  }

  async flush() {
    await cache.flushAll();
  }
}

import { ISetOptions } from '@domain/providers/Cache/Cache';
import { ICacheProvider} from '@domain/providers/Cache/ICacheProvider';
import { SetOptions } from 'redis';
import { redis } from '@api/redis/redis';

export class ICacheProviderRedisImpl implements ICacheProvider {
  async set(key: string, value: string, options?: ISetOptions): Promise<void> {
    await redis.set(key, value, options as SetOptions);
  }
  async get(key: string): Promise<string | null> {
    const element: string | null = await redis.get(key);

    return element;
  }

  async ttl(key: string): Promise<number> {
    return await redis.ttl(key);
  }

  async flushAll() {
    await redis.flushAll();
  }

  async del(key: string): Promise<void> {
    await redis.del(key);  
  }
}

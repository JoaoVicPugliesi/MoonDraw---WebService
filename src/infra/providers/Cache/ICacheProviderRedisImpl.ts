import { ISetOptions } from '@domain/providers/Cache/Cache';
import { ICacheProvider} from '@domain/providers/Cache/ICacheProvider';
import { SetOptions } from 'redis';
import { cache } from '@api/redis/redis';

export class ICacheProviderRedisImpl implements ICacheProvider {
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

  async flushAll() {
    await cache.flushAll();
  }

  async del(key: string): Promise<void> {
    await cache.del(key);  
  }
}

import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';

export class ICacheProviderInMemoryImpl implements ICacheProvider {
  constructor(
    private readonly cache: Map<string, string> = new Map()
  ) {}

  async get(key: string): Promise<string | null> {
    const result: string | undefined = this.cache.get(key);

    if(typeof result === 'undefined') return null;

    return result;
  }

  async set(key: string, value: string, _options?: { EX: number }): Promise<void> {
    this.cache.set(key, value);
  }

  async ttl(key: string): Promise<number> {
    return this.cache.size;
  }

  async flushAll(): Promise<void> {
    return this.cache.clear();
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

}

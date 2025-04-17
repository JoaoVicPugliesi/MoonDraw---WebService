// src/infra/services_implementation/ICacheServiceInMemoryImpl.ts
import { ICacheService } from '@domain/services/ICacheService';

export class ICacheServiceInMemoryImpl implements ICacheService {
  constructor(
    private readonly cache: Map<string, string> = new Map()
  ) {}

  async get(key: string): Promise<string | undefined> {
    return this.cache.get(key);
  }

  async set(key: string, value: string, _options?: { EX: number }): Promise<void> {
    this.cache.set(key, value);
  }

  async ttl(key: string): Promise<number> {
    return this.cache.size;
  }

  async flush(): Promise<void> {
    return this.cache.clear();
  }

}

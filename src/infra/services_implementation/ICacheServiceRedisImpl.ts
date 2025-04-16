import { SetOptions } from 'redis';
import { cache } from '../../../cache/redis';
import { ICacheService, ISetOptions } from '../../domain/services/ICacheService';

export class ICacheServiceRedisImpl implements ICacheService {
    async set(key: string, value: string, options?: ISetOptions): Promise<void> {
        await cache.set(key, value, options as SetOptions); 
    }
    async get(key: string): Promise<string | undefined> {
        const element: string | null = await cache.get(key);
        
        if(!element) return undefined;

        return element;
    }

    async ttl(key: string): Promise<number> {
        return await cache.ttl(key);
    }

    async flush() {
        await cache.flushAll()
    }
}
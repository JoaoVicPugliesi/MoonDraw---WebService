import { createClient, RedisClientType } from 'redis';

class Redis {
    private readonly cache: RedisClientType;

    constructor() {
        this.cache = createClient({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: 13598,
            }
        });
    }

    async connect(): Promise<void> {
        await this.cache.connect();
    }

    accessRedis(): RedisClientType {
        return this.cache;
    }
}

const redis: Redis = new Redis();
redis.connect();
const cache: RedisClientType = redis.accessRedis();

export { cache };
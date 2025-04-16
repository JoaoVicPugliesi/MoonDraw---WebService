import { createClient, RedisClientType } from "redis";

class Redis {
    private readonly cache: RedisClientType;

    constructor() {
        this.cache = createClient({
            username: process.env.CACHE_USERNAME,
            password: process.env.CACHE_PASSWORD,
            socket: {
                host: process.env.CACHE_HOST,
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


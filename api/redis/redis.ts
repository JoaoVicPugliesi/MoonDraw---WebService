import { createClient, RedisClientType } from 'redis';

class Redis {
    private readonly redis: RedisClientType;

    constructor() {
        this.redis = createClient({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: 13598,
            }
        });
    }

    async connect(): Promise<void> {
        await this.redis.connect();
    }

    accessRedis(): RedisClientType {
        return this.redis;
    }
}

const redisInstance: Redis = new Redis();
redisInstance.connect();
const redis: RedisClientType = redisInstance.accessRedis();

export { redis };
import { createClient } from 'redis';

// Set up Redis client
export const redisClient = createClient({
    url: process.env.REDIS_HOST
});

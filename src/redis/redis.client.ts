import { createClient } from 'redis';
import config from '../config/config';

// Set up Redis client
export const redisClient = createClient({
    url: config.redis.url
});

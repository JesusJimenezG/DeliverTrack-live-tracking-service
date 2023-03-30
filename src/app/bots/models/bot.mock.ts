import { redisClient } from '../../../redis/redis.client';
import { BOT } from '../../../utils/constants';
import { updateBot } from '../services/bot.services';

export interface Bot {
    id: string;
    status: string;
    location: {
        lat: number;
        lng: number;
    };
}

// Mock bot data
export const mockBots: Bot[] = [
    {
        id: '1',
        status: BOT.IDLE,
        location: {
            lat: -122.431297,
            lng: 37.773972
        }
    },
    {
        id: '2',
        status: BOT.IDLE,
        location: {
            lat: -122.435402,
            lng: 37.767817
        }
    },
    {
        id: '3',
        status: BOT.IDLE,
        location: {
            lat: -122.416667,
            lng: 37.783333
        }
    }
];

// Set mock bots in Redis
export const setMockBots = async (): Promise<string[]> => {
    console.log(`Setting mock bots...`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const updates = [];
    for (const bot of mockBots) {
        // emitBotLocation(bot);
        await updateBot(bot);
        updates.push(bot.id);
    }
    return updates;
};

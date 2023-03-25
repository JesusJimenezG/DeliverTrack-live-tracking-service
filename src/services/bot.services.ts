import { redisClient } from '../client/redis.client';
import { Bot } from '../models/bot.mock';
import { BOT } from '../constants/constants';

// Add a bot to Redis
const addBot = async (bot: Bot): Promise<number> => {
    console.log(`Adding or updating bot...`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const exists = await redisClient.hExists('bots', bot.id);
    if (exists) {
        throw new Error('Bot already exists');
    }

    return await redisClient.hSet('bots', bot.id, JSON.stringify(bot));
};

// Get all bots from Redis
const getAllBots = async (): Promise<Bot[]> => {
    console.log(`Getting all bots...`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const botData = await redisClient.hGetAll('bots');
    const bots: Bot[] = [];
    for (const id in botData) {
        const { status, location } = JSON.parse(botData[id]);
        bots.push({ id, location, status });
    }
    return bots;
};

// Get a bot from Redis
const getBot = async (id: string): Promise<Bot> => {
    console.log(`Getting bot...`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const botData = await redisClient.hGet('bots', id);
    if (!botData) {
        throw new Error('Bot not found');
    }

    const { status, location } = JSON.parse(botData);
    return { id, location, status };
};

// Update a bot in Redis
const updateBot = async (bot: Bot): Promise<string> => {
    console.log(`updating bot...`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    await redisClient.hSet('bots', bot.id, JSON.stringify(bot));
    return bot.id;
};

// Delete a bot from Redis
const deleteBot = async (id: string): Promise<string> => {
    console.log(`Deleting bot...`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    await redisClient.hDel('bots', id);
    return id;
};

// Change all bots status to STARTED
const startEngines = async (): Promise<string[]> => {
    console.log(`Starting engines... 🤖`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const bots = await getAllBots();

    const updates = [];
    for (const bot of bots) {
        bot.status = BOT.STARTED;
        await updateBot(bot);

        updates.push(bot.id);
    }
    return updates;
};

// Change all bots status to IDLE
const shutdownEngines = async (): Promise<string[]> => {
    console.log(`Stopping engines... 🤖`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const bots = await getAllBots();

    const updates = [];
    for (const bot of bots) {
        bot.status = BOT.IDLE;
        await updateBot(bot);
        updates.push(bot.id);
    }

    return updates;
};

// Start moving all bots
const startMovingBots = async (): Promise<string[]> => {
    console.log(`Starting moving bots... 🤖`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const bots = await getAllBots();

    const updates = [];
    for (const bot of bots) {
        bot.status = BOT.MOVING;
        await updateBot(bot);
        updates.push(bot.id);
    }
    return updates;
};

// Stop moving all bots
const stopMovingBots = async (): Promise<string[]> => {
    console.log(`Stopping moving bots... 🤖`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const bots = await getAllBots();

    const updates = [];
    for (const bot of bots) {
        bot.status = BOT.STOPPED;
        await updateBot(bot);
        updates.push(bot.id);
    }
    return updates;
};

// Start moving a single bot
const startMovingBot = async (id: string): Promise<string> => {
    console.log(`Starting moving bot... 🤖`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const bot = await getBot(id);
    bot.status = BOT.MOVING;
    await updateBot(bot);
    return bot.id;
};

// Stop moving a single bot
const stopMovingBot = async (id: string): Promise<string> => {
    console.log(`Stopping moving bot... 🤖`);
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const bot = await getBot(id);
    bot.status = BOT.IDLE;
    await updateBot(bot);
    return bot.id;
};

export {
    addBot,
    getAllBots,
    getBot,
    updateBot,
    deleteBot,
    startEngines,
    shutdownEngines,
    startMovingBots,
    stopMovingBots,
    startMovingBot,
    stopMovingBot
};

import { io } from '../client/io.client';
import { Bot } from '../models/bot.mock';

// Define a function to emit bot location data to the client
export const emitBotLocation = async (bot: Bot) => {
    console.log(`Emitting bot location...`);

    const { id, location } = bot;
    io.emit('botLocation', { id, location });
};

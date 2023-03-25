import { io } from '../app';
import { BOT } from '../constants/constants';
import { getAllBots, updateBot } from '../services/bot.services';

// Define a function to emit bot location data to the client
export const emitBotsLocation = async () => {
    console.log(`Emitting bot location...`);

    const bots = await getAllBots();
    for (const bot of bots) {
        console.log(`bot status: `, bot.status);
    }
    io.emit('/update-bot-locations', bots);
};

export let botLocationInterval: NodeJS.Timeout;

// Simulate bot location updates every 5 seconds
export const startBotLocationInterval = () => {
    botLocationInterval = setInterval(async () => {
        console.log(`Updating bot locations every 5 sec...`);

        const bots = await getAllBots();
        for (const bot of bots) {
            const { location } = bot;
            const movement = 0.001;
            const newLocation = {
                lat:
                    location.lat +
                    (Math.random() < 0.5 ? -1 : 1) * Math.random() * movement,
                lng:
                    location.lng +
                    (Math.random() < 0.5 ? -1 : 1) * Math.random() * movement
            };
            bot.location = newLocation;
            bot.status = BOT.MOVING;
            await updateBot(bot);
        }
        emitBotsLocation();
    }, 2000);
};

export const stopBotLocationInterval = () => {
    clearInterval(botLocationInterval);
    emitBotsLocation();
};

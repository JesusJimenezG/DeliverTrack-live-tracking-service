import {
    emitBotLocation,
    getAllBots,
    updateBot
} from '../services/bot.services';

// Simulate bot location updates every 5 seconds
export const mockBotLocationIntervals = async () => {
    setInterval(async () => {
        console.log(`Updating bot locations every 5 sec...`);

        const bots = await getAllBots();
        for (const bot of bots) {
            const { location } = bot;
            const newLocation = {
                lat: location.lat + Math.random() * 0.001,
                lng: location.lng + Math.random() * 0.001
            };
            bot.location = newLocation;
            console.log();
            emitBotLocation(bot);
            updateBot(bot);
        }
    }, 5000);
};

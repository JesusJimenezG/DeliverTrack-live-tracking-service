import { createApp } from './app/app';
import { createServer } from './server/server';
import { createIO } from './server/io.server';

const app = createApp();
const httpServer = createServer(app);
const io = createIO(httpServer);

// Set up bots
// Initialize the mock bots whenever we need new data in redis
// setMockBots();

// Start server
const PORT = process.env.PORT || 4001;
const HOST = process.env.HOST || 'localhost';
httpServer.listen(PORT, () => {
    console.log(`🤖 Live tracking system started on http://${HOST}:${PORT}`);
});

export { app, httpServer, io };

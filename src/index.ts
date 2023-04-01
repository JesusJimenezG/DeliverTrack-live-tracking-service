import { createApp } from './app/app';
import { createServer } from './server/server';
import { createIO } from './server/io.server';
import config from './config/config';

const app = createApp();
const httpServer = createServer(app);
const io = createIO(httpServer);

// Set up bots
// Initialize the mock bots whenever we need new data in redis
// setMockBots();

// Start server
const PORT = config.server.port;
const HOST = config.server.host;
httpServer.listen(PORT, () => {
    console.log(`🤖 Live tracking system started on http://${HOST}:${PORT}`);
});

export { app, httpServer, io };

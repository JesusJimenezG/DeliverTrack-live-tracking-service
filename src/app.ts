// Import required modules
import express from 'express';
import http from 'http';
import cors from 'cors';
import { router } from './routes';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { IOMiddleware } from './middleware/io.middleware';
import {
    startBotLocationInterval,
    stopBotLocationInterval
} from './services/bot.io.services';
// import { setMockBots } from './models/bot.mock';

// Set up Express app and HTTP server
const app = express();
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export const httpServer = http.createServer(app);

// Set up bots
// Initialize the mock bots whenever we need new data in redis
// setMockBots();

// Set up SocketIO server
export const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: [
            'Authorization',
            'X-Requested-With',
            'Content-Type',
            'Accept'
        ]
    }
});
IOMiddleware(io);

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('/start-moving-bots', () => {
        console.log(`🤖 Start moving those Wall-e's arround...`);

        // Start emitting bot locations
        startBotLocationInterval();
    });
    socket.on('/stop-moving-bots', () => {
        console.log(`🤖 Stop moving Wall-e's arround...`);
        stopBotLocationInterval();
    });
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

// Set up routes
app.get('/api/live-tracking/', (_, res) => {
    console.log(`without nginx`);
    res.send('Live tracking system is running');
});
app.use('/api/live-tracking', router);

// Start server
const PORT = process.env.PORT || 4001;
const HOST = process.env.HOST || 'localhost';
httpServer.listen(PORT, () => {
    console.log(`🤖 Live tracking system started on http://${HOST}:${PORT}`);
});

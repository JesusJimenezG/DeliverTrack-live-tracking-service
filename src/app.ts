// Import required modules
import express from 'express';
import http from 'http';
import { setMockBots } from './services/bot.services';
import cors from 'cors';
import { router } from './routes';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

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
setMockBots();

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

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    // updateBots();

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

io.use((socket, next) => {
    // Get the request object from the socket
    const req = socket.request;
    console.log(`soketio middleware`);

    // Check if the request URL matches the endpoint you want to target
    if (req.url === '/api/live-tracking/start-moving-bots') {
        // Emit a socket.io event when the client enters the endpoint
        io.emit('updateBotLocations', {
            message: 'Bot locations updated'
        });
    }

    next();
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

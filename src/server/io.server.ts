import { Server } from 'socket.io';
import { IOMiddleware } from 'session-authentication-middleware/middleware/io.middleware';
import {
    startBotLocationInterval,
    stopBotLocationInterval
} from '../app/bots/services/bot.io.services';
import http from 'http';

const jwt_secret = process.env.JWT_SECRET || 'secret';

export const createIO = (httpServer: http.Server) => {
    // Set up SocketIO server
    const io = new Server(httpServer, {
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
    IOMiddleware(io, jwt_secret);

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
    return io;
};

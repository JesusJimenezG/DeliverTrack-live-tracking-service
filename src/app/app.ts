// Import required modules
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import cookieParser from 'cookie-parser';
// import { setMockBots } from './models/bot.mock';

export const createApp = () => {
    const app = express();

    // Set up Express app and HTTP server
    app.use(cookieParser());
    app.use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true
        })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Set up routes
    app.use('/api/live-tracking', router);

    return app;
};

// export const httpServer = http.createServer(app);

// // Set up bots
// // Initialize the mock bots whenever we need new data in redis
// // setMockBots();

// // Set up SocketIO server
// export const io = new Server(httpServer, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST'],
//         allowedHeaders: [
//             'Authorization',
//             'X-Requested-With',
//             'Content-Type',
//             'Accept'
//         ]
//     }
// });
// IOMiddleware(io, jwt_secret);

// io.on('connection', (socket) => {
//     console.log(`User ${socket.id} connected`);

//     socket.on('/start-moving-bots', () => {
//         console.log(`🤖 Start moving those Wall-e's arround...`);

//         // Start emitting bot locations
//         startBotLocationInterval();
//     });
//     socket.on('/stop-moving-bots', () => {
//         console.log(`🤖 Stop moving Wall-e's arround...`);
//         stopBotLocationInterval();
//     });
//     socket.on('disconnect', () => {
//         console.log(`User ${socket.id} disconnected`);
//     });
// });

// // Start server
// const PORT = process.env.PORT || 4001;
// const HOST = process.env.HOST || 'localhost';
// httpServer.listen(PORT, () => {
//     console.log(`🤖 Live tracking system started on http://${HOST}:${PORT}`);
// });

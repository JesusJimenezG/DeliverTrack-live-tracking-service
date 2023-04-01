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

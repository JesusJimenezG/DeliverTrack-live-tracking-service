import http from 'http';
import { Express } from 'express';

export const createServer = (app: Express) => {
    const httpServer = http.createServer(app);

    return httpServer;
};

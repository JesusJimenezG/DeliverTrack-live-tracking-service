import { Request, Response } from 'express';
import * as BotServices from '../services/bot.services';

const addBot = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const serviceResponse = await await BotServices.addBot(data);

        res.status(200).json(`Added ${serviceResponse} bot`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.getAllBots();

        res.status(200).json(serviceResponse);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const serviceResponse = await BotServices.getBot(id);

        res.status(200).json(serviceResponse);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateBot = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const serviceResponse = await BotServices.updateBot(data);

        res.status(200).json(`Updated ${serviceResponse} bot`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const serviceResponse = await BotServices.deleteBot(id);

        res.status(200).json(`Deleted ${serviceResponse} bot`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const startBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.startEngines();

        res.status(200).json(`Started ${serviceResponse} engines`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const shutdownBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.shutdownEngines();

        res.status(200).json(`Stopped ${serviceResponse} engines`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const startMovingBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.startMovingBots();

        res.status(200).json(`Started moving ${serviceResponse} bots`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const stopMovingBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.stopMovingBots();

        res.status(200).json(`Stopped moving ${serviceResponse} bots`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const startMovingBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const serviceResponse = await BotServices.startMovingBot(id);

        res.status(200).json(`Started moving ${serviceResponse}bot`);
    } catch (error) {
        res.status(500).json(error);
    }
};

const stopMovingBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const serviceResponse = await BotServices.stopMovingBot(id);

        res.status(200).json(`Stopped moving ${serviceResponse} bot`);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    addBot,
    getAllBots,
    getBot,
    updateBot,
    deleteBot,
    startBots,
    shutdownBots,
    startMovingBots,
    stopMovingBots,
    startMovingBot,
    stopMovingBot
};

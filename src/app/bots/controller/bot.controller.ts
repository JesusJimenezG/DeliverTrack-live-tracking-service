import { Request, Response } from 'express';
import * as BotServices from '../services/bot.services';
import ResponseHandler from 'delivertrack-middlewares/utils/network.handler';

const addBot = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const serviceResponse = await await BotServices.addBot(data);

        ResponseHandler.success(res, `Added ${serviceResponse} bot`);
        // res.status(200).json(`Added ${serviceResponse} bot`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const getBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.getAllBots();

        ResponseHandler.success(res, serviceResponse);
        // res.status(200).json(serviceResponse);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const getBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const serviceResponse = await BotServices.getBot(id);

        ResponseHandler.success(res, serviceResponse);
        // res.status(200).json(serviceResponse);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const updateBot = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const serviceResponse = await BotServices.updateBot(data);

        ResponseHandler.success(res, `Updated bot id: ${serviceResponse}`);
        // res.status(200).json(`Updated ${serviceResponse} bot`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const deleteBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const serviceResponse = await BotServices.deleteBot(id);

        ResponseHandler.success(res, `Deleted bot id: ${serviceResponse}`);
        // res.status(200).json(`Deleted ${serviceResponse} bot`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const startBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.startEngines();

        ResponseHandler.success(
            res,
            `Started ${serviceResponse.length} engines`
        );
        // res.status(200).json(`Started ${serviceResponse} engines`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const shutdownBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.shutdownEngines();

        ResponseHandler.success(
            res,
            `Shutted down ${serviceResponse.length} engines`
        );
        // res.status(200).json(`Stopped ${serviceResponse} engines`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const startMovingBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.startMovingBots();

        ResponseHandler.success(
            res,
            `Started moving ${serviceResponse.length} bots`
        );
        // res.status(200).json(`Started moving ${serviceResponse} bots`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const stopMovingBots = async (_: Request, res: Response) => {
    try {
        const serviceResponse = await BotServices.stopMovingBots();

        ResponseHandler.success(
            res,
            `Stopped moving ${serviceResponse.length} bots`
        );
        // res.status(200).json(`Stopped moving ${serviceResponse} bots`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const startMovingBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const serviceResponse = await BotServices.startMovingBot(id);

        ResponseHandler.success(
            res,
            `Started moving bot id: ${serviceResponse}`
        );
        // res.status(200).json(`Started moving ${serviceResponse}bot`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

const stopMovingBot = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const serviceResponse = await BotServices.stopMovingBot(id);

        ResponseHandler.success(
            res,
            `Stopped moving bot id: ${serviceResponse}`
        );
        // res.status(200).json(`Stopped moving ${serviceResponse} bot`);
    } catch (error) {
        ResponseHandler.error(res, error);
        // res.status(500).json(error);
    }
};

export default {
    addBot,
    getBots,
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

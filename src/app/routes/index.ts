import express from 'express';
import { validateToken } from 'delivertrack-middlewares/middleware/session';
import BotController from '../bots/controller/bot.controller';

const router = express.Router();
const secret = process.env.JWT_SECRET || 'secret';

router.post(
    '/add-bot',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.addBot
);

router.get(
    '/get-bots',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.getBots
);

router.get(
    '/get-bot/:id',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.getBot
);

router.put(
    '/update-bot/:id',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.updateBot
);

router.delete(
    '/delete-bot/:id',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.deleteBot
);

router.post(
    '/start-bots',
    (req, res, next) => {
        validateToken(req, res, next, secret);
    },
    BotController.startBots
);

router.post(
    '/shutdown-bots',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.shutdownBots
);

router.post(
    '/start-moving-bots',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.startMovingBots
);

router.post(
    '/stop-moving-bots',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.stopMovingBots
);

router.post(
    '/start-moving-bot/:id',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.startMovingBot
);

router.post(
    '/stop-moving-bot/:id',
    (req, res, next) => validateToken(req, res, next, secret),
    BotController.stopMovingBot
);

export { router };

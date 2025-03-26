import { Router } from "express";
import { LabsController } from "./labs.test";

export class LabsRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new LabsController();
        router.get('/sports', controller.createSports)
        router.get('/tournaments', controller.createTournament)
        router.get('/championships', controller.createChampionships)
        return router;
    }
}
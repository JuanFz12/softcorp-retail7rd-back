import { Router } from "express";
import { SportsController } from "./sports.controller";
import { SportService } from "../../infrastructure";

export class SportsRoutes {
    static get routes(): Router {
        const router = Router();
        const sportService = new SportService();
        const controller = new SportsController(sportService);
        router.get('/championships', controller.findAvailableChampionShips);
        router.get('/tournaments', controller.findAvailableTournaments);
        router.get('/sports', controller.findAvailableSports);
        router.get('/all-sports-information', controller.allSportInformation);
        return router;
    }
}
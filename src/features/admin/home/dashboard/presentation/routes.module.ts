import { Router } from "express";
import { DashBoardController } from "./dashboard.controller";

export class DashBoardRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new DashBoardController();
        router.get('')
        return router;
    }
}
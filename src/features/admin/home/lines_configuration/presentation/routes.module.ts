import { Router } from "express";
import { LinesConfigurationController } from "./lines_configuration.controller";
import { LinesConfigurationDataSourceImpl, LinesConfigurationRepositoryImpl } from "../infrastructure";

export class LinesConfigurationRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new LinesConfigurationDataSourceImpl();
        const repository = new LinesConfigurationRepositoryImpl(datasource);
        const controller = new LinesConfigurationController(repository);
        router.post('/', [], controller.create);
        return router;
    }
}
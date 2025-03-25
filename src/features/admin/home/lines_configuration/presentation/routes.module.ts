import { Router } from "express";
import { LinesConfigurationController } from "./lines_configuration.controller";
import { LinesConfigurationDataSourceImpl, LinesConfigurationRepositoryImpl } from "../infrastructure";
import { FileUploadMiddleware } from "../../../shared";

export class LinesConfigurationRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new LinesConfigurationDataSourceImpl();
        const repository = new LinesConfigurationRepositoryImpl(datasource);
        const controller = new LinesConfigurationController(repository);
        router.post('/', [FileUploadMiddleware.keysContainFiles], controller.create);
        return router;
    }
}
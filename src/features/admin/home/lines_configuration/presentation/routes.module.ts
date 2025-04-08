import { Router } from "express";
import { LinesConfigurationController } from "./lines_configuration.controller";
import { LinesConfigurationDataSourceImpl, LinesConfigurationRepositoryImpl } from "../infrastructure";
import { AuthMiddleware, FileUploadMiddleware, FileUploadService } from "../../../shared";
import { SportService } from "../../shared";

export class LinesConfigurationRoutes {
    static get routes(): Router {
        const router = Router();
        const fileUploadService = new FileUploadService()
        const sportService = new SportService();
        const datasource = new LinesConfigurationDataSourceImpl(fileUploadService, sportService);
        const repository = new LinesConfigurationRepositoryImpl(datasource);
        const controller = new LinesConfigurationController(repository);
        router.post('/', [AuthMiddleware.validateJwtUser], controller.create);
        router.get('/', [AuthMiddleware.validateJwtUser], controller.find);
        return router;
    }
}
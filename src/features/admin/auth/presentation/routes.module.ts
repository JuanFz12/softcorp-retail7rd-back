import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../infrastructure";
import { AuthMiddleware } from "../../shared";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDataSourceImpl();
        const repository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(repository)
        router.post('/login', controller.login)
        router.get('/check-status', AuthMiddleware.validateJwtUser, controller.checkStatus)
        return router;
    }
}
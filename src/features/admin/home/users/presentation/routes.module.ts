import { Router } from "express";
import { UsersController } from "./users.controller";
import { UserManagementDataSourceImpl, UserManagementRepositoryImpl } from "../infrastructure";

export class UsersRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new UserManagementDataSourceImpl();
        const repository = new UserManagementRepositoryImpl(datasource);
        const controller = new UsersController(repository);
        router.post('/', controller.create)
        router.get('/', controller.find)
        return router;
    }
}
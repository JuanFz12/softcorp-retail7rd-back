import { Router } from "express";
import { GroupsController } from "./groups.controller";
import { GroupsManagementDataSourceImpl, GroupsManagementRepositoryImpl } from "../infrastructure";

export class GroupsRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new GroupsManagementDataSourceImpl()
        const repository = new GroupsManagementRepositoryImpl(datasource);
        const controller = new GroupsController(repository);
        router.post('/', controller.create);
        router.get('/', controller.find);
        router.get('/:id', controller.findOne);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);
        return router;
    }
}
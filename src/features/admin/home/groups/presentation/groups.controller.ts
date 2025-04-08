import { Request, Response } from "express"
import { CustomError, ServerResponseEntity } from "../../../shared"
import { CreateGroupDto, CreateGroupUseCase, DeleteGroupUseCase, FindGroupsDto, FindGroupsUseCase, FindOneGroupUseCase, GroupsManagementRepository, UpdateGroupDto, UpdateGroupUseCase } from "../domain"

export class GroupsController {
    constructor(
        private readonly repository: GroupsManagementRepository<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number>
    ) { }
    private readonly handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error.message
            }))
        }
        console.log(`${error}`)
        return res.status(500).json(ServerResponseEntity.fromObject({ data: null, message: 'An error occurred while processing the request.', status: 'error', error: 'Internal server error' }))
    }
    create = (req: Request, res: Response) => {
        const [error, createGroupDto] = CreateGroupDto.create({ ...req.body });
        if (error) {
            res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }));
            return;
        }
        new CreateGroupUseCase(this.repository)
            .execute(createGroupDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
    find = (req: Request, res: Response) => {
        const { limit = 10, page = 1, name } = req.query;
        const [error, findGroupsDto] = FindGroupsDto.create({ limit, page, name });
        if (error) {
            res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }))
            return;
        };
        new FindGroupsUseCase(this.repository)
            .execute(findGroupsDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
    findOne = (req: Request, res: Response) => {
        const id = +req.params.id;
        new FindOneGroupUseCase(this.repository)
            .execute(id)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
    update = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateGroupDto] = UpdateGroupDto.create({ ...req.body, id });
        if (error) {
            res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }));
            return;
        }
        new UpdateGroupUseCase(this.repository)
            .execute(updateGroupDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
    delete = (req: Request, res: Response) => {
        const id = +req.body.id;
        new DeleteGroupUseCase(this.repository)
            .execute(id)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
}
import { Request, Response } from "express"
import { CustomError, ServerResponseEntity } from "../../../shared"
import { CreateUserDto, CreateUserUseCase, FindUsersDto, UpdateUserDto, UserManagementRepository } from "../domain"

export class UsersController {
    constructor(
        private readonly repository: UserManagementRepository<FindUsersDto, number, CreateUserDto, UpdateUserDto, number>
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
        const [error, createUserDto] = CreateUserDto.create({ ...req.body });
        if (error) {
            res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }));
            return;
        }
        new CreateUserUseCase(this.repository)
            .execute(createUserDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
}
import { Request, Response } from "express"
import { CustomError, ServerResponseEntity } from "../../shared"
import { AuthRepository, CheckStatusUseCase, LoginDto, LoginUseCase } from "../domain"

export class AuthController {
    constructor(
        private readonly repository: AuthRepository<LoginDto, string, string>
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
    login = (req: Request, res: Response) => {
        const [error, loginDto] = LoginDto.create({ ...req.body });
        if (error) {
            res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }))
            return;
        };
        new LoginUseCase(this.repository)
            .execute(loginDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
    checkStatus = (req: Request, res: Response) => {
        const id = req.body.user.id;
        new CheckStatusUseCase(this.repository)
            .execute(id)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
}
import { Request, Response } from "express"
import { CustomError, ServerResponseEntity } from "../../../../shared"
import { SportServiceInterface } from "../../infrastructure"

export class SportsController {
    constructor(
        private readonly sportService: SportServiceInterface
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

    findAvailableSports = (req: Request, res: Response) => {
        this.sportService.findSports()
            .then(response => res.json(ServerResponseEntity.fromObject({
                status: 'success',
                data: { sports: response },
                error: null,
                message: ''
            })))
            .catch(error => this.handleError(res, error))
    }
    findAvailableTournaments = (req: Request, res: Response) => {
        this.sportService.findTournament()
            .then(response => res.json(ServerResponseEntity.fromObject({
                status: 'success',
                data: { tournaments: response },
                error: null,
                message: ''
            })))
            .catch(error => this.handleError(res, error))
    }
    findAvailableChampionShips = (req: Request, res: Response) => {
        this.sportService.findChampionShips()
            .then(response => res.json(ServerResponseEntity.fromObject({
                status: 'success',
                data: { championships: response },
                error: null,
                message: ''
            })))
            .catch(error => this.handleError(res, error))
    }

    allSportInformation = (req: Request, res: Response) => {
        this.sportService.findAllSportInformation()
            .then(response => res.json(ServerResponseEntity.fromObject({
                status: 'success',
                data: response,
                error: null,
                message: ''
            })))
            .catch(error => this.handleError(res, error))
    }
}
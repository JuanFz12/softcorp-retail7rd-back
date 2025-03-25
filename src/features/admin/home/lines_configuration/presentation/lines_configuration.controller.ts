import { Request, Response } from "express"
import { CustomError, ServerResponseEntity } from "../../../shared"
import { CreateLineConfigurationDto, CreateLineConfigurationUseCase, DeleteLineConfigurationDto, FindLinesConfigurationDto, LinesConfigurationRepository, UpdateLineConfigurationDto } from "../domain"

export class LinesConfigurationController {
    constructor(
        private readonly repository: LinesConfigurationRepository<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto>
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
        const parseBoolean = (value: any) => value === "true";
        const parseArrayNumbers = (value: any): number[] => {
            try {
                return JSON.parse(value).map((item: any) => Number(item)).filter((n: any) => !isNaN(n));
            } catch {
                return [];
            }
        };

        const { files, ...restBody } = req.body;
        const [error, createLineConfigurationDto] = CreateLineConfigurationDto.create({
            ...restBody,
            alternativeEquipmentCode: parseBoolean(restBody.alternativeEquipmentCode),
            tournamentIds: parseArrayNumbers(restBody.tournamentIds),
            sportIds: parseArrayNumbers(restBody.sportIds),
            championshipIds: parseArrayNumbers(restBody.championshipIds),
            groupIds: parseArrayNumbers(restBody.groupIds),
            advertisingImage: files.advertisingImage,
            images: [
                { name: 'MLB', file: files.MLB },
                { name: 'NHL', file: files.NHL }
            ]
        })
        if (error) {
            res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }));
            return;
        }
        new CreateLineConfigurationUseCase(this.repository)
            .execute(createLineConfigurationDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
}
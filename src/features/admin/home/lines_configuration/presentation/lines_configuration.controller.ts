import { Request, Response } from "express"
import { CustomError, ServerResponseEntity } from "../../../shared"
import { CreateLineConfigurationDto, CreateLineConfigurationUseCase, DeleteLineConfigurationDto, FindLinesConfigurationDto, FindLinesConfigurationUseCase, LinesConfigurationRepository, UpdateLineConfigurationDto } from "../domain"
import { UploadedFile } from "express-fileupload"

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

        const { user, files, ...restBody } = req.body;
        const headersImages = this.parseHeadersImages(req);
        const advertisingImages = this.parseAdvertisingImages(req);
        console.log(JSON.stringify(restBody))
        const [error, createLineConfigurationDto] = CreateLineConfigurationDto.create({
            ...restBody,
            userId: user.id,
            alternativeEquipmentCode: parseBoolean(restBody.alternativeEquipmentCode),
            tournamentIds: parseArrayNumbers(restBody.tournamentIds),
            sportIds: parseArrayNumbers(restBody.sportIds),
            championshipIds: parseArrayNumbers(restBody.championshipIds),
            advertisingImages: advertisingImages,
            headersImages: headersImages
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
    find = (req: Request, res: Response) => {
        const { limit = 10, page = 1, name } = req.query;
        const [error, findLinesConfigurationDto] = FindLinesConfigurationDto.create({ limit, page, name })
        if (error) {
            res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }));
            return
        }
        new FindLinesConfigurationUseCase(this.repository)
            .execute(findLinesConfigurationDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    }
    private parseHeadersImages(req: Request): { file: UploadedFile; tournamentId: number }[] {
        const headers: { file: UploadedFile; tournamentId: number }[] = [];

        const fileKeys = Object.keys(req.files || {}).filter(
            (key) => key.startsWith('headers[') && key.endsWith('].file')
        );

        for (const key of fileKeys) {
            const index = key.match(/headers\[(\d+)\]/)?.[1];
            if (index === undefined) continue;

            const file = req.files?.[key] as UploadedFile;
            const tournamentIdRaw = req.body[`headers[${index}].tournamentId`];

            if (file && tournamentIdRaw) {
                headers.push({
                    file,
                    tournamentId: parseInt(tournamentIdRaw, 10),
                });
            }
        }

        return headers;
    }
    private parseAdvertisingImages(req: Request): { file: UploadedFile; seconds: string }[] {
        const headers: { file: UploadedFile; seconds: string }[] = [];

        const fileKeys = Object.keys(req.files || {}).filter(
            (key) => key.startsWith('advertisements[') && key.endsWith('].file')
        );

        for (const key of fileKeys) {
            const index = key.match(/headers\[(\d+)\]/)?.[1];
            if (index === undefined) continue;

            const file = req.files?.[key] as UploadedFile;
            const secondsRaw = req.body[`advertisements[${index}].seconds`];

            if (file && secondsRaw) {
                headers.push({
                    file,
                    seconds: secondsRaw,
                });
            }
        }

        return headers;
    }

}
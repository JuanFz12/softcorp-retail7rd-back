import { Request, Response } from "express"
import { CustomError, ServerResponseEntity } from "../../domain"
import { prisma } from "../../../../../config"

export class LabsController {
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
    createSports = async (req: Request, res: Response) => {
        try {
            const data = [{ name: "Football" }, { name: "Baseball" }]
            await prisma.sport.createMany({ data: data })
            res.json('Sports Created');
           /*  await prisma.theme.createMany({ data: [{ name: 'Dark' }, { name: 'Light' }] })
            res.json('Theme Created'); */
        } catch (error) {
            throw error;
        }
    }
    createChampionships = async (req: Request, res: Response) => {
        const data = [{ name: "Japan" }, { name: "USA" }]
        await prisma.championship.createMany({ data: data })
        res.json('championships Created');
    }
    createTournament = async (req: Request, res: Response) => {
        const data = [{ name: "Major League Baseball" }, { name: "MLB Outright" }]
        await prisma.tournament.createMany({ data: data })
        res.json('championships Created');
    }
}
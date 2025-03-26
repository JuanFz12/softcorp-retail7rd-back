import { prisma } from "../../../../../../config";
import { CustomError, FileUploadServiceInterface, ServerResponseEntity } from "../../../../shared";
import { SportServiceInterface } from "../../../shared";
import { LinesConfigurationDataSource, CreateLineConfigurationDto, FindLinesConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto, LineConfiguration } from "../../domain";

export class LinesConfigurationDataSourceImpl implements LinesConfigurationDataSource<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto> {
    constructor(
        private readonly fileUploadService: FileUploadServiceInterface,
        private readonly sportService: SportServiceInterface
    ) { }
    async find({ attributesDto }: FindLinesConfigurationDto): Promise<ServerResponseEntity> {
        try {
            const { pagination } = attributesDto;
            const linesConfiguration = await prisma.lineConfiguration.findMany({
                include: { user: { select: { id: true, name: true } } },
                take: pagination.limit, skip: (pagination.page - 1) * pagination.limit,
            });
            const totalLinesConfigurationCount = await prisma.lineConfiguration.count();
            const totalPages = Math.ceil(totalLinesConfigurationCount / pagination.limit);
            const dataToEntity = linesConfiguration.map(
                ({ id, name, timeZone, viewType, createdAt, isActive, user }) =>
                    LineConfiguration.fromObject({ id, name, timeZone, isActive, createdAt, viewType, createdBy: user }).lineConfigurationAttributes
            )
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: {
                    linesConfigurations: dataToEntity,
                    pagination: {
                        page: pagination.page,
                        limit: pagination.limit,
                        totalPages
                    }
                },
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async findOne(dto: number): Promise<ServerResponseEntity> {
        try {
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: undefined,
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async create({ attributesDto }: CreateLineConfigurationDto): Promise<ServerResponseEntity> {
        try {
            const { alternativeEquipmentCode, name, lineType, timeZone, viewType, themeId, userId, showAdvertisingEvery, advertisingImage, images, championshipIds, sportIds, tournamentIds } = attributesDto;
            await this.sportService.findSportsByIds(sportIds);
            await this.sportService.findTournamentsByIds(tournamentIds);
            await this.sportService.findChampionShipsByIds(championshipIds);
            await this.findOneUser(userId);
            const newLineConfiguration = await prisma.$transaction(async (prismaCLI) => {
                const newLineConfiguration = await prismaCLI.lineConfiguration.create({
                    data: {
                        alternativeEquipmentCode,
                        name,
                        championship: { connect: championshipIds.map((championship) => ({ id: championship })) },
                        sport: { connect: sportIds.map((sport) => ({ id: sport })) },
                        tournament: { connect: tournamentIds.map((tournament) => ({ id: tournament })) },
                        timeZone,
                        type: lineType,
                        viewType,
                        themeId,
                        userId
                    }, include: { user: { select: { id: true, name: true } } }
                })
                const { fileName } = await this.fileUploadService.uploadSingle(advertisingImage, 'uploads/lines_configuration/advertising_images');
                await prismaCLI.lineConfigurationAdvertising.create({ data: { lineConfigurationId: newLineConfiguration.id, showEvery: showAdvertisingEvery, path: `lines_configuration/advertising_images/${fileName}` } })
                const data = await Promise.all(images.map(async ({ file, name }) => {
                    const { fileName } = await this.fileUploadService.uploadSingle(file, 'uploads/lines_configuration/images');
                    return {
                        name: name,
                        path: `lines_configuration/images/${fileName}`,
                        lineConfigurationId: newLineConfiguration.id,
                    };
                }));
                await prismaCLI.lineConfigurationImage.createMany({ data });
                return newLineConfiguration;
            })
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: {
                    lineConfiguration: LineConfiguration.fromObject({
                        id: newLineConfiguration.id,
                        name: newLineConfiguration.name,
                        timeZone: newLineConfiguration.timeZone,
                        isActive: newLineConfiguration.isActive,
                        createdAt: newLineConfiguration.createdAt,
                        viewType: newLineConfiguration.viewType,
                        createdBy: newLineConfiguration.user
                    }).lineConfigurationAttributes
                },
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async update(dto: UpdateLineConfigurationDto): Promise<ServerResponseEntity> {
        try {
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: undefined,
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async delete(dto: DeleteLineConfigurationDto): Promise<ServerResponseEntity> {
        try {
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: undefined,
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    private async findOneUser(id: number) {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) throw CustomError.notFound('User not found');
            return user;
        } catch (error) {
            throw error;
        }
    }
}
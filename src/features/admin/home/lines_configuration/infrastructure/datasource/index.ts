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
            const { pagination, name } = attributesDto;
            const linesConfiguration = await prisma.lineConfiguration.findMany({
                include: { user: { select: { id: true, name: true } } },
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    }
                },
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
            const { alternativeEquipmentCode, name, lineType, timeZone, advertisingImages, headersImages, viewType, themeId, userId, championshipIds, sportIds, tournamentIds } = attributesDto;
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
                const advertisingData = await Promise.all(advertisingImages.map(async ({ file, seconds }) => {
                    const { fileName } = await this.fileUploadService.uploadSingle(file, 'uploads/lines_configuration/headers');
                    return {
                        showEvery: seconds,
                        path: `lines_configuration/headers/${fileName}`,
                        lineConfigurationId: newLineConfiguration.id,
                    };
                }));
                await prismaCLI.lineConfigurationAdvertising.createMany({ data: advertisingData });
                await Promise.all(
                    headersImages.map(async ({ file, tournamentId }) => {
                        const { fileName } = await this.fileUploadService.uploadSingle(
                            file,
                            'uploads/lines_configuration/advertising'
                        );
                        await prismaCLI.lineConfigurationHeaders.create({
                            data: {
                                path: `lines_configuration/advertising/${fileName}`,
                                lineConfigurationId: newLineConfiguration.id,
                                tournament: {
                                    connect: { id: tournamentId },
                                },
                            },
                        });
                    })
                );
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